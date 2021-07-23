import * as mongoose from 'mongoose';

export enum Role {
  STUDENT,
  LECTURER,
}

export interface IUser extends mongoose.Document {
  username: string;
  display_name: string;
  password: string;
  role: Role;
}

export const UserSchema = new mongoose.Schema({
  username: String,
  display_name: String,
  password: String,
  role: { type: String, enum: Role },
});

export const User = mongoose.model<IUser>('User', UserSchema);
