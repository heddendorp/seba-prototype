import * as express from "express";
import * as passport from "passport";
import * as _ from "lodash";
import {IUser, Lecture, LectureUnit, Quiz, Role} from "@seba/backend/models";

const router = express.Router();

router.get(
  "/:lectureId",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can view lecture statistics."
      });
    
    const lectureStatistics = [];
    Lecture.findById(req.params.lectureId).then(lecture => {
      if (!(lecture.lecturer as IUser)._id.equals(req.user._id))
        return res.status(401).json({
          message: "You can only view your own lecture statistics."
        });

      lecture.units.forEach(unit_id =>
        LectureUnit.findById(unit_id).then(unit => {

          const unitStatistics = [];
          unit.quizzes.forEach(quiz_id => {
            Quiz.findById(quiz_id).then(quiz => {

              const quizStatistics = [];
              quiz.questions.forEach(question => {
                const count = question.answers.filter(answer => answer.isCorrect).length;
                question.submissions.forEach(submission => {
                  const subcount = submission.answers.filter(answer => answer.isCorrect).length;
                  if (count == subcount)
                    if (submission.user._id in quizStatistics)
                      quizStatistics[submission.user._id]++;
                    else
                      quizStatistics[submission.user.id] = 1;  
                });
              });

              unitStatistics.push(_.mapValues(_.invert(quizStatistics, true), "length"));
            });
          });
          lectureStatistics.push(unitStatistics);
        }));
      res.status(200).json(lectureStatistics);
    }).catch((err) => res.status(500).json(err));
  }
);

export const statisticRouter = router;
