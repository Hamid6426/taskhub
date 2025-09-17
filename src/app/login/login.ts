import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // signals for error state
  loginError = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/@example\.com$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    // mock check
    if (email === 'admin@example.com' && password === 'password') {
      this.loginError.set(false);
      this.router.navigateByUrl('/dashboard');
    } else {
      this.loginError.set(true);
    }
  }
}
