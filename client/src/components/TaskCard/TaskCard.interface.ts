import {ITask} from 'interfaces/task.interface';

export type TaskCardProps = {
  task: ITask;
  onTaskDeleted: OnTaskDeletedFunction;
  onTaskModified: OnTaskModifiedFunction;
}

type OnTaskDeletedFunction = {
  (id: number | undefined) : void;
}

type OnTaskModifiedFunction = {
  (): void;
}
