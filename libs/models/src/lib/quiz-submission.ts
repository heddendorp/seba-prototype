import * as mongoose from "mongoose";
import {IUser} from "./user";
import {IQuizAnswer} from "./quiz-answer";


export interface IQuizSubmission extends mongoose.Document {
  author: IUser,
  selectedOptions: Array<IQuizAnswer>
}

export const QuizSubmissionSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  selectedOptions: [{type: mongoose.Schema.Types.ObjectId, ref: "QuizAnswer"}]
});

export const QuizSubmission = mongoose.model<IQuizSubmission>("QuizSubmission", QuizSubmissionSchema);
