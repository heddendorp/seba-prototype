import * as express from 'express';
import * as passport from 'passport';
import { Question } from '@seba/models';

const router = express.Router();

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const question = new Question({
      timestamp: req.body.timestamp,
      author: req.user,
      text: req.body.text,
      upVotes: 0,
      answers: [],
      isAnswered: false
    });

    question.save(function(err) {
      if (err) {
        res.json(question).status(500);
        console.log(err);
      } else res.status(200);
    });
  }
);

router.get(
  '',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const questions = await Question.find({});
    // console.log(questions);
    res.json(questions)
  }
);

router.post(
  ':questionId/upvote',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const question = await Question.findById(req.params.questionId);
    question.upVotes++;
    question.save(function(err) {
      if (err) {
        res.json(question).status(500);
        console.log(err);
      } else res.status(200);
    });
  }
);

export const questionRouter = router;
