import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a routerLink="/" class="navbar-brand">TaskHub</a>

      <!-- Independent login/logout, always visible -->
      <div class="ms-auto d-flex align-items-center">
        <a *ngIf="!currentUser()" routerLink="/login" class="btn btn-outline-light btn-sm">
          Login
        </a>
        <button *ngIf="currentUser()" class="btn btn-outline-light btn-sm" (click)="logout()">
          Logout
        </button>
      </div>
    </nav>
  `,
})
export class Navbar {
  private apiService = inject(ApiService);
  private router = inject(Router);

  currentUser = signal(this.apiService.getCurrentUser());

  logout() {
    this.apiService.logout().subscribe({
      next: () => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      },
    });
  }
}
