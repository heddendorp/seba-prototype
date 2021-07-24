import QuizList from './quiz-list';
import React, {createRef, useEffect, useState} from 'react';
import {LectureUnitService} from "@seba/frontend/api-services";
import {useParams} from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LectureQuizzesProps {
}

type QuizURLParams = { unit_id: string };
const BASE_API_URL = 'http://localhost:3333';

export function LectureQuizzes(props: LectureQuizzesProps) {

  const videoRef = createRef<HTMLVideoElement>();
  const params = useParams<QuizURLParams>();
  const [videoPath, setVideoPath] = useState<string>('');
  const [timestamp, setTimestamp] = useState(0)

  useEffect(() => {
    LectureUnitService.getById(params.unit_id).then((unit) => {
      setVideoPath(BASE_API_URL + unit.video_path);
    });
  }, [params.unit_id]);

  return (
    <div>
      <h1>Quizzes</h1>
      <video
        id="video_stream"
        controls
        width="100%"
        ref={videoRef}
        src={videoPath}
        onTimeUpdate={(e) => setTimestamp(Math.round(e.target.currentTime))}
      >
        Your browser does not support this video type.
      </video>
      <QuizList timestamp={timestamp}/>
    </div>
  );
}

export default LectureQuizzes;
