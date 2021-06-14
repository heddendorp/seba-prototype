import * as mongoose from "mongoose";

export enum Role {
  STUDENT,
  LECTURER
}

export interface IUser extends mongoose.Document {
  username: string,
  role: Role
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true},
  role: Number
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
