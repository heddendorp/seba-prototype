import {ILecture, Lecture} from "@seba/models";
import {BaseService} from "./base-service";

export class LectureService extends BaseService<ILecture> {

  constructor() {
    super(Lecture, "lecture", "name", "semester");
  }

  create = async (lecture: ILecture) => this.baseCreate(lecture, {name: lecture.name, semester: lecture.semester});

  delete = (name: string, semester: string) => this.baseDelete({name: name, semester: semester});

  get = (name: string, semester: string) => this.baseGet({name:name, semester: semester});

  update = async (lecture: ILecture) => this.baseUpdate(
    lecture,
    {name: lecture.name, semester: lecture.semester},
    "lecturer", "units"
  );
}
