import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex space-x-2 mb-4">
      <input type="text" placeholder="Search..." (input)="onSearch($event.target.value)" class="input"/>
      <select (change)="onFilter($event.target.value)" class="input">
        <option value="">All Priorities</option>
        <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
      </select>
    </div>
  `
})
export class TaskFilters {
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();
  priorities = ['low','medium','high','urgent'];

  onSearch(value: string) { this.search.emit(value); }
  onFilter(value: string) { this.filter.emit(value); }
}
