import * as mongoose from "mongoose";
import {IUser} from "./user";
import {IQuiz} from "./quiz";
import {IQuizOption} from "./quiz-answer";


export interface IQuizSubmission extends mongoose.Document {
  quiz: IQuiz,
  author: IUser,
  selectedOptions: Array<IQuizOption>
}

export const QuizSubmissionSchema = new mongoose.Schema({
  quiz_id: String,
  author_id: String,
  selected_option_ids: [String]
});

const QuizSubmissionModel = mongoose.model<IQuizSubmission>("QuizSubmission", QuizSubmissionSchema);
export default QuizSubmissionModel;
