import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['../../styles/modal.style.scss'],
  template: `
    <div class="custom-modal">
      <div class="custom-modal-dialog">
        <div class="custom-modal-content">
          <div class="w-100 d-flex justify-content-between align-items-center p-3 border">
            <h5 class="modal-title">Edit Task</h5>
            <button type="button" class="btn-close" (click)="close.emit()"></button>
          </div>

          <div class="custom-modal-body p-3">
            <h5 class="mb-3">{{ task?.title }}</h5>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                class="form-control"
                rows="3"
                [value]="task?.description || 'No description provided.'"
                readonly
              ></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Update Status</label>
              <select class="form-select" [(ngModel)]="status">
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          <div class="custom-modal-footer d-flex justify-content-end gap-2 p-3 border-top">
            <button type="button" class="btn btn-outline-secondary" (click)="close.emit()">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" (click)="handleTaskUpdate()">Save</button>
          </div>
        </div>
      </div>
      <div class="custom-backdrop" (click)="close.emit()"></div>
    </div>
  `,
})
export class EditModalComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() updateTask = new EventEmitter<{ task: Task; status: TaskStatus }>();

  status: TaskStatus = 'to_do';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']?.currentValue) {
      this.status = this.task!.status;
    }
  }

  handleTaskUpdate() {
    if (!this.task) return;
    this.updateTask.emit({ task: this.task, status: this.status });
    this.close.emit();
  }
}
