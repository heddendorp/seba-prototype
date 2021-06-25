import * as express from "express";
import * as passport from "passport";
import {Lecture, LectureUnit} from "@seba/models";

const router = express.Router();

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
      if (err){
        res.status(500);
        console.log(err);
      }
      else
      {
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

router.get(
  "",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    res.json(await LectureUnit.find({_id: req.query.id}));
  }
)

export const lectureUnitRouter = router;
