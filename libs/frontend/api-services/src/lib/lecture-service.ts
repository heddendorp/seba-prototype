import { BaseService } from './base-service';
import { ICreateLectureTransport } from '@seba/shared';
import { ILecture } from '@seba/backend/models';

export class LectureService extends BaseService {
  public static async create(body: ICreateLectureTransport) {
    return this.authenticatedRequest('POST', 'lecture', body);
  }

  public static async getAll() {
    const response = await this.authenticatedRequest('GET', 'lecture');
    return (await response.json()) as [ILecture];
  }

  public static async getById(lectureId: string) {
    const response = await this.authenticatedRequest(
      'GET',
      `lecture/${lectureId}`
    );
    return (await response.json()) as ILecture;
  }

  public static async update(lectureId: string, body: ICreateLectureTransport) {
    return this.authenticatedRequest('PUT', `lecture/${lectureId}`, body);
  }

  static async delete(lecture_id: string) {
    return this.authenticatedRequest('DELETE', `lecture/${lecture_id}`);
  }
}
