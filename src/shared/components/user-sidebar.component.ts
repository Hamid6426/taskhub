import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Sidebar -->
    <div
      class="d-flex flex-column bg-dark text-white"
      style="position: sticky; top: 0; height: 100vh;"
      [style.width.px]="isCollapsed() ? 60 : 220"
    >
      <h4 *ngIf="!isCollapsed()" class="p-3 mb-4">User Panel</h4>

      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a
            class="nav-link text-white d-flex align-items-center"
            routerLink="/dashboard"
            routerLinkActive="active bg-secondary"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <i class="bi bi-speedometer2 me-2"></i>
            <span *ngIf="!isCollapsed()">Dashboard</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white d-flex align-items-center"
            routerLink="/tasks"
            routerLinkActive="active bg-secondary"
          >
            <i class="bi bi-list-check me-2"></i>
            <span *ngIf="!isCollapsed()">Task List</span>
          </a>
        </li>
      </ul>

      <!-- Toggle button -->
      <button class="btn btn-dark border-0 mt-auto" (click)="isCollapsed.set(!isCollapsed())">
        <i
          class="bi me-2"
          [ngClass]="isCollapsed() ? 'bi-arrow-right-square' : 'bi-arrow-left-square'"
        ></i>
        <span *ngIf="!isCollapsed()" class="mr-4">Collapse</span>
      </button>
    </div>
  `,
})
export class UserSidebarComponent {
  isCollapsed = signal(false);

  isMobile(): boolean {
    return window.innerWidth < 768;
  }
}
