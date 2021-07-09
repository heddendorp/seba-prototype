import * as mongoose from "mongoose";
import {IQuizAnswer} from "./quiz-answer";
import {IQuizSubmission} from "./quiz-submission";

export interface IQuiz extends mongoose.Document {
  timestamp: number,
  options: Array<IQuizAnswer>,
  isSingleChoice: boolean,

  submissions: Array<IQuizSubmission>
}

export const QuizSchema = new mongoose.Schema({
  timestamp: Number,
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: "QuizQuestion"}]
});

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
