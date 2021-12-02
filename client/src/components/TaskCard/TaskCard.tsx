import React, {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DateRangeIcon from '@mui/icons-material/DateRange';

import {deleteTask, updateTask} from 'fetchers/api.fetcher';
import {ITask} from 'interfaces/task.interface';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import ManageTaskDialog from '../ManageTaskDialog/ManageTaskDialog';
import {TaskCardProps} from './TaskCard.interface';
import './TaskCard.css';

export default function TaskCard({task, onTaskDeleted, onTaskModified}: TaskCardProps) {
  const [isDeleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const [isEditDialogOpened, setEditDialogOpened] = useState<boolean>(false);

  const onDeleteClick = (): void => setDeleteDialogOpened(true);

  const handleDeleteDialogClose = (status: boolean) => {
    if (!status) setDeleteDialogOpened(false);
    else deleteTask(task.id)
          .then((deletedTask: ITask) => onTaskDeleted(deletedTask.id));
  };

  const onEditClick = (): void => setEditDialogOpened(true);

  const handleEditDialogClose = (dialogData: false | ITask): void => {
    if (!dialogData) setEditDialogOpened(false);
    else {
      updateTask(task.id, dialogData)
        .then(() => onTaskModified())
        .finally(() => setEditDialogOpened(false));
    }
  };

  // Set state manually when destroy the component - avoid memory leaks
  useEffect(() => {
    return () => setDeleteDialogOpened(false);
  }, []);

  return (
    <>
      <Card className="card-container" aria-label="Task card container" aria-describedby="task-description">
        <CardContent>
          <section className="description-section" id="task-description">
            <h4>{task.description}</h4>
          </section>
          <section className="time-section">
            <DateRangeIcon fontSize={'small'} sx={{verticalAlign: 'bottom'}}/> {task.start_date} - {task.end_date}
          </section>
        </CardContent>
        <CardActions>
          <Button size={'small'} onClick={onEditClick} aria-label={'Edit task'}>
            <EditIcon color={'primary'} fontSize={'small'}/>
          </Button>
          <Button size={'small'} onClick={onDeleteClick} aria-label={'Delete task'}>
            <DeleteForeverIcon color={'error'} fontSize={'small'}/>
          </Button>
        </CardActions>
      </Card>
      <DeleteDialog isOpen={isDeleteDialogOpened} handleClose={handleDeleteDialogClose}/>
      <ManageTaskDialog task={task} isOpen={isEditDialogOpened} handleClose={handleEditDialogClose}/>
    </>
  );
}
