import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="d-flex flex-column bg-dark text-white"
      [style.position]="'sticky'"
      [style.top.px]="0"
      [style.height]="'100vh'"
      [style.width.px]="isCollapsed() ? 60 : 220"
    >
      <h4 *ngIf="!isCollapsed()" class="p-3 mb-4">Admin Panel</h4>

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
        <li class="nav-item">
          <a
            class="nav-link text-white d-flex align-items-center"
            routerLink="/create-task"
            routerLinkActive="active bg-secondary"
          >
            <i class="bi bi-pencil-fill me-2"></i>
            <span *ngIf="!isCollapsed()">Create Task</span>
          </a>
        </li>
      </ul>

      <button
        class="bg-dark text-white py-2 px-3 border-0 d-flex align-items-center w-100"
        (click)="isCollapsed.set(!isCollapsed())"
      >
        <i
          class="bi me-2"
          [ngClass]="isCollapsed() ? 'bi-arrow-right-square' : 'bi-arrow-left-square'"
        ></i>
        <span *ngIf="!isCollapsed()" class="mx-1">Collapse</span>
      </button>
    </div>
  `,
})
export class AdminSidebarComponent {
  isCollapsed = signal(false);
  isMobileSignal = signal(window.innerWidth < 768);

  constructor() {
    const updateCollapse = () => {
      const isMobile = window.innerWidth < 768;
      this.isMobileSignal.set(isMobile);

      // Collapse on mobile, expand on desktop
      if (isMobile) {
        this.isCollapsed.set(true);
      } else {
        this.isCollapsed.set(false);
      }
    };

    // Initial check
    updateCollapse();

    // Listen for resize
    window.addEventListener('resize', updateCollapse);
  }
}
