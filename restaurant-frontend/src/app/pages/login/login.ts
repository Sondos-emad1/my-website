import {
  Component,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';

  loading = false;
  errorMessage = '';

  login(): void {

    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage =
        'Please enter your email and password.';

      this.cdr.detectChanges();

      return;
    }

    this.loading = true;

    this.cdr.detectChanges();

    this.http.post<any>(
      'http://localhost:3000/api/auth/login',
      {
        email: this.email,
        password: this.password
      }
    ).subscribe({

      next: (response) => {

        console.log('Login successful:', response);

        this.loading = false;

        this.authService.login(
          response.token,
          response.user
        );

        this.cdr.detectChanges();

        this.router.navigate(['/']);

      },

      error: (error) => {

        console.error('Login error:', error);

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Account not found or incorrect email/password. Please sign up first if you do not have an account.';

        this.cdr.detectChanges();

      }

    });

  }

}