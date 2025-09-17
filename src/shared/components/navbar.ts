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

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" *ngIf="!currentUser()">
            <a routerLink="/login" class="nav-link">Login</a>
          </li>
          <li class="nav-item" *ngIf="currentUser()">
            <button class="btn btn-outline-light btn-sm" (click)="logout()">Logout</button>
          </li>
        </ul>
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
