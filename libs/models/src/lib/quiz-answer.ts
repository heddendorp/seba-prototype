import * as mongoose from "mongoose";

export interface IQuizAnswer extends mongoose.Document {
  text: string,
  isCorrect: boolean
}

export const QuizAnswerSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean
});

export const QuizAnswer = mongoose.model<IQuizAnswer>("QuizOption", QuizAnswerSchema);
