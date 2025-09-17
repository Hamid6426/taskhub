import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private apiService = inject(ApiService);

  // signals for error state
  loginError = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/@example\.com$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    this.apiService.login(email, password).subscribe((res) => {
      if (res.response) {
        this.loginError.set(false);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.loginError.set(true);
      }
    });
  }
}
