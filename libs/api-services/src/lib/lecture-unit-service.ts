import {BaseService} from "./base-service";
import {ICreateLectureUnitTransport} from "@seba/api-interfaces";
import {ILectureUnit} from "@seba/models";

export class LectureUnitService extends BaseService {
  public static async create(body: ICreateLectureUnitTransport){
    return this.authenticatedRequest('POST', 'lecture-unit', body);
  }

  public static async getById(lectureUnitId: string){
    const response = await this.authenticatedRequest('GET', `lecture-unit/${lectureUnitId}`);
    return await response.json() as ILectureUnit;
  }

  public static async update(lectureUnitId: string, body: ICreateLectureUnitTransport){
    return this.authenticatedRequest('POST', `lecture-unit/${lectureUnitId}`, body);
  }
}
