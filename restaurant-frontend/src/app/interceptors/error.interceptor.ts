import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError((error) => {

      // Don't handle login errors here
      if (
        error.status === 401 &&
        !req.url.includes('/api/auth/login')
      ) {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        router.navigate(['/login']);

      }

      return throwError(() => error);

    })

  );

};