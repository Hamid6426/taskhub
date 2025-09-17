import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="input-group mb-4 d-flex gap-4 pb-3">
      <input
        type="text"
        placeholder="Search..."
        [value]="searchQuery"
        (input)="onSearch($event)"
        class="input"
      />

      <select [value]="selectedPriority" (change)="onPriorityChange($event)" class="form-select">
        <option value="">All Priorities</option>
        <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
      </select>

      <select [value]="selectedStatus" (change)="onStatusChange($event)" class="form-select">
        <option value="">All Statuses</option>
        <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
      </select>
    </div>
  `,
})
export class TaskFilters {
  @Input() searchQuery = '';
  @Input() selectedPriority: TaskPriority | '' = '';
  @Input() selectedStatus: TaskStatus | '' = '';

  @Output() search = new EventEmitter<string>();
  @Output() priorityFilter = new EventEmitter<TaskPriority | ''>();
  @Output() statusFilter = new EventEmitter<TaskStatus | ''>();

  priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];
  statuses: TaskStatus[] = ['to_do', 'in_progress', 'done', 'blocked'];

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }

  onPriorityChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value === '' ? '' : (select.value as TaskPriority);
    this.priorityFilter.emit(value);
  }

  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value === '' ? '' : (select.value as TaskStatus);
    this.statusFilter.emit(value);
  }
}
