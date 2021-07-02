import {Role} from "@seba/models";

export interface ICreateLectureTransport extends Record<string, unknown> {
  title: string,
  short_title: string,
  semester: string
}

export interface ICreateLectureUnitTransport extends Record<string, unknown> {
  lecture_id: string,
  title: string,
  description: string,
  publish_date: Date,
  video_path: string
}

export interface IUploadVideoTransport {
  file: File,
  onProgress: (e: ProgressEvent) => void,
  callback: (response: string) => void
}

export interface ILoginTransport extends Record<string, unknown> {
  username: string,
  password: string
}

export interface IRegisterTransport extends Record<string, unknown> {
  display_name: string,
  username: string,
  password: string,
  role: Role
}
