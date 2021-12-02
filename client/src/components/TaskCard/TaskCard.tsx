import React, {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DateRangeIcon from '@mui/icons-material/DateRange';

import DeleteDialog from '../DeleteDialog/DeleteDialog';
import {ITask} from '../../interfaces/task.interface';
import ManageTaskDialog from '../ManageTaskDialog/ManageTaskDialog';
import './TaskCard.css';

export default function TaskCard({task, onTaskDeleted, onTaskModified}: { task: ITask, onTaskDeleted: Function, onTaskModified: Function }) {
  const [isDeleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const [isEditDialogOpened, setEditDialogOpened] = useState<boolean>(false);

  const onDeleteClick = () => setDeleteDialogOpened(true);

  const handleDeleteDialogClose = (status: boolean) => {
    if (!status) setDeleteDialogOpened(false);
    else {
      fetch(`/activity/${task.id}`, {method: 'DELETE'})
        .then(result => result.json())
        .then((deletedTask: ITask) => onTaskDeleted(deletedTask.id));
    }
  };

  const onEditClick = () => setEditDialogOpened(true);

  const handleEditDialogClose = (dialogData: false | ITask) => {
    if (!dialogData) setEditDialogOpened(dialogData);
    else {
      fetch(`/activity/${task.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dialogData)
      })
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
            <DateRangeIcon fontSize={'small'} sx={{verticalAlign: 'bottom'}}/> {task.startdate} - {task.enddate}
          </section>
        </CardContent>
        <CardActions>
          <Button size={'small'} onClick={onEditClick}><EditIcon color={'primary'} fontSize={'small'}/></Button>
          <Button size={'small'} onClick={onDeleteClick}>
            <DeleteForeverIcon color={'error'} fontSize={'small'}/>
          </Button>
        </CardActions>
      </Card>
      <DeleteDialog isOpen={isDeleteDialogOpened} handleClose={handleDeleteDialogClose}/>
      <ManageTaskDialog task={task} isOpen={isEditDialogOpened} handleClose={handleEditDialogClose}/>
    </>
  );
}
