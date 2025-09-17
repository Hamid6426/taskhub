import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority } from '../../core/models/task.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, NgFor],
  template: `
    <form (ngSubmit)="submit()" class="p-4 border rounded-3">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          id="title"
          type="text"
          [(ngModel)]="task.title"
          name="title"
          class="form-control"
          placeholder="Enter task title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          [(ngModel)]="task.description"
          name="description"
          class="form-control"
          placeholder="Enter task description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="dueDate" class="form-label">Due Date</label>
        <input
          id="dueDate"
          type="date"
          [(ngModel)]="dueDate"
          name="dueDate"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="priority" class="form-label">Priority</label>
        <select
          id="priority"
          [(ngModel)]="task.priority"
          name="priority"
          class="form-select"
          required
        >
          <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary w-100">Save Task</button>
    </form>
  `,
})
export class TaskForm {
  @Output() create = new EventEmitter<Task>();

  task: Partial<Task> = {
    title: '',
    description: '',
    priority: 'medium',
    completed: false,
  };

  dueDate: string = new Date().toISOString().split('T')[0];
  priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  submit() {
    const now = new Date();
    this.create.emit({
      ...this.task,
      id: Date.now(),
      dueDate: new Date(this.dueDate),
      createdAt: now,
      updatedAt: now,
    } as Task);
  }
}
