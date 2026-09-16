import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
  signal
} from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',

  imports: [],

  templateUrl: './admin-dashboard.html',

  styleUrl: './admin-dashboard.css'
})


export class AdminDashboard implements OnInit {

  private http = inject(HttpClient);

  private cdr = inject(ChangeDetectorRef);

  private router = inject(Router);


  totalUsers = signal(0);

  totalMenuItems = signal(0);

  totalReservations = signal(0);


  ngOnInit(): void {

    this.loadDashboardData();

  }


  goToMenu(): void {

    this.router.navigate(['/admin-menu']);

  }


  goToReservations(): void {

    this.router.navigate(['/admin-reservations']);

  }


  goToUsers(): void {

    this.router.navigate(['/admin-users']);

  }


  loadDashboardData(): void {

    const token =
      localStorage.getItem('token');


    const headers =
      new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      });


    // Users

    this.http
      .get<any[]>(
        'http://localhost:3000/api/users',
        { headers }
      )
      .subscribe({

        next: (users) => {

          console.log(
            'Dashboard Users:',
            users
          );

          this.totalUsers.set(
            users.length
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'Users error:',
            error
          );

        }

      });


    // Menu

    this.http
      .get<any[]>(
        'http://localhost:3000/api/menu'
      )
      .subscribe({

        next: (menu) => {

          console.log(
            'Dashboard Menu:',
            menu
          );

          this.totalMenuItems.set(
            menu.length
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'Menu error:',
            error
          );

        }

      });


    // Reservations

    this.http
      .get<any[]>(
        'http://localhost:3000/api/reservations',
        { headers }
      )
      .subscribe({

        next: (reservations) => {

          console.log(
            'Dashboard Reservations:',
            reservations
          );

          this.totalReservations.set(
            reservations.length
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'Reservations error:',
            error
          );

        }

      });

  }

}