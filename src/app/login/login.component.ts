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
  templateUrl: './login.component.html',
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
