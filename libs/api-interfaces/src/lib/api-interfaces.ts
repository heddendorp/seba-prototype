import { IAnswer, IQuizSubmission, Role } from '@seba/models';

export interface ICreateLectureTransport extends Record<string, unknown> {
  title: string;
  short_title: string;
  semester: string;
}

export interface ICreateLectureUnitTransport extends Record<string, unknown> {
  lecture_id: string;
  title: string;
  description: string;
  publish_date: Date;
  video_path: string;
}

export interface IEditLectureUnitTransport extends Record<string, unknown> {
  title: string;
  description: string;
  publish_date: Date;
  video_path: string | undefined;
}

export interface IUploadVideoTransport {
  file: File;
  onProgress: (e: ProgressEvent) => void;
  callback: (response: string) => void;
}

export interface ILoginTransport extends Record<string, unknown> {
  username: string;
  password: string;
}

export interface IRegisterTransport extends Record<string, unknown> {
  display_name: string;
  username: string;
  password: string;
  role: Role;
}

export interface ICreateQuizTransport extends Record<string, unknown> {
  timestamp: number;
  questions: {
    question: string;
    answers: { answer: string; isCorrect: boolean }[];
  }[];
}

export interface IQuizTransport extends ICreateQuizTransport{
  _id: string;
}

export interface IQuestionTransport extends Record<string, unknown> {
  quiz_id: string;
  question: string;
  //options: Array<IAnswer>,
  //todo change singlechoice
  //isSingleChoice: boolean,
  //submissions: Array<IQuizSubmission>
}

export interface IQuizAnswerTransport extends Record<string, unknown> {
  question_id: string;
  text: string;
  isCorrect: boolean;
}
