import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { Task } from '../models/task.model';
import { ApiService } from './api.service';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private taskUpdates = new Subject<Task>();

  constructor(private api: ApiService) {
    interval(10000) // every 10s, simulate an update
      .pipe(switchMap(() => this.api.getTasks()))
      .subscribe({
        next: (apiResponse) => {
          const tasks = apiResponse.response; // Access the response property
          if (tasks && tasks.length > 0) {
            const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
            this.taskUpdates.next({
              ...randomTask,
              title: randomTask.title + ' (updated)',
            });
          }
        },
        error: (err) => console.error('Error fetching tasks:', err),
      });
  }

  onTaskUpdate() {
    return this.taskUpdates.asObservable();
  }
}
