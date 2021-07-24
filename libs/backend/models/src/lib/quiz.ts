import * as mongoose from 'mongoose';
import { IUser } from './user';

export interface IQuizSubmission extends mongoose.Document {
  user?: mongoose.PopulatedDoc<IUser>;
  answers: mongoose.Types.DocumentArray<IQuizAnswer>;
}
export interface IQuizAnswer extends mongoose.Document {
  answer: string;
  isCorrect: boolean;
}
export interface IQuizQuestion extends mongoose.Types.Subdocument {
  question: string;
  answers: IQuizAnswer[];
  submissions:  mongoose.Types.DocumentArray<IQuizSubmission>;
}
export interface IQuiz extends mongoose.Document {
  unit_id: string;
  timestamp: number;
  questions: mongoose.Types.DocumentArray<IQuizQuestion>;
}

const QuizAnswerSchema = new mongoose.Schema({
  answer: String,
  isCorrect: Boolean,
});

const QuizSubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [QuizAnswerSchema],
});

const QuizQuestionSchema = new mongoose.Schema({
  question: String,
  answers: [QuizAnswerSchema],
  submissions: { type: [QuizSubmissionSchema], default: [] },
});

export const QuizSchema = new mongoose.Schema({
  //todo add lecture unit?
  unit_id: String,
  timestamp: Number,
  questions: [QuizQuestionSchema],
});

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);
