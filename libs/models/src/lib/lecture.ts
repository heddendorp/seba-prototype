import * as mongoose from "mongoose";
import {IUser} from "./user";
import {ILectureUnit} from "./lecture-unit";

export interface ILecture extends mongoose.Document {
  name: string,
  lecturer: IUser,
  units: Array<ILectureUnit>
}

export const LectureSchema = new mongoose.Schema({
  name: String,
  lecturer_id: String,
  unit_ids: [String]
})

const LectureModel = mongoose.model<ILecture>("Lecture", LectureSchema);
export default LectureModel;
