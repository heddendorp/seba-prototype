import { BaseService } from './base-service';
import {
  ICreateLectureUnitTransport,
  IEditLectureUnitTransport,
  IUploadVideoTransport,
} from '@seba/shared';
import { StorageService } from './storage-service';
import { ILectureUnit } from '@seba/backend/models';

export class LectureUnitService extends BaseService {
  public static async create(body: ICreateLectureUnitTransport) {
    return this.authenticatedRequest('POST', 'lecture-unit', body);
  }

  public static async uploadVideo(body: IUploadVideoTransport) {
    const data = new FormData();
    data.append('video', body.file);

    const request = new XMLHttpRequest();
    request.open(
      'POST',
      new URL('lecture-unit/video', this.baseUrl).toString(),
      true
    );
    request.setRequestHeader(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
    request.upload.onprogress = body.onProgress;
    request.onreadystatechange = function () {
      if (request.readyState === 4) body.callback(request.response);
    };
    request.send(data);
  }

  public static async getById(unit_id: string) {
    const response = await this.authenticatedRequest(
      'GET',
      `lecture-unit/${unit_id}`
    );
    return (await response.json()) as ILectureUnit;
  }

  public static async update(unit_id: string, body: IEditLectureUnitTransport) {
    return this.authenticatedRequest('PATCH', `lecture-unit/${unit_id}`, body);
  }

  static delete(unit_id: string) {
    return this.authenticatedRequest('DELETE', `lecture-unit/${unit_id}`);
  }
}
