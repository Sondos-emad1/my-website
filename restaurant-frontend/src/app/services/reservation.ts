import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  _id?: string;
  user?: string;
  fullName: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/api/reservations';

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createReservation(
    reservation: {
      fullName: string;
      email: string;
      date: string;
      time: string;
      guests: number;
    }
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      reservation,
      {
        headers: this.getHeaders()
      }
    );
  }

  getMyReservations(): Observable<Reservation[]> {

    return this.http.get<Reservation[]>(
      `${this.apiUrl}/my`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getAllReservations(): Observable<Reservation[]> {

    return this.http.get<Reservation[]>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }

  getReservationById(
    id: string
  ): Observable<Reservation> {

    return this.http.get<Reservation>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateReservation(
    id: string,
    reservation: Partial<Reservation>
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      reservation,
      {
        headers: this.getHeaders()
      }
    );
  }

  deleteReservation(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }
}