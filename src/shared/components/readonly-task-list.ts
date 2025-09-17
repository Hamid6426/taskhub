import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loader } from './loader';
import { Task } from '../../core/models/task.model';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/user.model';
import { ReadonlyTaskCard } from './readonly-task-card';

@Component({
  selector: 'app-readonly-task-list',
  standalone: true,
  imports: [CommonModule, ReadonlyTaskCard, Loader],
  template: `
    <app-loader *ngIf="loading"></app-loader>

    <div *ngIf="!loading" class="row row-cols-1 row-cols-md-2 g-4">
      <div
        *ngIf="tasks.length === 0"
        class="d-flex justify-content-center align-items-center w-100 py-5"
      >
        <div class="text-center border rounded p-5 bg-light shadow-sm" style="max-width: 400px;">
          <i class="bi bi-inbox fs-1 text-secondary mb-3"></i>
          <h5 class="text-secondary mb-0">No tasks found</h5>

          <!-- show different message based on role -->
          <ng-container [ngSwitch]="currentUserRole()">
            <p *ngSwitchCase="'user'" class="text-muted mb-0">🎉 Congrats, no tasks pending!</p>
            <p *ngSwitchDefault class="text-muted mb-0">Create a new task to get started.</p>
          </ng-container>
        </div>
      </div>

      <app-readonly-task-card
        *ngFor="let task of tasks"
        [task]="task"
        (selectTask)="selectTask.emit($event)"
        (openViewModal)="openViewModal.emit($event)"
      ></app-readonly-task-card>
    </div>
  `,
})
export class ReadonlyTaskList {
  @Input() tasks: Task[] = [];
  @Input() loading = false;

  private readonly apiService = inject(ApiService);
  currentUser = signal<User | null>(this.apiService.getCurrentUser());
  currentUserRole = computed(() => this.currentUser()?.role ?? null);

  @Output() selectTask = new EventEmitter<Task>();
  @Output() openViewModal = new EventEmitter<Task>();
}
