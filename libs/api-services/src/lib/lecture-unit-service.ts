import {BaseService} from "./base-service";
import {ICreateLectureUnitTransport, IUploadVideoTransport} from "@seba/api-interfaces";
import {StorageService} from "./storage-service";

export class LectureUnitService extends BaseService {
  public static async create(body: ICreateLectureUnitTransport) {
    return this.authenticatedRequest('POST', 'lecture-unit', body);
  }

  public static async uploadVideo(body: IUploadVideoTransport) {
    const data = new FormData();
    data.append("video", body.file);

    const request = new XMLHttpRequest();
    request.open("POST", new URL("lecture-unit/video", this.baseUrl).toString(), true);
    request.setRequestHeader("Authorization", "Bearer " + StorageService.getToken());
    request.upload.onprogress = body.onProgress;
    request.onreadystatechange = function () {
      if (request.readyState === 4)
        body.callback(request.response);
    }
    request.send(data);
  }
}
