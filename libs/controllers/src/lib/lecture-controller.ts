import * as express from "express";
import * as passport from "passport";
import {Lecture, Role} from "@seba/models";

const router = express.Router();

router.post(
  "",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can create lectures."
      });

    const lecture = new Lecture({
      title: req.body.title,
      semester: req.body.semester,
      lecturer: req.user._id
    });

    lecture.save(function (err) {
      if (err){
        res.status(500);
        console.log(err);
      }
      else
        res.status(200);
    });
  }
);

router.get(
  "",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    res.json(await Lecture.find({lecturer: req.user._id}).populate("units").exec());
  }
)

export const lectureRouter = router;
