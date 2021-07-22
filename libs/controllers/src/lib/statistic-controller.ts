import * as express from 'express';
import * as passport from 'passport';
import { IUser, Quiz, Role, User } from '@seba/models';
import { __values } from 'tslib';

const router = express.Router();

router.post(
  "",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    if (+req.user.role !== Role.LECTURER)
      return res.status(401).json({
        message: "Only lecturers can access statistics."
      });
  }
);

router.get(
  //get from the db
  "",
  async (req,res) => {
    const qs = req.noofqs,
    const quiz = await Quiz._id, //check if this needs to be passed from the request
    const users = Quiz.questions.submissions.aggregateBy(user),
    for i in users.getbyID() : {
      for j in Quiz.questions.GetbyID() : {
        for k in Quiz.questions.submissions.answer.find(){ //(check if it is Quiz.questions or j)
          if  == true :
            const ans = k,
        }
        if ans == Quiz.questions.submissions.answer.find(user == i){
          l++,
        }
      }
      //l will give the total no of correctly answered qs for one user
      if (qs == l){
        m++, //m is the total no of users who answered qs no of questions correct
      }
    }
    res.json(m);
  }
);

/*

THIS IS THE ALGO FOR FINDING THE NO OF USERS WITH MENTIONED NO OF CORRECT QS

when a quiz id: Quiz._id is passed through request with the no of questions needed (say j)
  for a user id within submissions
    for every question in that user id:
      find the truth value of the question 
      if submission of user id is same as this truth value
        add 1 to variable i
    here we will we get the total no of questions answered correct by selected User
    if the total number of correct qs of this user id (which are i) matches the number provided in request (which are j) 
      add 1 to k
    repeat this process for next user id
  return k


if quizzes.find([quiz._id.questions.submissions.userid == quiz._id.questions])

i/p no of questions correct
o/p no of users with those correct answers
(we can loop this later on no of correct answers, and plot it in a graph)
hello
*/