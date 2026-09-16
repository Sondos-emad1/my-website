import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  loggedIn$ = this.loggedInSubject.asObservable();

  getUser(): any {
    const user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  login(token: string, user: any): void {

    localStorage.setItem('token', token);

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

    this.loggedInSubject.next(true);
  }

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}