import * as mongoose from 'mongoose';
import { IQuiz } from './quiz';
import { IQuestion } from './question';
import { ILecture } from './lecture';

export interface ILectureUnit extends mongoose.Document {
  lecture: string | ILecture;
  title: string;
  description: string;
  publish_date: Date;
  video_path: string;
  quizzes: [IQuiz];
  questions: [IQuestion] | [string];
}

export const LectureUnitSchema = new mongoose.Schema({
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' },
  title: String,
  description: String,
  publish_date: Date,
  video_path: String,
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

export const LectureUnit = mongoose.model<ILectureUnit>(
  'LectureUnit',
  LectureUnitSchema
);
