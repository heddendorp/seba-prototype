import * as express from "express";
import * as passport from "passport";
import {IUser, Lecture, Role} from "@seba/backend/models";

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
    const lecture = await Lecture.findById(req.params.lectureId)
      .populate({path: "units", populate: {path: "quizzes"}})
      .exec();

    if (!(lecture.lecturer as IUser)._id.equals(req.user._id))
      return res.status(401).json({
        message: "You can only view your own lecture statistics."
      });

    lecture.units.forEach(unit => {
      const unitStatistics = [];
      unit.quizzes.forEach(quiz => {
        const questionStats = {};
        quiz.questions.forEach(question => {
          const count = question.answers.filter(answer => answer.isCorrect).length;
          question.submissions.forEach(submission => {
            const subcount = submission.answers.filter(answer => answer.isCorrect).length;
            if (count == subcount) {
              if (submission.user._id in questionStats)
                questionStats[submission.user._id as string]++;
              else
                questionStats[submission.user._id as string] = 1;
            }
            else {
              questionStats[submission.user._id as string] = 0;
            }
          });
        });

        const stats = {};
        for (const key in questionStats) {
          if (questionStats[key] in stats)
            stats[questionStats[key]]++;
          else
            stats[questionStats[key]] = 1;
        }

        unitStatistics.push({quizId: quiz._id, statistics: stats});
      });
      lectureStatistics.push({unitId: unit._id, statistics: unitStatistics});
    });

    res.status(200).json(lectureStatistics);
  }
)
;

export const statisticRouter = router;
