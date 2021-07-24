import * as express from 'express';
import * as passport from 'passport';
import {LectureUnit, Quiz, Role} from '@seba/backend/models';
import {ICreateQuizTransport} from '@seba/shared';

const router = express.Router();

router.post(
  '',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can create quizzes.',
      });
    const quizTransport: ICreateQuizTransport = req.body;
    const quiz = new Quiz({
      unit_id: quizTransport.unit_id,
      timestamp: quizTransport.timestamp,
      questions: quizTransport.questions,
    });

    quiz.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Internal server error.'});
      } else {
        LectureUnit.findById(quizTransport.unit_id).then(async (unit) => {
          unit.quizzes.push(quiz._id);
          await unit.save();
        });
      }
      return res.status(200).json(quiz);
    });
  }
);

router.put(
  '/:quizId',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can update quizzes.',
      });

    Quiz.findById(req.params.quizId).then((quiz) => {
      //Todo mach das richtig, also wie im lecture controller
      quiz.overwrite(req.body);
      quiz.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({message: 'Internal server error.'});
        }
        return res.status(200).json(quiz);
      });
    });
  }
);

router.delete(
  '/:quizId',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can delete quizzes.',
      });

    Quiz.findByIdAndRemove(req.params.quizId, null, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Internal server error.'});
      } else {
        //todo lösche idobject id in der unit
        //LectureUnit.findOneAndUpdate({_id: result.unit_id}, { $pullAll: { quizzes:  result._id }})
        return res.status(200).json(result);
      }
    });
  }
);

router.get(
  '/:lectureUnitId',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    await LectureUnit.findById(req.params.lectureUnitId)
      .populate('quizzes')
      .exec()
      .then((result) => res.json(result.quizzes));
    //todo error handling
  }
);

router.put(
  '/:quizId/submission',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const submissionBody = req.body
    const quiz = await Quiz.findById(req.params.quizId).exec();
    quiz.questions.forEach(question => {
      if (question.submissions.some(submission => req.user._id.equals(submission.user._id))) {
        return;
      }
      if (submissionBody[question._id]) {
        const submission = {
          user: req.user._id,
          answers: Object.values(submissionBody[question._id])
        }
        question.submissions.push(submission);
      } else {
        const submission = {
          user: req.user._id,
          answers: []
        }
        question.submissions.push(submission);
      }
    })
    await quiz.save();
     //todo error handling
    return res.status(200).json(quiz);
  }
);

export const quizRouter = router;
