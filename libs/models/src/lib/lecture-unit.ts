import * as mongoose from "mongoose";
import {IQuiz} from "./quiz";
import {IQuestion} from "./question";

export interface ILectureUnit extends mongoose.Document {
  name: string,
  video_path: string,
  quizzes: Array<IQuiz>,
  questions: Array<IQuestion>
}

export const LectureUnitSchema = new mongoose.Schema({
  name: String,
  video_path: String,
  quiz_ids: [String],
  question_ids: [String]
})

const LectureUnitModel = mongoose.model<ILectureUnit>("LectureUnit", LectureUnitSchema);
export default LectureUnitModel;
