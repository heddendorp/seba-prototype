import * as express from "express";
import * as passport from "passport";
import {Lecture, LectureUnit} from "@seba/models";

const router = express.Router();

router.post("/video",
  //todo: add the authenticate functionality
  //passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: "No files"
        })
      } else {
        req.files.video.mv("../../../../apps/api/src/assets/videos/" + req.files.video.name)

        res.send({
          status: true,
          message: "File is uploaded"
        })
      }
    } catch (e) {
      res.status(500).send(e)
    }
  })

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
        res.status(500);
        console.log(err);
      } else {
        Lecture.findById(req.body.lecture_id)
          .then(async lecture => {
            lecture.units.push(unit._id);
            await lecture.save();
          });
        res.status(200);
      }
    });
  }
)

router.get(
  "/getPublishedByIds/?",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    // TODO: If lecturer -> all if student published only - probably needs renaming of route
    res.json(await LectureUnit.find({_id: { $in: req.query.id }}))
  }
);

export const lectureUnitRouter = router;
