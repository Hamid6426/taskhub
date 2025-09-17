import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Task, TaskPriority } from '../../core/models/task.model';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor],
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
          [(ngModel)]="task.dueDateString"
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
export class CreateTaskComponent {
  private apiService = inject(ApiService);

  task: Partial<Task> & { dueDateString?: string } = {
    title: '',
    description: '',
    priority: 'medium',
    dueDateString: new Date().toISOString().split('T')[0],
  };

  priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  @Output() created = new EventEmitter<Task>();

  submit() {
    const now = new Date();

    const newTask: Task = {
      ...this.task,
      id: Date.now(),
      dueDate: new Date(this.task.dueDateString!),
      status: 'to_do',
      createdAt: now,
      updatedAt: now,
      assigneeId: null,
      priority: this.task.priority!,
    } as Task;

    // Use the ApiService to add task (persists in localStorage)
    this.apiService.addTask(newTask).subscribe({
      next: (res) => {
        if (res.response) {
          this.created.emit(res.response); // emit new task to parent
        }
      },
      error: (err) => {
        console.error('Failed to create task', err);
      },
    });
  }
}
