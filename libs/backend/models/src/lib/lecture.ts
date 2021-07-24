import * as mongoose from 'mongoose';
import {ILectureUnit} from './lecture-unit';
import {IUser} from './user';

export interface ILecture extends mongoose.Document {
  title: string;
  short_title: string;
  semester: string;
  lecturer: IUser | string;
  units: [ILectureUnit] | [string];
}

export const LectureSchema = new mongoose.Schema({
  title: String,
  short_title: String,
  semester: String,
  lecturer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  units: [{type: mongoose.Schema.Types.ObjectId, ref: 'LectureUnit'}],
});

export const Lecture = mongoose.model<ILecture>('Lecture', LectureSchema);