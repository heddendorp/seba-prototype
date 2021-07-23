import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { StudyGroupService } from '@seba/frontend/api-services';
import { User } from '@seba/backend/models';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface StudyGroupProps {
  studyGroupId?: string;
  onStudyGroupChange: (studyGroupId: string) => void;
  user: any;
}

export function StudyGroup(props: StudyGroupProps) {
  // state to track dialog status
  const [open, setOpen] = useState(false);

  // state of the groupId text field
  const [studyGroupId, setStudyGroupId] = useState(props.studyGroupId);

  // handle dialog open/close
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (studyGroupId) {
      props.onStudyGroupChange(studyGroupId);
    }
    setOpen(false);
  };

  // handle new group creation
  const handleCreate = () => {
    StudyGroupService.create({ student_id: props.user._id }).then((res) => {
      props.onStudyGroupChange(res.group_id);
    });
  };

  return (
    <>
      <h3>Study Group</h3>
      {props.studyGroupId && (
        <p>
          You are in group <pre>{props.studyGroupId}</pre>
        </p>
      )}
      {(props.studyGroupId === undefined || props.studyGroupId === null) && (
        <>
          <p>You are not in a group</p>
          <Button onClick={handleCreate}>Create a new group</Button>
          <Button onClick={handleOpen}>Join a Group</Button>
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join a group by ID</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Group ID"
            type="text"
            onChange={(e) => setStudyGroupId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StudyGroup;
