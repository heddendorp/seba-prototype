import * as express from "express";
import * as passport from "passport";
import {Lecture, LectureUnit} from "@seba/models";
import * as path from "path";
import * as uuid from "uuid";

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
  "/getPublishedByIds/?",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    // TODO: If lecturer -> all if student published only - probably needs renaming of route
    res.json(await LectureUnit.find({_id: {$in: req.query.id}}))
  }
);

export const lectureUnitRouter = router;
