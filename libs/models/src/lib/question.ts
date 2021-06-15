import * as mongoose from "mongoose";
import {IUser, UserSchema} from "./user";
import {IAnswer, AnswerSchema} from "./answer";

export interface IQuestion extends mongoose.Document {
  timestamp: number,
  author: IUser,
  text: string,
  upVotes: number,
  answers: Array<IAnswer>,
  isAnswered: boolean
}

export const QuestionSchema = new mongoose.Schema({
  timestamp: Number,
  author: UserSchema,
  text: String,
  upVotes: Number,
  answers: [AnswerSchema],
  isAnswered: Boolean
});

export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
