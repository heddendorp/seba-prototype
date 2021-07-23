import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {IUser} from "./user";
import {IChatMessage} from "./chat-message";

export interface IStudyGroup extends Document {
  students: Array<IUser>,
  chat: Array<IChatMessage>
}

export const StudyGroupSchema = new mongoose.Schema({
  students: [{type: Schema.Types.ObjectId, ref: "User"}],
  chat: [{type: mongoose.Schema.Types.ObjectId, ref: "ChatMessage"}]
});

export const StudyGroup = mongoose.model<IStudyGroup>("StudyGroup", StudyGroupSchema);
