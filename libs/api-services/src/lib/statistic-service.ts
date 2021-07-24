import {BaseService} from "./base-service";
import { IStatisticTransport } from "@seba/api-interfaces";
import {ILecture} from "@seba/models";

export class StatisticService extends BaseService {
    
    public static async getAll() {
        const response = await this.authenticatedRequest('GET', 'lecture');
        return await response.json() as [ILecture];
      }

    public static async getById(lectureId: string) {
        const response = await this.authenticatedRequest('GET', `statistic/${lectureId}`);
        return await response.json() as [IStatisticTransport];
    }
}