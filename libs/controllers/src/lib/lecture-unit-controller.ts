import * as express from "express";
import * as passport from "passport";
import {Lecture, LectureUnit, Role} from "@seba/models";

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

/*
router.get(
  "/getPublishedByIds/?",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    // TODO: If lecturer -> all if student published only - probably needs renaming of route
    res.json(await LectureUnit.find({_id: { $in: req.query.id }}))
  }
);
 */

router.get(
  "/:lectureUnitId",
  //passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    await LectureUnit.findById(req.params.lectureUnitId, function (err, result) {
      if (err){
        console.log(err);
        return res.status(500).json({message: "Internal server error."});
      }
      else
        return res.status(200).json(result);
    });
  }
)

router.post(
  "/:lectureUnitId",
  //passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can update lectures."
      });

    await LectureUnit.findByIdAndUpdate(req.params.lectureUnitId, {$set: req.body}, function (err) {
      if (err){
        console.log(err);
        return res.status(500).json({message: "Internal server error."});
      }
      else
        return res.status(200).json({message: "Success."});
    });
  }
);

export const lectureUnitRouter = router;
