import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-readonly-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-3" [class.selected]="isSelected()" (click)="onSelect()">
      <div class="card-body d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">{{ task.title }}</h5>
        <div class="btn-group gap-2">
          <button
            class="btn btn-sm btn-outline-secondary"
            (click)="onViewModalOpen(); $event.stopPropagation()"
            aria-label="View task"
          >
            <i class="bi bi-eye-fill"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card.selected {
        border: 2px solid #0d6efd; /* bootstrap primary color */
        box-shadow: 0 0 8px rgba(13, 110, 253, 0.5);
        transition: all 0.2s ease-in-out;
      }
    `,
  ],
})
export class ReadonlyTaskCard {
  @Input() task!: Task;

  @Output() selectTask = new EventEmitter<Task>();
  @Output() openViewModal = new EventEmitter<Task>();

  isSelected = signal(false);

  onSelect() {
    this.isSelected.set(!this.isSelected());
    this.selectTask.emit(this.task);
  }

  onViewModalOpen() {
    this.openViewModal.emit(this.task);
  }
}
