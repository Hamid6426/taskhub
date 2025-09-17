import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority } from '../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()" class="p-4 border rounded space-y-4">
      <input
        type="text"
        [(ngModel)]="task.title"
        name="title"
        placeholder="Title"
        required
        class="input"
      />
      <textarea
        [(ngModel)]="task.description"
        name="description"
        placeholder="Description"
        class="input"
      ></textarea>
      <input type="date" [(ngModel)]="dueDate" name="dueDate" required class="input" />
      <select [(ngModel)]="task.priority" name="priority" required class="input">
        <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
      </select>
      <button type="submit" class="btn-primary">Save Task</button>
    </form>
  `,
})
export class TaskForm {
  @Output() save = new EventEmitter<Task>();
  task: Task = {
    id: Date.now(),
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date(),
    completed: false,
  };
  dueDate: string = new Date().toISOString().split('T')[0];
  priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  submit() {
    this.task.dueDate = new Date(this.dueDate);
    this.save.emit(this.task);
  }
}
