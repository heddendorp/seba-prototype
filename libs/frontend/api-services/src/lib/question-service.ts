import { BaseService } from './base-service';
import { IQuestion } from '@seba/backend/models';

export class QuestionService extends BaseService {
  public static async create(body: any, lectureUnitId: string) {
    return (
      await this.authenticatedRequest('POST', `question/${lectureUnitId}`, body)
    ).json();
  }

  public static async getAll(lectureUnitId: string) {
    const response = await this.authenticatedRequest(
      'GET',
      `question/${lectureUnitId}`
    );
    return (await response.json()) as [IQuestion];
  }

  public static async upvote(id: string) {
    return (
      await this.authenticatedRequest('PUT', `question/${id}/upvote`)
    ).json();
  }

  public static async addAnswer(id: string, answer: any) {
    return (
      await this.authenticatedRequest('POST', `question/${id}/answer`, {answer})
    ).json();
  }

  public static async acceptAnswer(questionId: string, answerId: string) {
    return (
      await this.authenticatedRequest('PUT', `question/${questionId}/answer/${answerId}/accept`)
    ).json();
  }
}
