import * as mongoose from "mongoose";
import {IUser} from "./user";
import {IAnswer} from "./answer";

export interface IQuestion extends mongoose.Document {
  timestamp: number,
  author: IUser,
  text: string,
  upvotes: number,
  answers: Array<IAnswer>,
  isAnswered: boolean
}

export const QuestionSchema = new mongoose.Schema({
  timestamp: Number,
  author_id: String,
  text: String,
  upvotes: Number,
  answer_ids: [String],
  isAnswered: Boolean
});

const QuestionModel = mongoose.model<IQuestion>("Question", QuestionSchema);
export default QuestionModel;
