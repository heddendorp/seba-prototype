import * as mongoose from "mongoose";
import {IUser} from "@seba/models";
import {Schema} from "mongoose";
import {ChatMessageSchema, IChatMessage} from "./chat-message";

export interface IStudyGroup extends Document {
  students: Array<IUser>,
  chat: Array<IChatMessage>
}

export const StudyGroupSchema = new mongoose.Schema({
  students: [{type: Schema.Types.ObjectId, ref: "User"}],
  chat: [ChatMessageSchema]
});

export const StudyGroup = mongoose.model<IStudyGroup>("StudyGroup", StudyGroupSchema);
