import { Routes } from '@angular/router';

import { Home } from './pages/home/home';

import { Menu } from './pages/menu/menu';

import { Reservations } from './pages/reservations/reservations';

import { Login } from './pages/login/login';

import { Signup } from './pages/signup/signup';

import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { AdminMenu } from './pages/admin-menu/admin-menu';

import { AdminReservations } from './pages/admin-reservations/admin-reservations';

import { AdminUsers } from './pages/admin-users/admin-users';

import { Profile } from './pages/profile/profile';

import { adminGuard } from './guards/admin.guard';


export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'menu',
    component: Menu
  },

  {
    path: 'reservation',
    component: Reservations
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'profile',
    component: Profile
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [adminGuard]
  },

  {
    path: 'admin-menu',
    component: AdminMenu,
    canActivate: [adminGuard]
  },

  {
    path: 'admin-reservations',
    component: AdminReservations,
    canActivate: [adminGuard]
  },

  {
    path: 'admin-users',
    component: AdminUsers,
    canActivate: [adminGuard]
  }

];