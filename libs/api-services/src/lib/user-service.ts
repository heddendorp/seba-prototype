import {BaseService} from "./base-service";
import {IUser} from "@seba/models";

export class UserService extends BaseService {
  public static async getCurrent() {
    const response = await this.authenticatedRequest("GET", "user/current");
    return await response.json() as IUser;
  }
}
