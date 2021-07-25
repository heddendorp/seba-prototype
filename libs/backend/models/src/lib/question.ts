import * as mongoose from 'mongoose';
import { IUser, UserSchema } from './user';

export interface IAnswer extends mongoose.Types.Subdocument {
  author: IUser & mongoose.Types.EmbeddedDocument;
  text: string;
  markedAsCorrect: boolean;
}

export const AnswerSchema = new mongoose.Schema({
  author: UserSchema,
  text: String,
  markedAsCorrect: { type: Boolean, default: false },
});

export interface IQuestion extends mongoose.Document {
  timestamp: number;
  author: IUser;
  text: string;
  title: string;
  upVotes: mongoose.PopulatedDoc<IUser[]>;
  answers: mongoose.Types.DocumentArray<IAnswer>;
  isAnswered: boolean;
}

export const QuestionSchema = new mongoose.Schema({
  timestamp: Number,
  author: UserSchema,
  text: String,
  title: String,
  upVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  answers: [{type:AnswerSchema, default:[]}],
  isAnswered: Boolean,
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
