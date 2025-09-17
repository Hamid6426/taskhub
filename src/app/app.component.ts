import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: `
    <!-- Page content injected here -->
    <router-outlet></router-outlet>
  `,
})
export class App {
  protected readonly title = signal('taskhub');

  private readonly apiService = inject(ApiService);

  currentUser = signal<User | null>(this.apiService.getCurrentUser());
  currentUserRole = computed(() => this.currentUser()?.role ?? null);
}
