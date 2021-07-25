import * as express from 'express';
import * as passport from 'passport';
import { IUser, Lecture, Role } from '@seba/backend/models';

const router = express.Router();

router.get(
  '/:lectureId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can view lecture statistics.',
      });

    const lectureStatistics = {};
    const lecture = await Lecture.findById(req.params.lectureId)
      .populate({ path: 'units', populate: { path: 'quizzes' } })
      .exec();

    if (!(lecture.lecturer as IUser)._id.equals(req.user._id))
      return res.status(401).json({
        message: 'You can only view your own lecture statistics.',
      });

    lecture.units.forEach((unit) => {
      const unitStatistics = {};
      unit.quizzes.forEach((quiz) => {
        const questionStats = {};
        quiz.questions.forEach((question) => {
          const stats = {};

          const count = question.answers.filter((answer) => answer.isCorrect)
            .length;
          question.submissions.forEach((submission) => {
            const subcount = submission.answers.filter(
              (answer) => answer.isCorrect
            ).length;
            if (count == subcount) {
              if (submission.user._id in stats)
                stats[submission.user._id as string]++;
              else stats[submission.user._id as string] = 1;
            } else {
              stats[submission.user._id as string] = 0;
            }
          });

          // Count correct per question
          const temp = {};
          for (const key in stats) {
            if (stats[key] in temp) temp[stats[key]]++;
            else temp[stats[key]] = 1;
          }

          // Parse to chart data structure
          const result = [];
          for (const key in temp) {
            result.push({ points: parseInt(key), count: temp[key] });
          }

          questionStats[question.question] = result;
        });

        unitStatistics[quiz._id as string] = questionStats;
      });
      lectureStatistics[unit.title] = unitStatistics;
    });

    res.status(200).json(lectureStatistics);
  }
);

export const statisticRouter = router;
