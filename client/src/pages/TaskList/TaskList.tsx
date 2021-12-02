import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';

import {addTask, fetchTasks} from 'fetchers/api.fetcher';
import TaskCard from 'components/TaskCard/TaskCard';
import ManageTaskDialog from 'components/ManageTaskDialog/ManageTaskDialog';
import {ITask} from 'interfaces/task.interface';

import './TaskList.css';

export default function TaskList() {
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [isAddNewDialogOpened, setAddNewDialogOpened] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks()
      .then((tasks: Array<ITask>) => setTasks(tasks))
      .catch(error => console.log(error));
  }, []);

  const onTaskDeleted = (id: number | undefined): void => setTasks(tasks.filter(task => task.id !== id));

  const onTaskModified = (): void => {
    fetchTasks()
      .then((tasks: Array<ITask>) => setTasks(tasks))
      .catch(error => console.log(error));
  };

  const onAddNewTask = (): void => setAddNewDialogOpened(true);

  const handleAddNewDialogClose = (dialogData: false | ITask): void => {
    if (!dialogData) setAddNewDialogOpened(false);
    else {
      addTask(dialogData)
        .then(() => fetchTasks())
        .then((tasks: Array<ITask>) => setTasks(tasks))
        .finally(() => setAddNewDialogOpened(false));
    }
  };

  return (
    <>
      <section className={'add-task-container'} aria-label={'Add new task section with button'}>
        <Button variant={'outlined'} onClick={onAddNewTask}>Add new task</Button>
        <ManageTaskDialog task={null} isOpen={isAddNewDialogOpened} handleClose={handleAddNewDialogClose}/>
      </section>
      <section className={'task-card-container'} aria-label={'Unfinished task-cards section'}>
        {tasks.length ?
          tasks.filter(task => !task.finished).map(task =>
            <TaskCard key={task.id} task={task} onTaskDeleted={onTaskDeleted} onTaskModified={onTaskModified}/>)
          : null}
      </section>
      <section className={'task-card-container finished'} aria-label={'Finished task-cards section'}>
        {tasks.length ?
          tasks.filter(task => task.finished).map(task =>
            <TaskCard key={task.id} task={task} onTaskDeleted={onTaskDeleted} onTaskModified={onTaskModified}/>)
          : null}
      </section>
      <section>
        {!tasks.length ?
          <div className={'empty-info-container'}>There is no task created. Click add new to create one!</div> : null}
      </section>
    </>
  );
}
