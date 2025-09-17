import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-3">
      <div class="card-body d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">{{ task.title }}</h5>
        <button class="btn btn-sm btn-danger" (click)="onDelete()" aria-label="Delete task">
          <i class="bi bi-trash"></i>
          <!-- Optional: Bootstrap Icons -->
        </button>
      </div>
    </div>
  `,
})
export class TaskCard {
  @Input() task!: Task;
  @Output() selectTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  onSelect() {
    this.selectTask.emit(this.task);
  }

  onDelete() {
    this.deleteTask.emit(this.task.id); // emit the task ID
  }
}
