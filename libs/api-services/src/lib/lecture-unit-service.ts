import {BaseService} from "./base-service";
import {ICreateLectureUnitTransport} from "@seba/api-interfaces";

export class LectureUnitService extends BaseService {
  public static async create(body: ICreateLectureUnitTransport){
    return this.authenticatedRequest('POST', 'lecture-unit', body);
  }
}
