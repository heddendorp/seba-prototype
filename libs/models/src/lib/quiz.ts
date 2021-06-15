import * as mongoose from "mongoose";
import {IQuizOption, QuizOptionSchema} from "./quiz-answer";
import {IQuizSubmission, QuizSubmissionSchema} from "./quiz-submission";

export interface IQuiz extends mongoose.Document {
  timestamp: number,
  options: Array<IQuizOption>,
  isSingleChoice: boolean,

  submissions: Array<IQuizSubmission>
}

export const QuizSchema = new mongoose.Schema({
  timestamp: Number,
  options: [QuizOptionSchema],
  isSingleChoice: Boolean,

  submissions: [QuizSubmissionSchema]
});

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
