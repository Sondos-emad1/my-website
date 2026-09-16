import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];

  message = '';
  errorMessage = '';
  loading = false;

  private apiUrl = 'http://localhost:3000/api/users';

  ngOnInit(): void {
    this.loadUsers();
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  loadUsers(): void {

    this.http.get<User[]>(this.apiUrl, {
      headers: this.getHeaders()
    }).subscribe({

      next: (data) => {

        console.log('Admin Users:', data);

        this.users = Array.isArray(data) ? data : [];

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log('Users error:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to load users';

        this.cdr.detectChanges();
      }

    });
  }

  deleteUser(id: string): void {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      this.loading = true;
      this.message = '';
      this.errorMessage = '';

      this.cdr.detectChanges();

      this.http.delete<any>(
        `${this.apiUrl}/${id}`,
        {
          headers: this.getHeaders()
        }
      ).subscribe({

        next: (response) => {

          this.users = this.users.filter(
            user => user._id !== id
          );

          this.loading = false;

          this.cdr.detectChanges();

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text:
              response.message ||
              'User deleted successfully',
            confirmButtonText: 'OK'
          });

        },

        error: (error) => {

          console.log('Delete user error:', error);

          this.errorMessage =
            error.error?.message ||
            'Failed to delete user';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });

    });

  }

}