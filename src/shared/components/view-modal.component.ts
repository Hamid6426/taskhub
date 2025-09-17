import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['../../styles/modal.style.scss'], // reuse the same modal styles
  template: `
    <div class="custom-modal">
      <div class="custom-modal-dialog">
        <div class="custom-modal-content">
          <div class="w-100 d-flex justify-content-between align-items-center p-3 border">
            <h5 class="modal-title">Task Details</h5>
            <button type="button" class="btn-close" (click)="close.emit()"></button>
          </div>
          <div class="card p-3 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-3">Task Details</h5>

              <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" [value]="task?.title" readonly />
              </div>

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
                <label class="form-label">Priority</label>
                <input
                  type="text"
                  class="form-control"
                  [value]="task?.priority | titlecase"
                  readonly
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Status</label>
                <input type="text" class="form-control" [value]="getFormattedStatus()" readonly />
              </div>

              <div class="mb-3">
                <label class="form-label">Due Date</label>
                <input
                  type="text"
                  class="form-control"
                  [value]="task?.dueDate | date : 'mediumDate'"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-backdrop" (click)="close.emit()"></div>
    </div>
  `,
})
export class ViewModalComponent {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();

  getFormattedStatus(): string {
    if (!this.task?.status) return '';
    return this.task.status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
