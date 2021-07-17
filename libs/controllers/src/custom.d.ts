import {IUser} from "@seba/models";

interface IPassportUser extends IUser {
  statusCode: number
}

declare global {
  declare namespace Express {
    interface Request {
      user: IPassportUser,
      [files: string]: File,

      login: (user: IUser, callback) => void,
      logout: () => void
    }
  }
}
