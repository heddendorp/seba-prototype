import * as mongoose from "mongoose";
import {IUser, UserSchema} from "./user";
import {IAnswer} from "./answer";

export interface IQuestion extends mongoose.Document {
  timestamp: number,
  author: IUser | string,
  text: string,
  upVotes: number,
  answers: [IAnswer] | [string],
  isAnswered: boolean
}

export const QuestionSchema = new mongoose.Schema({
  timestamp: Number,
  author: UserSchema,
  text: String,
  upVotes: Number,
  answers: [{type: mongoose.Schema.Types.ObjectId, ref: "Answer"}],
  isAnswered: Boolean
});

export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
