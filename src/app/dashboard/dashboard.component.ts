import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

// Shared Components
import { Task, TaskStatus } from '../../core/models/task.model';
import { TaskFilters } from '../../shared/components/task-filters';
import { Loader } from '../../shared/components/loader';
import { User } from '../../core/models/user.model';
import { ReadonlyTaskList } from '../../shared/components/readonly-task-list';
import { ViewModalComponent } from '../../shared/components/view-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskFilters, ReadonlyTaskList, Loader, ViewModalComponent],
  template: `
    <app-loader *ngIf="loading()"></app-loader>

    <app-task-filters
      [searchQuery]="searchQuery()"
      [selectedPriority]="selectedPriority()"
      (search)="onSearch($event)"
      (priorityFilter)="onPriorityFilter($event)"
      (statusFilter)="onStatusFilter($event)"
    ></app-task-filters>

    <app-readonly-task-list
      [tasks]="filteredTasks()"
      [loading]="loading()"
      (selectTask)="onSelectTask($event)"
      (openViewModal)="viewingTask.set($event)"
    ></app-readonly-task-list>

    <app-readonly-view-modal
      *ngIf="viewingTask()"
      [task]="viewingTask()"
      (close)="viewingTask.set(null)"
    ></app-readonly-view-modal>

    <div *ngIf="error()">{{ error() }}</div>
  `,
})
export class DashboardComponent {
  private readonly apiService = inject(ApiService);

  currentUser = signal<User | null>(this.apiService.getCurrentUser());

  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedTaskId = signal<number | null>(null);
  searchQuery = signal<string>('');
  selectedPriority = signal<'low' | 'medium' | 'high' | 'urgent' | ''>('');
  selectedStatus = signal<'to_do' | 'in_progress' | 'done' | 'blocked' | ''>('');
  page = signal(1);
  viewingTask = signal<Task | null>(null);
  editingTask = signal<Task | null>(null);

  filteredTasks = computed(() => {
    const query = this.searchQuery();
    const priority = this.selectedPriority();
    const status = this.selectedStatus();
    const currentUser = this.currentUser();

    return this.tasks().filter((task) => {
      const matchesUser = currentUser?.role === 'admin' || task.assigneeId === currentUser?.id;
      const matchesSearch = task.title.toLowerCase().includes(query.toLowerCase());
      const matchesPriority = priority ? task.priority === priority : true;
      const matchesStatus = status ? task.status === status : true;
      return matchesUser && matchesSearch && matchesPriority && matchesStatus;
    });
  });

  constructor() {
    this.loadTasks();
    effect(() => {
      this.loading() && console.log('Loading my tasks...');
    });
  }

  onViewTask(task: Task) {
    this.viewingTask.set(task);
  }

  handleTaskUpdate(event: { task: Task; status: TaskStatus }) {
    const updatedTask: Task = { ...event.task, status: event.status };
    this.apiService.updateTask(updatedTask).subscribe({
      next: () => this.editingTask.set(null),
      error: (err) => console.error(err),
    });
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
  }

  onPriorityFilter(priority: 'low' | 'medium' | 'high' | 'urgent' | '') {
    this.selectedPriority.set(priority);
  }

  onStatusFilter(status: 'to_do' | 'in_progress' | 'done' | 'blocked' | '') {
    this.selectedStatus.set(status);
  }

  onSelectTask(task: Task) {
    this.selectedTaskId.set(task.id);
  }

  selectedTask = computed(() => {
    const id = this.selectedTaskId();
    return this.tasks().find((t) => t.id === id) ?? null;
  });

  private loadTasks() {
    this.loading.set(true);
    this.apiService.getTasks().subscribe({
      next: (apiResponse) => {
        if (apiResponse?.response && Array.isArray(apiResponse.response)) {
          this.tasks.set(apiResponse.response); // signal mirrors localStorage
        } else {
          this.error.set('Invalid task data received');
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load tasks');
        this.loading.set(false);
      },
    });
  }

  onCreateTask(task: Task) {
    this.apiService.addTask(task).subscribe({
      next: (apiResponse) => {
        if (apiResponse?.response) {
          this.tasks.set([...this.tasks(), apiResponse.response]); // reflect updated list
        } else {
          this.error.set('Failed to add task');
        }
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to add task');
      },
    });
  }

  onUpdateTask(task: Task) {
    this.apiService.updateTask(task).subscribe({
      next: (apiResponse) => {
        if (apiResponse?.response) {
          this.tasks.set(
            this.tasks().map((t) => (t.id === apiResponse.response!.id ? apiResponse.response! : t))
          );
          this.editingTask.set(null); // close modal
        } else {
          this.error.set('Failed to update task');
        }
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to update task');
      },
    });
  }

  onDeleteTask(id: number) {
    this.apiService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter((t) => t.id !== id));
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to delete task');
      },
    });
  }
}
