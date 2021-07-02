import {BaseService} from "./base-service";
import {IUser} from "@seba/models";
import {ILoginTransport, IRegisterTransport} from "@seba/api-interfaces";

export class UserService extends BaseService {
  public static async login(body: ILoginTransport) {
    return await this.authenticatedRequest("POST", "user/login", body);
  }

  public static async register(body: IRegisterTransport) {
    return await this.authenticatedRequest("POST", "user/register", body);
  }

  public static async getCurrent() {
    const response = await this.authenticatedRequest("GET", "user/current");
    return await response.json() as IUser;
  }
}
