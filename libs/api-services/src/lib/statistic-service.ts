import {BaseService} from "./base-service";
import {IUser} from "@seba/models";


export class StatisticService extends BaseService {
    public static async getStat(unit_id: int) {
        const response = await this.authenticatedRequest('GET', 'statistic/${qs}');
        return await response.json() as IStatistic;
    }
}