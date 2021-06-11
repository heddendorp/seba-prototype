import * as mongoose from "mongoose";
import {IUser} from "./user";

export interface IAnswer extends mongoose.Document{
  author: IUser,
  text: string,
  markedAsCorrect: boolean
}

export const AnswerSchema = new mongoose.Schema({
  author_id: String,
  text: String,
  markedAsCorrect: Boolean
});

const AnswerModel = mongoose.model<IAnswer>("Answer", AnswerSchema);
export default AnswerModel;
