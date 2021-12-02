import {ITask} from 'interfaces/task.interface';

export type ManageTaskDialogProps = {
  task: ITask | null;
  isOpen: boolean;
  handleClose: HandleCloseFunction;
}

type HandleCloseFunction = {
  (data: false | ITask): void;
}

