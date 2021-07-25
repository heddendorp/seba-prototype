import * as express from 'express';
import * as passport from 'passport';
import { StudyGroup } from '@seba/backend/models';

const router = express.Router();

router.post(
  '',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const studyGroup = new StudyGroup({
      unit: req.body.unit_id,
      private: false,
      students: [req.body.student_id],
    });

    studyGroup.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error.' });
      } else return res.status(200).json({ message: 'Success.', group_id: studyGroup._id });
    });
  }
);

router.put(
  '/:groupId/:private',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    StudyGroup.findById(req.params.groupId)
      .then((group) => {
        group.private = req.params.private == 'true';
        group.save();

        res.status(200).json({ message: 'Success.' });
      })
      .catch((err) => res.status(500).json(err));
  }
);

router.get(
  '/:unitId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    StudyGroup.findOne({ unit: req.params.unitId, private: false })
      .then((group) => {
        if (!group) res.status(404).json({ message: 'No active group found.' });

        res.status(200).json({ message: 'Success.', groupId: group._id });
      })
      .catch((err) => res.status(500).json(err));
  }
);

export const studyGroupRouter = router;
