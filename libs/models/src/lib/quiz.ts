import * as mongoose from "mongoose";
import {IQuizOption} from "./quiz-answer";

export interface IQuiz extends mongoose.Document {
  timestamp: number,
  options: Array<IQuizOption>,
  isSingleChoice: boolean
}

export const QuizSchema = new mongoose.Schema({
  timestamp: Number,
  options_ids: [String],
  isSingleChoice: Boolean
});

const QuizModel = mongoose.model<IQuiz>("Quiz", QuizSchema);
export default QuizModel;
