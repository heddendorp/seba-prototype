import * as express from 'express';
import * as passport from 'passport';
import { Lecture, LectureUnit, Quiz, Role } from '@seba/models';
import { ICreateQuizTransport, IQuizTransport } from '@seba/api-interfaces';

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
      timestamp: quizTransport.timestamp,
      questions: quizTransport.questions,
    });

    quiz.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      } else console.dir(quiz);
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
    const quizTransport: ICreateQuizTransport = req.body;
    Quiz.findByIdAndDelete(req.params.id, {}, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      } else {
        const quiz = new Quiz({
          timestamp: quizTransport.timestamp,
          questions: quizTransport.questions,
        });
        quiz.save(function (err) {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal server error.' });
          } else console.dir(quiz);
          return res.status(200).json(quiz);
        });
      }
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

    const quiz = new Quiz({
      timestamp: req.body.timestamp,
      quizQuestions: [],
    });
    /*
        const result = await Quiz.find({lecturer: req.user._id}).populate("units").exec();
        LectureUnit.findById(req.params.lectureUnitId, function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({message: "Internal server error."});
          } else
            return res.status(200).json(result);
        });

     */
    Quiz.findByIdAndRemove(req.params.quizId, null, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      } else return res.status(200).json(result);
    });

    //use quiz.deleteone, oder findanddelete oder einfach find.remove
  }
);

router.get(
  '',
  //passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    //todo the populate for subthings
    const quizzes = await Quiz.find({})
      .populate({
        path: 'quizQuestions',
        model: 'QuizQuestion',
        populate: [
          {
            path: 'options',
            model: 'QuizOption',
          },
        ],
      })

      .exec();
    res.json(quizzes);
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


    const answer = new QuizAnswer({
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
