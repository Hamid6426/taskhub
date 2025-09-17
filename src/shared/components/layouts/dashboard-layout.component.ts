import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar';
import { UserSidebarComponent } from '../user-sidebar.component';
import { AdminSidebarComponent } from '../admin-sidebar.component';
import { ApiService } from '../../../core/services/api.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminSidebarComponent, UserSidebarComponent, Navbar, CommonModule],
  template: `
    <div class="d-flex ">
      <app-admin-sidebar *ngIf="currentUserRole() === 'admin'"></app-admin-sidebar>
      <app-user-sidebar *ngIf="currentUserRole() === 'user'"></app-user-sidebar>

      <div class="flex-grow-1 ">
        <!-- Navbar or header -->
        <app-navbar></app-navbar>

        <div class="flex-grow-1 m-3">
          <!-- Page content injected here -->
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {
  protected readonly title = signal('taskhub');

  private readonly apiService = inject(ApiService);

  currentUser = signal<User | null>(this.apiService.getCurrentUser());
  currentUserRole = computed(() => this.currentUser()?.role ?? null);
}
