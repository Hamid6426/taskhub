import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-sm p-4" style="min-width: 360px; max-width: 400px">
        <h2 class="text-center mb-4">TaskHub Login</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              formControlName="email"
              placeholder="you@example.com"
            />
            <div
              *ngIf="form.controls.email.invalid && form.controls.email.touched"
              class="text-danger small"
            >
              Must be a valid @example.com email
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              formControlName="password"
              placeholder="••••••••"
            />
            <div
              *ngIf="form.controls.password.invalid && form.controls.password.touched"
              class="text-danger small"
            >
              Password is required (min 6 chars)
            </div>
          </div>

          <!-- Error -->
          <div *ngIf="loginError()" class="alert alert-danger py-2">Invalid credentials</div>

          <button
            class="btn btn-primary w-100"
            type="submit"
            [disabled]="form.invalid || isLoading()"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private apiService = inject(ApiService);

  // signals for error state
  readonly loginError = signal(false);
  readonly isLoading = signal(false);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/@example\.com$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });

  readonly isFormValid = computed(() => this.formStatus() === 'VALID');

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.isLoading.set(true);
    this.apiService.login(email!, password!).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.response) {
          this.loginError.set(false);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.loginError.set(true);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.loginError.set(true);
      },
    });
  }
}
