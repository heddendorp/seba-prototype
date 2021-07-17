import * as express from "express";
import * as passport from "passport";
import {ILecture, Lecture, LectureUnit, Role} from "@seba/models";
import * as path from "path";
import * as uuid from "uuid";
import * as fs from "fs";

const router = express.Router();
const BASE_FILE_PATH = "../../../../apps/api/src/assets/videos/";

router.post("/video",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    if (!req.files)
      return res.status(400).json({
        message: "No video file passed."
      });

    const video_path = path.join(BASE_FILE_PATH, uuid.v4() + "." + path.extname(req.files["video"].name));
    req.files["video"].mv(video_path);

    return res.status(200).json({
      video_path: video_path,
      message: "Success."
    })
  }
)

router.post(
  "",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const unit = new LectureUnit({
      lecture: req.body.lecture_id,
      title: req.body.title,
      description: req.body.description,
      publish_date: req.body.publish_date,
      video_path: req.body.video_path
    });

    unit.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error."});
      } else {
        Lecture.findById(req.body.lecture_id)
          .then(async lecture => {
            lecture.units.push(unit._id);
            await lecture.save();
          });
        return res.status(200).json({message: "Success."});
      }
    });
  }
)

router.get(
  "/:lectureUnitId",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    await LectureUnit.findById(req.params.lectureUnitId, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error."});
      } else
        return res.status(200).json(result);
    });
  }
)

router.patch(
  "/:lectureUnitId",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can update lectures."
      });

    LectureUnit.findById(req.params.lectureUnitId).then(unit => {
      if (req.body.video_path !== undefined)
        fs.unlinkSync(unit.video_path);

      unit.overwrite(req.body);
      unit.save();
      return res.status(200).json({message: "Success."});
    }).catch(err => {
      console.log(err);
      return res.status(500).json({message: "Internal server error."});
    });
  }
);

router.get(
  "",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    res.json(await LectureUnit.find({_id: req.query.id}));
  }
)

router.delete(
  "/:lectureUnitId",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can delete lectures."
      });

    const unit = await LectureUnit.findById(req.params.lectureUnitId).populate("lecture").exec();
    const lecture = unit.lecture as ILecture;
    if (!lecture.lecturer._id.equals(req.user._id))
      return res.status(401).json({
        message: "You can only delete your own lectures."
      });

    // TODO: Delete recursively (Quiz -> Option & co)
    unit.delete();
    return res.status(200).json({message: "Success."});
  }
)

export const lectureUnitRouter = router;
