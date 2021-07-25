import * as express from 'express';
import * as passport from 'passport';
import {
  ILecture,
  IUser,
  Lecture,
  LectureUnit,
  Role,
} from '@seba/backend/models';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { DeletionService } from '@seba/backend/services';
import * as _ from "get-video-duration";

const router = express.Router();
const BASE_FILE_PATH = __dirname + '/assets/';
const PREFIX = '/videos';

router.post(
  '/video',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.files)
      return res.status(400).json({
        message: 'No video file passed.',
      });

    const relative_path = path.join(
      PREFIX,
      uuid.v4() + path.extname(req.files['video'].name)
    );
    req.files['video'].mv(path.join(BASE_FILE_PATH, relative_path));

    _.getVideoDurationInSeconds(relative_path).then(duration => {
      return res.status(200).json({
        video_path: relative_path,
        duration: duration,
        message: 'Success.',
      });
    })
  }
);

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const unit = new LectureUnit({
      lecture: req.body.lecture_id,
      title: req.body.title,
      description: req.body.description,
      publish_date: req.body.publish_date,
      video_path: req.body.video_path,
    });

    unit.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      } else {
        Lecture.findById(req.body.lecture_id).then(async (lecture) => {
          lecture.units.push(unit._id);
          await lecture.save();
        });
        return res.status(200).json({ message: 'Success.', unit_id: unit._id });
      }
    });
  }
);

router.get(
  '/:lectureUnitId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await LectureUnit.findById(req.params.lectureUnitId)
      .populate('quizzes')
      .exec(function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Internal server error.' });
        } else return res.status(200).json(result);
      });
  }
);

router.patch(
  '/:lectureUnitId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can update lectures.',
      });

    LectureUnit.findById(req.params.lectureUnitId)
      .then((unit) => {
        if (req.body.video_path !== undefined) fs.unlinkSync(unit.video_path);

        unit.overwrite(req.body);
        unit.save();
        return res.status(200).json({ message: 'Success.' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      });
  }
);

router.get(
  '',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json(await LectureUnit.find({ _id: req.query.id }));
  }
);

router.delete(
  '/:lectureUnitId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can delete lectures.',
      });

    LectureUnit.findById(req.params.lectureUnitId)
      .populate('lecture')
      .exec()
      .then((unit) => {
        if (
          !((unit.lecture as ILecture).lecturer as IUser)._id.equals(
            req.user._id
          )
        )
          return res.status(401).json({
            message: 'You can only delete your own lectures.',
          });

        DeletionService.deleteLectureUnit(req.params.lectureUnitId).then(() =>
          res.status(200).json({
            message: 'Success.',
          })
        );
      });
  }
);

export const lectureUnitRouter = router;
