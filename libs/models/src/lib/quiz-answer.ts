import * as mongoose from "mongoose";

export interface IQuizOption extends mongoose.Document {
  text: string,
  isCorrect: boolean
}

export const QuizOptionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean
});

export const QuizOption = mongoose.model<IQuizOption>("QuizOption", QuizOptionSchema);
