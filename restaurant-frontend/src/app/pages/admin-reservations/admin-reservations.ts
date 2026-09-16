import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

interface Reservation {
  _id: string;
  fullName: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

@Component({
  selector: 'app-admin-reservations',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-reservations.html',
  styleUrl: './admin-reservations.css'
})
export class AdminReservations implements OnInit {

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  reservations: Reservation[] = [];

  message = '';
  errorMessage = '';
  loading = false;

  private apiUrl = 'http://localhost:3000/api/reservations';

  ngOnInit(): void {
    this.loadReservations();
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  loadReservations(): void {

    this.http.get<Reservation[]>(this.apiUrl, {
      headers: this.getHeaders()
    }).subscribe({

      next: (data) => {

        console.log('Admin Reservations:', data);

        this.reservations = Array.isArray(data) ? data : [];

        console.log(
          'Reservations count:',
          this.reservations.length
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log('Reservations error:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to load reservations';

        this.cdr.detectChanges();
      }

    });
  }

  updateStatus(
    reservation: Reservation,
    status: 'pending' | 'confirmed' | 'cancelled'
  ): void {

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.http.put<any>(
      `${this.apiUrl}/${reservation._id}`,
      { status },
      {
        headers: this.getHeaders()
      }
    ).subscribe({

      next: (response) => {

        reservation.status = status;

        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'success',
          title: 'Reservation Updated',
          text:
            response.message ||
            'Reservation updated successfully',
          confirmButtonText: 'OK'
        });

      },

      error: (error) => {

        console.log(
          'Update reservation error:',
          error
        );

        this.errorMessage =
          error.error?.message ||
          'Failed to update reservation';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }

  deleteReservation(id: string): void {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this reservation?',
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

          this.reservations =
            this.reservations.filter(
              reservation => reservation._id !== id
            );

          this.loading = false;

          this.cdr.detectChanges();

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text:
              response.message ||
              'Reservation deleted successfully',
            confirmButtonText: 'OK'
          });

        },

        error: (error) => {

          console.log(
            'Delete reservation error:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Failed to delete reservation';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });

    });

  }

}