import {BaseService} from './base-service';
import {ICreateLectureTransport} from "@seba/api-interfaces";
import {ILecture} from "@seba/models";

export class LectureService extends BaseService {
  public static async create(body: ICreateLectureTransport) {
    return this.authenticatedRequest('POST', 'lecture', body);
  }

  public static async getAll() {
    const response = await this.authenticatedRequest('GET', 'lecture');
    return await response.json() as [ILecture];
  }
}
