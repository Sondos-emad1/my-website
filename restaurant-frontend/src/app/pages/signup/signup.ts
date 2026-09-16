import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  name = '';
  email = '';
  password = '';

  loading = false;
  errorMessage = '';

  signup(): void {

    this.errorMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage =
        'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;

    this.http.post<any>(
      'http://localhost:3000/api/auth/signup',
      {
        name: this.name,
        email: this.email,
        password: this.password
      }
    ).subscribe({

      next: (response) => {

        console.log('Signup successful:', response);

        this.authService.login(
          response.token,
          response.user
        );

        this.loading = false;

        this.router.navigate(['/']);

      },

      error: (error) => {

        console.error('Signup error:', error);

        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Signup failed. Please try again.';

      }

    });

  }

}