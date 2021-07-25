import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUser } from './user';
import { ILectureUnit } from './lecture-unit';

export interface IChatMessage extends mongoose.Types.EmbeddedDocument {
  message: string;
  author: IUser | string;
  timestamp: Date;
}

export const ChatMessageSchema = new mongoose.Schema(
  {
    message: String,
    author: String,
  },
  { timestamps: { createdAt: 'timestamp' } }
);
export interface IStudyGroup extends Document {
  unit: ILectureUnit | string;
  private: boolean;
  students: mongoose.PopulatedDoc<IUser[]>;
  chat: mongoose.Types.DocumentArray<IChatMessage>;
}

export const StudyGroupSchema = new mongoose.Schema(
  {
    unit: { type: Schema.Types.ObjectId, ref: 'LectureUnit' },
    private: Boolean,
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chat: [{ type: ChatMessageSchema, default: [] }],
  },
  { timestamps: true }
);

export const StudyGroup = mongoose.model<IStudyGroup>(
  'StudyGroup',
  StudyGroupSchema
);
