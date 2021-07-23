import {BaseService} from "./base-service";
import {ICreateStudyGroupResponse, ICreateStudyGroupTransport, IJoinStudyGroupTransport} from "@seba/api-interfaces";

export class StudyGroupService extends BaseService {

  public static async create(body: ICreateStudyGroupTransport) {
    const response = await this.authenticatedRequest('POST', 'study-group', body);
    return await response.json() as ICreateStudyGroupResponse;
  }

  public static async join(body: IJoinStudyGroupTransport) {
    return await this.authenticatedRequest('POST', 'study-group/join', body);
  }
}
