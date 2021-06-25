import { BaseService } from './base-service';
import {ICreateLectureTransport} from "@seba/api-interfaces";

export class LectureService extends BaseService {
  public static async create(body: ICreateLectureTransport){
    return this.authenticatedRequest('POST', 'lecture')
  }

  public static async getAll(){
    return this.authenticatedRequest('GET', 'lecture')
  }
}

// fetch("http://localhost:3333/lecture/create", {
//   method: 'POST',
//   body: JSON.stringify({
//     title: title,
//     semester: semester
//   }),
//   headers: new Headers({"Authorization": "Bearer " + location.state.token})
// }).then(response => {
//   if (response.status !== 200)
//     response.text().then(text => console.log(text));
//
//   history.push("/lecture");
// }).catch(error => alert(error));
