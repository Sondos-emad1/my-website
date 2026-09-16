import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = false;
  userName = '';
  userRole = '';

  ngOnInit(): void {

    this.checkLogin();

    this.authService.loggedIn$.subscribe((loggedIn) => {

      this.isLoggedIn = loggedIn;

      if (loggedIn) {

        const user = this.authService.getUser();

        if (user) {
          this.userName = user.name;
          this.userRole = user.role;
        }

      } else {

        this.userName = '';
        this.userRole = '';

      }

    });

  }

  checkLogin(): void {

    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {

      const user = this.authService.getUser();

      if (user) {
        this.userName = user.name;
        this.userRole = user.role;
      }

    }

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/']);

  }

}