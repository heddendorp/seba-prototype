import * as mongoose from "mongoose";
import {IUser, UserSchema} from "./user";
import {ILectureUnit, LectureUnitSchema} from "./lecture-unit";

export interface ILecture extends mongoose.Document {
  name: string,
  semester: string,
  lecturer: IUser,
  units: Array<ILectureUnit>
}

export const LectureSchema = new mongoose.Schema({
  name: String,
  semester: String,
  lecturer: UserSchema,
  units: [LectureUnitSchema]
})
LectureSchema.index({name: 1, semester: 1}, {unique: true});

export const Lecture = mongoose.model<ILecture>("Lecture", LectureSchema);
