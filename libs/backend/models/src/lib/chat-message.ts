import * as mongoose from 'mongoose';
import { IUser } from './user';

export interface IChatMessage extends Document {
  text: string;
  author: IUser | string;
}

export const ChatMessageSchema = new mongoose.Schema({
  text: String,
  author: String,
});

export const ChatMessage = mongoose.model<IChatMessage>(
  'ChatMessage',
  ChatMessageSchema
);
