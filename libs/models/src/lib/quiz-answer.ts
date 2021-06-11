import * as mongoose from "mongoose";

export interface IQuizOption extends mongoose.Document {
  text: string,
  isCorrect: boolean
}

export const QuizOptionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean
});

const QuizOptionModel = mongoose.model<IQuizOption>("QuizOption", QuizOptionSchema);
export default QuizOptionModel;
