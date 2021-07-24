import {
  Lecture,
  LectureUnit,
  Question,
  Quiz
} from "../../../models/src";
import * as fs from "fs";
import path = require("path");

export class DeletionService {

  public static async deleteQuiz(id: string) {
    await Quiz.findByIdAndDelete(id);
  }

  public static async deleteQuestion(id: string) {
    await Question.findByIdAndDelete(id);
  }

  public static async deleteLectureUnit(id: string) {
    LectureUnit.findById(id).then(unit => {
      unit.quizzes.forEach(quiz_id => this.deleteQuiz(quiz_id as string));
      unit.questions.forEach(question_id => this.deleteQuestion(question_id as string));

      try {
        fs.unlinkSync(path.join(__dirname, "assets", unit.video_path));
      } catch(err) {
        console.log(err);
      }
    });

    await LectureUnit.findByIdAndDelete(id);
  }

  public static async deleteLecture(id: string) {
    Lecture.findById(id).then(lecture =>
      lecture.units.forEach(unit_id => this.deleteLectureUnit(unit_id as string))
    );

    await Lecture.findByIdAndDelete(id);
  }
}
