import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer"
      (click)="selectTask.emit(task)"
    >
      <h3 class="font-bold">{{ task.title }}</h3>
      <p class="text-sm">{{ task.description }}</p>
      <p class="text-xs text-gray-500">Due: {{ task.dueDate | date : 'shortDate' }}</p>
      <span class="badge">{{ task.priority }}</span>
    </div>
  `,
})
export class TaskCard {
  @Input() task!: Task;
  @Output() selectTask = new EventEmitter<Task>();
}
