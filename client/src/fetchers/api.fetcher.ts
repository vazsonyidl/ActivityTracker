import {ITask} from 'interfaces/task.interface';
import {taskAPIPath} from 'constants/api.constant';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

export function fetchTasks(): Promise<Array<ITask>> {
  return fetch(taskAPIPath).then(response => response.json());
}

export function deleteTask(taskId: number | undefined): Promise<ITask> {
  return fetch(`${taskAPIPath}/${taskId}`, {method: 'DELETE'}).then(response => response.json());
}

export function updateTask(taskId: number | undefined, task: ITask): Promise<ITask> {
  return fetch(`${taskAPIPath}/${taskId}`, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(task)
  }).then(result => result.json());
}

export function addTask(task: ITask): Promise<ITask> {
  return fetch(taskAPIPath, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(task)
  }).then(result => result.json());
}
