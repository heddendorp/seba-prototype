export interface ICreateLectureTransport {
  title: string,
  short_title: string,
  semester: string
}

export interface ICreateLectureUnitTransport {
  lecture_id: string,
  title: string,
  description: string,
  publish_date: Date,
  video_path: string
}
