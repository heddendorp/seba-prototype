import { BaseService } from './base-service';
import {ICreateLectureTransport, IGetLectureTransport} from "@seba/api-interfaces";
import {ILecture} from "@seba/models";

export class LectureService extends BaseService {
  public static async create(body: ICreateLectureTransport){
    return this.authenticatedRequest('POST', 'lecture', body);
  }

  public static async getAll(){
    const response = await this.authenticatedRequest('GET', 'lecture');
    return await response.json() as [ILecture];
  }

  public static async getById(lectureId: string){
    const response = await this.authenticatedRequest('GET', `lecture/${lectureId}`);
    return await response.json() as ILecture;
  }

  public static async update(lectureId: string, body: ICreateLectureTransport){
    return this.authenticatedRequest('POST', `lecture/${lectureId}`, body);
  }
}
