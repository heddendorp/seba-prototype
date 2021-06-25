import * as mongoose from "mongoose";
import {IQuiz, QuizSchema} from "./quiz";
import {IQuestion, QuestionSchema} from "./question";

export interface ILectureUnit extends mongoose.Document {
  lecture: string,
  title: string,
  description: string,
  publish_date: Date,
  video_path: string,
  quizzes: Array<IQuiz>,
  questions: Array<IQuestion>
}

export const LectureUnitSchema = new mongoose.Schema({
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' },
  title: String,
  description: String,
  publish_date: Date,
  video_path: String,
  quizzes: [QuizSchema],
  questions: [QuestionSchema]
})

export const LectureUnit = mongoose.model<ILectureUnit>("LectureUnit", LectureUnitSchema);
