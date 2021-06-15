import * as mongoose from "mongoose";
import {IUser, UserSchema} from "./user";
import {ILectureUnit, LectureUnitSchema} from "./lecture-unit";

export interface ILecture extends mongoose.Document {
  name: string,
  lecturer: IUser,
  units: Array<ILectureUnit>
}

export const LectureSchema = new mongoose.Schema({
  name: String,
  lecturer: UserSchema,
  units: [LectureUnitSchema]
})

export const Lecture = mongoose.model<ILecture>("Lecture", LectureSchema);
