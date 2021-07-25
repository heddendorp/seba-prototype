import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { StudyGroupService } from '@seba/frontend/api-services';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

/* eslint-disable-next-line */
export interface StudyGroupProps {
  studyGroupId?: string;
  onStudyGroupChange: (studyGroupId: string) => void;
  user: any;
  unitId: string;
  privateStatus: boolean;
  setPrivateStatus: (privateStatus: boolean) => void;
}

export function StudyGroup(props: StudyGroupProps) {
  // state to track dialog status
  const [open, setOpen] = useState(false);
  const [privateStatus, setPrivateStatus] = useState({ isChecked: false });

  // state of the groupId text field
  const [studyGroupId, setStudyGroupId] = useState(props.studyGroupId);

  const [errorOpen, setErrorOpen] = useState(false);

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

  useEffect(() => setPrivateStatus({ isChecked: props.privateStatus }), [
    props.privateStatus,
  ]);

  // handle new group creation
  const handleCreate = () => {
    StudyGroupService.create({
      student_id: props.user._id,
      unit_id: props.unitId,
    }).then((res) => {
      props.onStudyGroupChange(res.group_id);
      setStudyGroupId(res.group_id);
    });
  };

  const handleJoinRandom = () => {
    StudyGroupService.getRandomGroup(props.unitId).then((response) =>
      response.json().then((body) => {
        if (!body.groupId) setErrorOpen(true);
        else {
          setStudyGroupId(body.groupId);
          props.onStudyGroupChange(body.groupId);
        }
      })
    );
  };

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" component="h3">
            Study Group
          </Typography>
        </Grid>
        {props.studyGroupId && (
          <Grid item>
            <Tooltip title={privateStatus ? 'Make public' : 'Make private'}>
              <Checkbox
                checked={privateStatus.isChecked}
                icon={<VisibilityIcon style={{ fontSize: 35 }} />}
                checkedIcon={
                  <VisibilityOffIcon style={{ fontSize: 35, color: 'gray' }} />
                }
                onChange={async (e) => {
                  props.setPrivateStatus(e.target.checked);

                  if (studyGroupId)
                    await StudyGroupService.setGroupPrivateStatus(
                      studyGroupId,
                      e.target.checked
                    );
                }}
              />
            </Tooltip>
          </Grid>
        )}
      </Grid>
      {props.studyGroupId && (
        <>
          <p>
            You are in group <pre>{props.studyGroupId}</pre>
          </p>
        </>
      )}
      {(props.studyGroupId === undefined || props.studyGroupId === null) && (
        <>
          <p>You are not in a group</p>
          <Button onClick={handleCreate}>Create a new group</Button>
          <Button onClick={handleJoinRandom}>Join a random group</Button>
          <Button onClick={handleOpen}>Join a group</Button>
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
      <Dialog open={errorOpen}>
        <DialogTitle>Study group not found</DialogTitle>
        <DialogContent>
          It seems like there is currently no active study group for this unit.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StudyGroup;
