import { BaseService } from './base-service';
import {
  ICreateStudyGroupResponse,
  ICreateStudyGroupTransport,
} from '@seba/shared';

export class StudyGroupService extends BaseService {
  public static async create(body: ICreateStudyGroupTransport) {
    const response = await this.authenticatedRequest(
      'POST',
      'study-group',
      body
    );
    return (await response.json()) as ICreateStudyGroupResponse;
  }

  public static async getRandomGroup(unit_id: string) {
    return await this.authenticatedRequest('GET', `study-group/${unit_id}`);
  }

  public static async setGroupPrivateStatus(
    groupId: string,
    privateStatus: boolean
  ) {
    return await this.authenticatedRequest(
      'PUT',
      `study-group/${groupId}/${privateStatus}`
    );
  }
}
