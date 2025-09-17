import { Component, Input } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="task" class="p-4 border rounded">
      <h2 class="font-bold text-xl">{{ task.title }}</h2>
      <p>{{ task.description }}</p>
      <p class="text-sm text-gray-500">Due: {{ task.dueDate | date : 'shortDate' }}</p>
      <p class="text-sm">Priority: {{ task.priority }}</p>
      <p class="text-sm">Status: {{ task.completed ? 'Completed' : 'Pending' }}</p>
    </div>
  `,
})
export class TaskDetail {
  @Input() task!: Task;
}
