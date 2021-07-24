import * as express from 'express';
import * as passport from 'passport';
import {StudyGroup} from '@seba/backend/models';

const router = express.Router();

router.post(
  '',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    const studyGroup = new StudyGroup({
      students: [req.body.student_id],
    });

    studyGroup.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Internal server error.'});
      } else return res.status(200).json({message: 'Success.', group_id: studyGroup._id});
    });
  }
);

router.post(
  '/join',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    StudyGroup.findById(req.body.group_id).then((studyGroup) => {
      studyGroup.students.push(req.body.student_id);
      studyGroup.save();

      return res.status(200).json({message: 'Success.'});
    });
  }
);

export const studyGroupRouter = router;
