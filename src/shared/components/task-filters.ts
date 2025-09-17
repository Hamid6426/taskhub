import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPriority } from '../../core/models/task.model';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex space-x-2 mb-4">
      <input type="text" placeholder="Search..." (input)="onSearch($event)" class="input" />
      <select (change)="onFilter($event)" class="input">
        <option value="">All Priorities</option>
        <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
      </select>
    </div>
  `,
})
export class TaskFilters {
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
