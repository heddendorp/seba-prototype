import * as mongoose from "mongoose";
import {IQuizAnswer, IQuizSubmission} from "@seba/models";

export interface IQuizQuestion extends mongoose.Document {
  timestamp: number,
  options: Array<IQuizAnswer>,
  isSingleChoice: boolean,

  submissions: Array<IQuizSubmission>
}

export const QuizQuestionSchema = new mongoose.Schema({
  options: [{type: mongoose.Schema.Types.ObjectId, ref: "QuizAnswer"}],
  isSingleChoice: Boolean,

  submissions: [{type: mongoose.Schema.Types.ObjectId, ref: "QuizSubmission"}]
});

export const Quiz = mongoose.model<IQuizQuestion>("QuizQuestion", QuizQuestionSchema);
