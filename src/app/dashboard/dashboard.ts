import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { WebSocketService } from '../../core/services/websocket.service';

// Shared Components
import { Task } from '../../core/models/task.model';
import { TaskFilters } from '../../shared/components/task-filters';
import { TaskList } from '../../shared/components/task-list';
import { TaskDetail } from '../../shared/components/task-detail';
import { TaskForm } from '../../shared/components/task-form';
import { Loader } from '../../shared/components/loader';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskFilters, TaskList, TaskDetail, TaskForm, Loader],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly apiService = inject(ApiService);

  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedTaskId = signal<number | null>(null);
  searchQuery = signal<string>('');
  selectedPriority = signal<'low' | 'medium' | 'high' | 'urgent' | ''>('');
  page = signal(1);

  filteredTasks = computed(() => {
    const query = this.searchQuery();
    const priority = this.selectedPriority();
    return this.tasks().filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(query.toLowerCase());
      const matchesPriority = priority ? task.priority === priority : true;
      return matchesSearch && matchesPriority;
    });
  });

  constructor() {
    this.loadTasks();
    effect(() => {
      this.loading() && console.log('Loading tasks...');
    });
  }

  private loadTasks() {
    this.loading.set(true);
    this.apiService.getTasks().subscribe({
      next: (apiResponse) => {
        // Ensure the response exists and is an array
        if (apiResponse?.response && Array.isArray(apiResponse.response)) {
          this.tasks.set(apiResponse.response);
        } else {
          this.error.set('Invalid task data received');
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tasks');
        this.loading.set(false);
      },
    });
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
  }

  onFilter(priority: 'low' | 'medium' | 'high' | 'urgent' | '') {
    this.selectedPriority.set(priority);
  }

  onSelectTask(task: Task) {
    this.selectedTaskId.set(task.id);
  }

  selectedTask = computed(() => {
    const id = this.selectedTaskId();
    return this.tasks().find((t) => t.id === id) ?? null;
  });

  onCreateTask(task: Task) {
    this.apiService.addTask(task).subscribe({
      next: (apiResponse) => {
        if (apiResponse.response) {
          this.tasks.set([...this.tasks(), apiResponse.response]);
        } else {
          this.error.set('Failed to add task');
        }
      },
    });
  }

  onUpdateTask(task: Task) {
    this.apiService.updateTask(task).subscribe({
      next: (apiResponse) => {
        if (apiResponse.response) {
          // Replace the old task with the updated task
          this.tasks.set(
            this.tasks().map((t) => (t.id === apiResponse.response!.id ? apiResponse.response! : t))
          );
        } else {
          this.error.set('Failed to update task');
        }
      },
      error: () => {
        this.error.set('Failed to update task');
      },
    });
  }

  onDeleteTask(id: number) {
    this.apiService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.set(this.tasks().filter((t) => t.id !== id));
      },
      error: () => {
        this.error.set('Failed to delete task');
      },
    });
  }
}
