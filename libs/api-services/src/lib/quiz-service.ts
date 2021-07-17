import { BaseService } from './base-service';
import { ICreateQuizTransport, IQuizTransport } from '@seba/api-interfaces';

export class QuizService extends BaseService {
  public static async create(body: ICreateQuizTransport) {
    const response = await this.authenticatedRequest('POST', 'quiz', body);
    return (await response.json()) as IQuizTransport;
  }

  public static async update(quizId: string, body: ICreateQuizTransport) {
    const response = await this.authenticatedRequest(
      'PUT',
      `quiz/${quizId}`,
      body
    );
    return (await response.json()) as IQuizTransport;
  }

  public static async delete(quiz_id: string) {
    const response = await this.authenticatedRequest(
      'DELETE',
      `quiz/${quiz_id}`
    );
    return (await response.json()) as IQuizTransport;
  }

  public static async getAll() {
    const response = await this.authenticatedRequest('GET', 'quiz');
    return (await response.json()) as [IQuizTransport];
  }
}
