import { Subject, interval } from 'rxjs';
import { Task } from '../core/models/task.model';
import { MOCK_TASKS } from './tasks.mock';
import { map } from 'rxjs/operators';

export const taskUpdates$ = new Subject<Task>();

// Randomly update or add a task every 5-10 seconds
interval(7000)
  .pipe(
    map(() => {
      const randomTask = MOCK_TASKS[Math.floor(Math.random() * MOCK_TASKS.length)];
      if (!randomTask) return null;

      const updatedTask: Task = {
        ...randomTask,
        title: randomTask.title + ' (updated)',
        status: randomTask.status,
      };
      return updatedTask;
    })
  )
  .subscribe((task) => task && taskUpdates$.next(task));
