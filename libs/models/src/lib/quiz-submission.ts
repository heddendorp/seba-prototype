import * as mongoose from "mongoose";
import {IUser, UserSchema} from "./user";
import {IQuizOption, QuizOptionSchema} from "./quiz-answer";


export interface IQuizSubmission extends mongoose.Document {
  author: IUser,
  selectedOptions: Array<IQuizOption>
}

export const QuizSubmissionSchema = new mongoose.Schema({
  author: UserSchema,
  selectedOptions: [QuizOptionSchema]
});

export const QuizSubmission = mongoose.model<IQuizSubmission>("QuizSubmission", QuizSubmissionSchema);
