import * as express from 'express';
import * as passport from 'passport';
import { LectureUnit, Question, Role } from '@seba/backend/models';
import { DeletionService } from '@seba/backend/services';
import * as mongoose from 'mongoose';

const router = express.Router();

router.post(
  '/:lectureUnitId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const lectureUnit = await LectureUnit.findById(req.params.lectureUnitId);
    const question = new Question({
      timestamp: req.body.timestamp,
      author: req.user,
      text: req.body.text,
      title: req.body.title,
      upVotes: [],
      answers: [],
      isAnswered: false,
    });
    question.save(function (err) {
      if (err) {
        res.json(question).status(500);
        console.log(err);
      } else {
        lectureUnit.questions.push(question._id);
        lectureUnit.save(function (err) {
          if (err) {
            res.json(question).status(500);
            console.log(err);
          } else {
            res.json(question);
          }
        });
      }
    });
  }
);

router.get(
  '/:lectureUnitId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const lectureUnit = await LectureUnit.findById(
      req.params.lectureUnitId
    ).populate({ path: 'questions', options: { sort: { timestamp: 1 } } });
    const questions = lectureUnit.questions;
    // console.log(questions);
    res.json(questions);
  }
);

router.put(
  '/:questionId/upvote',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const question = await Question.findById(req.params.questionId);
    if (!question.upVotes.includes(req.user._id)) {
      question.upVotes.push(req.user._id);
    }
    question.save(function (err) {
      if (err) {
        res.json(question).status(500);
        console.log(err);
      } else res.json(question);
    });
  }
);

router.delete(
  '/:questionId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await DeletionService.deleteQuestion(req.params.questionId).catch((err) =>
      res.json(err).status(500)
    );
    res.json({ message: 'Success.' }).status(200);
  }
);

router.post(
  '/:questionId/answer',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const answer = {text: req.body.answer, author: req.user};
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      {
        $push: { answers: answer },
      },
      { new: true }
    );
    res.json(question);
  }
);

router.put(
  '/:questionId/answer/:answerId/accept',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const question = await Question.findById(req.params.questionId);
    const answer = question.answers.id(req.params.answerId);
    answer.markedAsCorrect = true;
    question.isAnswered = true;
    await answer.save();
    await question.save();
    res.json(question);
  }
);

export const questionRouter = router;
