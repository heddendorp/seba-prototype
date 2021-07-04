import './create-lecture.module.scss';
import {useEffect, useState} from 'react';
import UploadLectureDialog from './upload-lecture-dialog/upload-lecture-dialog';
import CreateUnitForm from './create-unit-form';
import {useParams} from 'react-router-dom';
import {LectureUnitService} from "@seba/api-services";
import {useLectureContext} from "@seba/context";
import {useStyles} from "./styles";
import {Button, createStyles, Grid, LinearProgress, makeStyles, TextField, Theme} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {LectureUnitService} from "../../../../api-services/src/lib/lecture-unit-service";

/* eslint-disable-next-line */
export interface EditLectureUnitProps {}

type CreateUnitURLParams = {
  lecture_id: string
}

export function EditLectureUnit(props: EditLectureUnitProps) {
  const context = useLectureContext();
  const classes = useStyles();
  const params = useParams<CreateUnitURLParams>();

  const handleSubmit = async (title: string, dateTime: string, description: string, file: File,
                              setProgress: (value: (((prevState: number) => number) | number)) => void) => {
    await LectureUnitService.uploadVideo({
      file: file,
      onProgress: e => setProgress(e.loaded / e.total * 100),
      callback: response => {
        const body = JSON.parse(response);
        if (body.message !== "Success.")
          throw new Error(body.message);

        LectureUnitService.create({
          lecture_id: params.lecture_id,
          title: title,
          description: description,
          publish_date: new Date(dateTime),
          video_path: JSON.parse(response).video_path
        }).then(() => context.updateLectures())
      }
    });
  };

  //todo refresh navigation

  return (
    <div className={classes.root}>
      <CreateUnitForm handleSubmit={handleSubmit}/>
    </div>
  );
}

export default EditLectureUnit;
