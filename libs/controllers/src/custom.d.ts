import {IUser} from "@seba/models";

declare global {
  declare namespace Express {
    interface Request {
      user: IUser,
      login: (user: IUser, callback) => void,
      [files: string]: File
    }
  }
}
