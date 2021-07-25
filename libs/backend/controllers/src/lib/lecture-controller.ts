import * as express from 'express';
import * as passport from 'passport';
import { IUser, Lecture, Role } from '@seba/backend/models';
import { DeletionService } from '@seba/backend/services';

const router = express.Router();

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can create lectures.',
      });

    const lecture = new Lecture({
      title: req.body.title,
      short_title: req.body.short_title,
      semester: req.body.semester,
      lecturer: req.user._id,
    });

    lecture.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      } else return res.status(200).json({ message: 'Success.', lecture_id: lecture._id });
    });
  }
);

router.get(
  '',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let result;
    switch (+req.user.role) {
      case Role.LECTURER:
        result = await Lecture.find({ lecturer: req.user._id })
          .populate('units')
          .exec();
        break;
      case Role.STUDENT:
        result = await Lecture.find({ students: req.user._id })
          .populate({
            path: 'units',
            match: { publish_date: { $lte: Date.now() } },
          })
          .exec();
        break;
      default:
        throw new Error('Not implemented');
    }

    res.json(result);
  }
);

router.get(
  '/:lectureId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await Lecture.findById(req.params.lectureId, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      } else return res.status(200).json(result);
    }).exec();
  }
);

router.patch(
  '/:lectureId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can update lectures.',
      });

    await Lecture.findByIdAndUpdate(
      req.params.lectureId,
      { $set: req.body },
      function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Internal server error.' });
        } else return res.status(200).json({ message: 'Success.' });
      }
    ).exec();
  }
);

router.delete(
  '/:lectureId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can delete lectures.',
      });

    Lecture.findById(req.params.lectureId).then((lecture) => {
      if (!(lecture.lecturer as IUser)._id.equals(req.user._id))
        return res.status(401).json({
          message: 'You can only delete your own lectures.',
        });

      DeletionService.deleteLecture(req.params.lectureId).then(() =>
        res.status(200).json({
          message: 'Success.',
        })
      );
    });
  }
);

export const lectureRouter = router;
