import * as mongoose from "mongoose";
import { IUser } from "./user";

export interface IQuizSubmission extends mongoose.Document {
  user: IUser;
  answer: IQuizAnswer;
}
export interface IQuizAnswer extends mongoose.Document {
  answer: string;
  isCorrrect: boolean;
}
export interface IQuizQuestion extends mongoose.Document {
    question: string;
    answers: IQuizAnswer[];
    subquestions: IQuizSubmission[];
}
export interface IQuiz extends mongoose.Document {
  timestamp: number,
  questions: Array<IQuizQuestion>
}

const QuizAnswerSchema = new mongoose.Schema({
  answer: String,
  isCorrect: Boolean
});

const QuizSubmissionSchema = new mongoose.Schema({
  user: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  answer: QuizAnswerSchema
});

const QuizQuestionSchema = new mongoose.Schema({
  question: String,
  answers: [QuizAnswerSchema],
  submissions: {type: [QuizSubmissionSchema], default: []}
});

export const QuizSchema = new mongoose.Schema({
  timestamp: Number,
  questions: [QuizQuestionSchema],
  //todo submission
});

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
