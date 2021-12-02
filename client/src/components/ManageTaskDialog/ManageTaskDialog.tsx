import React, {useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField
} from '@mui/material';
import dayjs from 'dayjs';

import {ITask} from 'interfaces/task.interface';
import {ManageTaskDialogProps} from './ManageTaskDialog.interface';
import './ManageTaskDialog.css';

export default function ManageTaskDialog({task, isOpen, handleClose}: ManageTaskDialogProps) {
  const [description, setDescription] = useState(task?.description || '');
  const [startDate, setStartDate] = useState(task?.start_date || dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(task?.end_date || dayjs().format('YYYY-MM-DD'));
  const [completed, setCompleted] = useState<boolean>(task?.finished || false);

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);

  const onStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value);

  const onEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value);

  const onCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => setCompleted(event.target.checked);

  const isSaveDisabled = (): boolean => !(!!description.length && !!startDate && !!endDate);

  const onSaveClick = () => {
    const updatedTask: ITask = {
      description,
      start_date: startDate,
      end_date: endDate,
      finished: completed
    };

    handleClose(updatedTask);
  };

  return (
    <Dialog open={isOpen} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Manage task</DialogTitle>
      <DialogContent>
        <section aria-label={'Section whether the task is completed '}>
          <div>Completed</div>
          <span className={'hint'}>Mark the task as completed</span>
          <Switch checked={completed} onChange={onCompletedChange}/>
        </section>
        <section aria-label={'Section for the description of the task'}>
          <div>Description</div>
          <span className={'hint'}>Provide a description for the task</span>
          <TextField
            id="task-description"
            label="Task description"
            aria-label="Description for the task"
            className={'description-input'}
            multiline
            fullWidth
            rows={2}
            value={description}
            onChange={onDescriptionChange}
          />

        </section>

        <section aria-label={'Section for task start and end time'}>
          <div>Schedule</div>
          <span className={'hint'}>Provide a start and end date for the task</span>
          <TextField
            type="date"
            label="Start date"
            aria-label="Start time picker for the task"
            className={'date-input'}
            disabled={completed}
            InputProps={{inputProps: {max: endDate}}}
            value={startDate}
            onChange={onStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            type="date"
            label="End date"
            aria-label="End time picker for the task"
            className={'date-input'}
            disabled={completed}
            InputProps={{inputProps: {min: startDate}}}
            value={endDate}
            onChange={onEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </section>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button color={'primary'} onClick={onSaveClick} disabled={isSaveDisabled()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
