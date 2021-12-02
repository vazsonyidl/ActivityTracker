import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';

import TaskCard from '../../components/TaskCard/TaskCard';
import ManageTaskDialog from '../../components/ManageTaskDialog/ManageTaskDialog';
import {taskAPIPath} from '../../constants/api.constant';
import {ITask} from '../../interfaces/task.interface';
import './TaskList.css';

export default function TaskList() {
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [isAddNewDialogOpened, setAddNewDialogOpened] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks()
      .then((tasks: Array<ITask>) => setTasks(tasks))
      .catch(error => console.log(error));
  }, []);

  const onTaskDeleted = (id: number) => setTasks(tasks.filter(task => task.id !== id));

  const onTaskModified = () => {
    fetchTasks()
      .then((tasks: Array<ITask>) => setTasks(tasks))
      .catch(error => console.log(error));
  };

  const onAddNewTask = () => setAddNewDialogOpened(true);

  const handleDialogClose = (dialogData: false | ITask) => {
    if (!dialogData) setAddNewDialogOpened(false);
    else {
      fetch('/activity', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dialogData)
      })
        .then(() => fetchTasks())
        .then((tasks: Array<ITask>) => setTasks(tasks))
        .finally(() => setAddNewDialogOpened(false));
    }
  };

  function fetchTasks(): Promise<Array<ITask>> {
    return fetch(taskAPIPath)
      .then(result => result.json());
  }

  return (
    <>
      <section className={'add-task-container'} aria-label={'Add new task section with button'}>
        <Button variant={'outlined'} onClick={onAddNewTask}>Add new task</Button>
        <ManageTaskDialog task={null} isOpen={isAddNewDialogOpened} handleClose={handleDialogClose}/>
      </section>
      <section className={'task-card-container'} aria-label={'Task cards section'}>
        {tasks.length ?
          tasks.map(task => <TaskCard key={task.id} task={task} onTaskDeleted={onTaskDeleted}
                                      onTaskModified={onTaskModified}/>)
          : null}
      </section>
      <section>
        {!tasks.length ?
          <div className={'empty-info-container'}>There is no task created. Click add new to create one!</div> : null}
      </section>
    </>
  );
}
