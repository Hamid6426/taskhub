import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus } from '../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="task" class="card p-4 mb-3">
      <h2 class="card-title">{{ task.title }}</h2>
      <p class="card-text">{{ task.description }}</p>
      <p class="text-muted mb-1">Due: {{ task.dueDate | date : 'shortDate' }}</p>
      <p class="mb-2">
        Priority: <strong>{{ task.priority }}</strong>
      </p>

      <label for="statusSelect" class="form-label">Status:</label>
      <select
        id="statusSelect"
        class="form-select w-auto"
        [value]="task.status"
        (change)="onStatusChange($event)"
      >
        <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
      </select>
    </div>
  `,
})
export class TaskDetail {
  @Input() task: Task | null = null;
  @Output() update = new EventEmitter<Task>();

  statuses: TaskStatus[] = ['to_do', 'in_progress', 'done', 'blocked'];

  onStatusChange(event: Event) {
    if (!this.task) return;
    const select = event.target as HTMLSelectElement;
    const updated: Task = {
      ...this.task,
      status: select.value as TaskStatus,
      updatedAt: new Date(),
    };
    this.update.emit(updated);
  }
}
