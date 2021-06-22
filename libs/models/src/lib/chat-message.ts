import * as mongoose from "mongoose";

export interface IChatMessage extends Document {
  text: string,
  timestamp: Date,
  author: string
}

export const ChatMessageSchema = new mongoose.Schema({
  text: String,
  timestamp: Date,
  author: String
});

export const ChatMessage = mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);
