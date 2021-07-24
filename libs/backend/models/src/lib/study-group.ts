import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUser } from './user';

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
  students: mongoose.PopulatedDoc<IUser[]>;
  chat: mongoose.Types.DocumentArray<IChatMessage>;
}

export const StudyGroupSchema = new mongoose.Schema({
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  chat: [{ type: ChatMessageSchema, default: [] }],
});

export const StudyGroup = mongoose.model<IStudyGroup>(
  'StudyGroup',
  StudyGroupSchema
);
