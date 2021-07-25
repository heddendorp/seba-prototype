import { BaseService } from './base-service';

export class StatisticService extends BaseService {
  public static async getByLectureId(lectureId: string) {
    return await this.authenticatedRequest('GET', `statistic/${lectureId}`);
  }
}
