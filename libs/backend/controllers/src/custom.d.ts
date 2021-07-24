import {IUser} from '@seba/backend/models';

interface IPassportUser extends IUser {
  statusCode: number;
}

declare global {
  declare namespace Express {
    interface Request {
      user: IPassportUser;
      login: (user: IUser, callback) => void;
      logout: () => void;

      [files: string]: File;
    }
  }
}
