import * as mongoose from "mongoose";
import {IUser, UserSchema} from "./user";

export interface IAnswer extends mongoose.Document{
  author: IUser,
  text: string,
  markedAsCorrect: boolean
}

export const AnswerSchema = new mongoose.Schema({
  author: UserSchema,
  text: String,
  markedAsCorrect: Boolean
});

export const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);
