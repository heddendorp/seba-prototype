import {BaseService} from "./base-service";
import {ICreateLectureUnitTransport} from "@seba/api-interfaces";
import {ILecture} from "@seba/models";

export class LectureUnitService extends BaseService {
  public static async create(body: ICreateLectureUnitTransport){
    return this.authenticatedRequest('POST', 'lecture-unit', body);
  }

  public static async getById(unit_id: string) {
    const response = await this.authenticatedRequest("GET", "lecture-unit/?id=" + unit_id);
    return await response.json() as ILecture;
  }
}
