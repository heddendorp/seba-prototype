import * as mongoose from "mongoose";
import {IQuiz, QuizSchema} from "./quiz";
import {IQuestion, QuestionSchema} from "./question";

export interface ILectureUnit extends mongoose.Document {
  name: string,
  video_path: string,
  quizzes: Array<IQuiz>,
  questions: Array<IQuestion>
}

export const LectureUnitSchema = new mongoose.Schema({
  name: String,
  video_path: String,
  quizzes: [QuizSchema],
  questions: [QuestionSchema]
})

export const LectureUnit = mongoose.model<ILectureUnit>("LectureUnit", LectureUnitSchema);
