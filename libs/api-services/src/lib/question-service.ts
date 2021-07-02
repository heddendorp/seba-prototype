import { BaseService } from './base-service';
import { IQuestion } from '@seba/models';

export class QuestionService extends BaseService {
  public static async create(body: any){
    return this.authenticatedRequest('POST', 'question', body);
  }

  public static async getAll() {
    const response = await this.authenticatedRequest('GET', 'question');
    return await response.json() as [IQuestion];
  }

  public static upvote(id) {
    return this.authenticatedRequest('POST', `question/${id}/upvote`)
  }
}
