import * as mongoose from "mongoose";

export interface ILecture extends mongoose.Document {
  title: string,
  short_title: string,
  semester: string,
  lecturer: string,
  units: [string]
}

export const LectureSchema = new mongoose.Schema({
  title: String,
  short_title: String,
  semester: String,
  lecturer: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  units: [{type: mongoose.Schema.Types.ObjectId, ref: "LectureUnit"}]
})

export const Lecture = mongoose.model<ILecture>("Lecture", LectureSchema);
