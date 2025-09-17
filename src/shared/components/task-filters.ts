import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPriority } from '../../core/models/task.model';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="input-group mb-4">
      <input
        type="text"
        placeholder="Search..."
        [value]="searchQuery"
        (input)="onSearch($event)"
        class="input"
      />
      <select [value]="selectedPriority" (change)="onFilter($event)" class="input select-form">
        <option value="">All Priorities</option>
        <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
      </select>
    </div>
  `,
})
export class TaskFilters {
  @Input() searchQuery = '';
  @Input() selectedPriority: TaskPriority | '' = '';

  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<TaskPriority | ''>();

  priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }

  onFilter(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value === '' ? '' : (select.value as TaskPriority);
    this.filter.emit(value);
  }
}
