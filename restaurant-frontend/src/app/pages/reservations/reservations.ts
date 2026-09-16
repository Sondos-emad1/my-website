import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  ReservationService,
  Reservation
} from '../../services/reservation';

@Component({
  selector: 'app-reservations',
  imports: [FormsModule],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css'
})
export class Reservations implements OnInit {

  private reservationService = inject(ReservationService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  reservation = {
    fullName: '',
    email: '',
    date: '',
    time: '',
    guests: 1
  };

  loading = false;

  successMessage = '';
  errorMessage = '';

  reservations: Reservation[] = [];

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {
      this.loadMyReservations();
    }

  }

  makeReservation(): void {

    this.successMessage = '';
    this.errorMessage = '';

    const token = localStorage.getItem('token');

    if (!token) {

      this.errorMessage =
        'Please login before making a reservation.';

      this.cdr.detectChanges();

      return;
    }

    if (
      !this.reservation.fullName ||
      !this.reservation.email ||
      !this.reservation.date ||
      !this.reservation.time ||
      !this.reservation.guests
    ) {

      this.errorMessage =
        'Please fill in all reservation fields.';

      this.cdr.detectChanges();

      return;
    }

    this.loading = true;

    console.log('MAKING RESERVATION');
    console.log(
      'Sending reservation:',
      this.reservation
    );

    this.cdr.detectChanges();

    this.reservationService
      .createReservation(this.reservation)
      .subscribe({

        next: (response) => {

          console.log(
            'RESERVATION SUCCESS:',
            response
          );

          this.successMessage =
            'Reservation created successfully!';

          this.errorMessage = '';

          this.loading = false;

          this.reservation = {
            fullName: '',
            email: '',
            date: '',
            time: '',
            guests: 1
          };

          this.cdr.detectChanges();

          this.loadMyReservations();

        },

        error: (error: any) => {

          console.error(
            'RESERVATION ERROR:',
            error
          );

          this.loading = false;

          if (error.status === 401) {

            this.errorMessage =
              'Your login session has expired. Please login again.';

            localStorage.removeItem('token');

            this.cdr.detectChanges();

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);

            return;
          }

          this.errorMessage =
            error.error?.message ||
            'Unable to create reservation.';

          this.cdr.detectChanges();

        }

      });

  }

  loadMyReservations(): void {

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.reservationService
      .getMyReservations()
      .subscribe({

        next: (data: Reservation[]) => {

          console.log(
            'MY RESERVATIONS:',
            data
          );

          this.reservations =
            Array.isArray(data) ? data : [];

          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.error(
            'Unable to load reservations:',
            error
          );

          this.cdr.detectChanges();

        }

      });

  }

}