import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  private router = inject(Router);

  user: User | null = null;

  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }

  }

  goToReservations(): void {
    this.router.navigate(['/reservation']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

}