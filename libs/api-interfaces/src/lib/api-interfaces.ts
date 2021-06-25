export interface ICreateLectureTransport {
  title: string,
  short_title: string,
  semester: string
}

export interface ICreateLectureUnitTransport {
  lecture_id: string,
  title: string,
  description: string,
  // TODO Gregor: Use Date here
  publish_date: string,
  video_path: string
}
