# Savora Restaurant Management System — Frontend

The frontend of **Savora Restaurant Management System** is built using Angular.

It provides the user interface for customers and admins and connects with the backend REST API.

## Features

* Home page
* Menu browsing
* Customer signup
* Customer login
* User authentication
* JWT authentication
* Customer profile
* Table reservations
* Admin dashboard
* Admin menu management
* Admin reservation management
* Admin user management
* Role-based access
* Route Guards
* HTTP Interceptors
* API integration
* Responsive user interface

## Technologies Used

* Angular
* TypeScript
* HTML
* CSS
* RxJS
* HttpClient
* Signals
* Template-driven Forms
* Angular Router
* JWT Authentication
* SweetAlert2

## Angular Concepts Used

### Components

The application is divided into different Angular components for each page and feature.

Examples:

* Home
* Menu
* Login
* Signup
* Reservations
* Profile
* Admin Dashboard
* Admin Menu
* Admin Reservations
* Admin Users

### Data Binding

Data binding is used to connect the TypeScript logic with the HTML templates.

Examples include:

* Interpolation
* Two-way binding using `ngModel`
* Event binding

### Control Flow

Angular control flow is used to display content depending on conditions.

The project uses:

```text
@if
@else
@for
```

For example, the navbar displays different options depending on whether the user is logged in and whether the user is an admin.

### Signals

Signals are used to manage reactive state in the frontend.

For example, dashboard values can update the UI when their values change.

### Forms

The project uses **Template-driven Forms** for forms such as:

* Login
* Signup

`ngModel` is used for two-way data binding between the form inputs and the component.

### Services

The project uses services to keep shared application logic in one place.

The `AuthService` is responsible for:

* Login
* Logout
* Storing the JWT token
* Storing user information
* Checking login status
* Managing authentication state

### HttpClient

Angular `HttpClient` is used to communicate with the backend REST API.

Examples:

```text
GET
POST
PUT
DELETE
```

The frontend communicates with the backend running on:

```text
http://localhost:3000
```

### HTTP Interceptors

The application uses HTTP interceptors to handle HTTP requests and errors.

#### Auth Interceptor

The Auth Interceptor adds the JWT token to protected requests using the Authorization header.

```text
Authorization: Bearer <token>
```

#### Error Interceptor

The Error Interceptor handles HTTP errors such as unauthorized requests.

### Routing

Angular Router is used to navigate between pages.

Main routes include:

```text
/
 /menu
 /reservation
 /login
 /signup
 /profile
 /admin-dashboard
 /admin-menu
 /admin-reservations
 /admin-users
```

Navigation is implemented using:

* `RouterLink`
* `Router.navigate()`

### Route Guard

Route Guards protect admin pages.

The guard checks the user's authentication and role before allowing access to protected routes.

Customers cannot access admin pages.

## Project Structure

```text
restaurant-frontend/
│
├── src/
│   └── app/
│       ├── components/
│       ├── pages/
│       │   ├── home/
│       │   ├── menu/
│       │   ├── reservations/
│       │   ├── login/
│       │   ├── signup/
│       │   ├── profile/
│       │   ├── admin-dashboard/
│       │   ├── admin-menu/
│       │   ├── admin-reservations/
│       │   └── admin-users/
│       │
│       ├── services/
│       ├── guards/
│       ├── interceptors/
│       ├── app.routes.ts
│       ├── app.config.ts
│       └── app.ts
│
├── public/
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

## Backend Connection

The Angular frontend communicates with the backend through REST API endpoints.

Example:

```text
Angular
   ↓
HttpClient
   ↓
HTTP Request
   ↓
Node.js / Express Backend
   ↓
MongoDB
```

For protected requests:

```text
Angular
   ↓
Auth Interceptor
   ↓
JWT Token
   ↓
Express Backend
   ↓
Authentication Middleware
   ↓
Controller
   ↓
MongoDB
```

## Authentication Flow

```text
Signup / Login
      ↓
Backend
      ↓
JWT Token
      ↓
AuthService
      ↓
localStorage
      ↓
Auth Interceptor
      ↓
Protected API Requests
```

## Running the Project

### 1. Install dependencies

Open the frontend project folder and run:

```bash
npm install
```

### 2. Start the Angular application

```bash
ng serve
```

If Angular CLI is not recognized, use:

```bash
ng.cmd serve
```

### 3. Open the application

The frontend will normally run on:

```text
http://localhost:4200
```

Make sure the backend is also running on:

```text
http://localhost:3000
```

## Backend

The frontend requires the Savora backend API to be running.

Backend technologies:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer

## User Roles

### Customer

Customers can:

* Create an account
* Login
* View the menu
* Create reservations
* View their profile
* Logout

### Admin

Admins can:

* Access the admin dashboard
* Manage menu items
* Manage reservations
* Manage users
* Upload menu images

## Security

The frontend uses:

* JWT authentication
* Auth Interceptor
* Route Guards
* Role-based access
* Authentication service
* Protected admin routes

## Author

Sondos Emad
