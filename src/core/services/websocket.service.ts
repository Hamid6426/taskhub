import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { Task } from '../models/task.model';
import { ApiService } from './api.service';
import { switchMap } from 'rxjs/operators';
import { taskUpdates$ } from '../../mocks/websocket-mock';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private taskUpdates = new Subject<Task>();

  constructor(private api: ApiService) {
    interval(10000) // every 10s, simulate an update
      .pipe(switchMap(() => this.api.getTasks()))
      .subscribe((tasks) => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        if (randomTask) {
          this.taskUpdates.next({ ...randomTask, title: randomTask.title + ' (updated)' });
        }
      });
  }

  onTaskUpdate() {
    return this.taskUpdates.asObservable();
  }
}
