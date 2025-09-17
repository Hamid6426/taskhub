import { Component, computed, signal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskCard } from './task-card';
import { Loader } from './loader';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCard, Loader, CommonModule],
  template: `
    <app-loader [loading]="loading()"></app-loader>
    <div *ngIf="!loading()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <app-task-card
        *ngFor="let task of tasks()"
        [task]="task"
        (selectTask)="viewTask($event)"
      ></app-task-card>
    </div>
  `,
})
export class TaskListComponent {
  tasks = signal<Task[]>([]);
  loading = signal(true);

  constructor(private api: ApiService) {
    this.fetchTasks();
  }

  fetchTasks() {
    this.loading.set(true);
    this.api.getTasks().subscribe({
      next: (apiResponse) => {
        // Ensure apiResponse is of type ApiResponse<Task[]>
        if (apiResponse && Array.isArray(apiResponse.response)) {
          this.tasks.set(apiResponse.response);
        } else {
          console.error('Invalid response format:', apiResponse);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  viewTask(task: Task) {
    console.log('Selected task:', task);
  }
}
