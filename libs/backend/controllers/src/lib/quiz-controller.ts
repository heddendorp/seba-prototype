import * as express from 'express';
import * as passport from 'passport';
import { Lecture, LectureUnit, Quiz, Role } from '@seba/backend/models';
import { ICreateQuizTransport, IQuizTransport } from '@seba/shared';

const router = express.Router();

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
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
        return res.status(500).json({ message: 'Internal server error.' });
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

// handle the update of a quiz
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can update quizzes.',
      });

    Quiz.findById(req.params.id).then((quiz) => {
      quiz.overwrite(req.body);
      quiz.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Internal server error.' });
        }
        return res.status(200).json(quiz);
      });
    });
  }
);

router.delete(
  '/:quizId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: 'Only lecturers can delete quizzes.',
      });

    Quiz.findByIdAndRemove(req.params.quizId, null, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
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
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    await LectureUnit.findById(req.params.lectureUnitId)
      .populate('quizzes')
      .exec()
      .then((result) => res.json(result.quizzes));
    //todo error handling
  }
);

/* router.post(
  '/question',
  //passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    /*if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can create questions."
      });


    const question = new QuizQuestion({
      question: req.body.question,
      options: [],
      //todo change singlechoice
      isSingleChoice: false,
      submissions: []
    });

    question.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error."});
      } else {
        //todo muss erster quiz erstellt werden und dann für jede question eingefügt

        Quiz.findById(req.body.quiz_id).then(async quiz => {
          quiz.quizQuestions.push(question._id);
          await quiz.save();
        })


      }
      return res.status(200).json(question);
    });
  }
) */

/* router.post(
  '/answer',
  //passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    /*if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can create questions."
      });


    const answer = new QuizAnswerOption({
      text: req.body.text,
      isCorrect: false,
      //todo change to correct value
    });

    answer.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error."});
      } else {
        //todo muss erster question erstellt werden und dann für jede question eingefügt

        QuizQuestion.findById(req.body.question_id).then(async question => {
          question.options.push(answer._id);
          await question.save();
        })


      }
      return res.status(200).json(answer);
    });
  }
) */

export const quizRouter = router;
