import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar';
import { UserSidebarComponent } from '../user-sidebar.component';
import { AdminSidebarComponent } from '../admin-sidebar.component';
import { ApiService } from '../../../core/services/api.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, UserSidebarComponent, AdminSidebarComponent],
  template: `
    <ng-container *ngIf="currentUser(); else loginCard">
      <div class="d-flex">
        <app-admin-sidebar *ngIf="currentUserRole() === 'admin'"></app-admin-sidebar>
        <app-user-sidebar *ngIf="currentUserRole() === 'user'"></app-user-sidebar>

        <div class="flex-grow-1">
          <app-navbar></app-navbar>
          <div class="flex-grow-1 m-3">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </ng-container>

    <ng-template #loginCard>
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 text-center">
          <h4 class="mb-3">You are not logged in</h4>
          <button class="btn btn-primary" (click)="login()">LOGIN</button>
        </div>
      </div>
    </ng-template>
  `,
})
export class DashboardLayoutComponent {
  protected readonly title = signal('taskhub');

  private readonly apiService = inject(ApiService);

  currentUser = signal<User | null>(this.apiService.getCurrentUser());
  currentUserRole = computed(() => this.currentUser()?.role ?? null);

  login() {
    // Redirect to login page
    window.location.href = '/login';
  }
}
