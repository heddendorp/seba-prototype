import {IUser, User} from "@seba/models";
import {BaseService} from "./base-service";

export class UserService extends BaseService<IUser>{

  constructor() {
    super(User, "user", "username");
  }

  create = async (user: IUser) => this.baseCreate(
    user,
    {username: user.username}
  );

  delete = (username: string) => this.baseDelete({username: username});

  get = (username: string) => this.baseGet({username: username});

  update = async (user: IUser) => this.baseUpdate(
    user,
    {username: user.username},
    "role"
  );
}

