# Restaurant Management System

A RESTful backend API for managing a restaurant system using Node.js, Express.js, MongoDB, and Mongoose.

## Features

* User signup and login
* JWT authentication
* Password hashing using bcryptjs
* Route protection using JWT middleware
* Role-based authorization
* Admin and Customer roles
* Protected user profile route
* Admin-only operations
* Menu CRUD operations
* Reservation CRUD operations
* User management
* Image upload using Multer
* Images stored in the `uploads` folder
* Image path stored with menu data in MongoDB
* MongoDB database integration
* Centralized database configuration
* Controllers for business logic
* Error handling and validation

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* Postman

## Project Structure

```text
RestaurantManagmentSystem/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── menu.controller.js
│   ├── reservation.controller.js
│   └── user.controller.js
│
├── middleware/
│   ├── admin.middleware.js
│   ├── auth.middleware.js
│   └── upload.middleware.js
│
├── models/
│   ├── menu.model.js
│   ├── reservation.model.js
│   └── user.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── menu.routes.js
│   ├── reservation.routes.js
│   └── user.routes.js
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Project Architecture

The project follows a modular architecture:

* **Config** – handles the MongoDB database connection.
* **Models** – define MongoDB schemas using Mongoose.
* **Controllers** – contain the application and business logic.
* **Routes** – define API endpoints and connect them to controllers.
* **Middleware** – handles authentication, authorization, and image uploads.
* **Uploads** – stores uploaded menu images.
* **Server** – initializes Express, middleware, routes, and the database connection.

## User Roles

The system currently supports two user roles:

### Admin

Admins can:

* Manage menu items
* View and manage reservations
* View users
* Delete users
* Access admin-protected routes

### Customer

Customers can:

* Create an account
* Login
* View their profile
* View menu items
* Create reservations

Customers cannot access admin-only operations.

## Authentication

The authentication system uses:

* **bcryptjs** for password hashing
* **jsonwebtoken (JWT)** for authentication
* **auth middleware** for protecting private routes
* **admin middleware** for role-based authorization

### Authentication Flow

```text
User
 │
 ├── Signup
 │     ↓
 │   Hash Password
 │     ↓
 │   Save User
 │     ↓
 │   Generate JWT
 │
 └── Login
       ↓
   Verify Password
       ↓
   Generate JWT
       ↓
   Protected Routes
```

## Authentication Routes

### Signup

**POST**

```text
/api/auth/signup
```

Example:

```json
{
  "name": "Test Customer",
  "email": "customer@example.com",
  "password": "123456"
}
```

Example response:

```json
{
  "message": "Signup successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Test Customer",
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

A JWT token is returned after successful registration.

### Login

**POST**

```text
/api/auth/login
```

Example:

```json
{
  "email": "customer@example.com",
  "password": "123456"
}
```

Example response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Test Customer",
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

### Login with Incorrect Credentials

If the email or password is incorrect:

```json
{
  "message": "Invalid email or password"
}
```

## Protected Routes

Private routes require a valid JWT token.

The token is sent using the Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
```

### Protected User Profile

**GET**

```text
/api/users/profile
```

This route can be accessed by any authenticated user.

Example:

```text
GET http://localhost:3000/api/users/profile
```

With:

```text
Authorization: Bearer YOUR_TOKEN
```

Example response:

```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "_id": "USER_ID",
    "name": "Test Customer",
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

### Without Token

If the request does not contain a token:

```json
{
  "message": "Access denied. No token provided."
}
```

### Invalid Token

If the token is invalid or expired, access is denied.

## Role-Based Authorization

Some routes are restricted to administrators.

For example:

```text
GET /api/reservations
```

requires:

* A valid JWT token
* The `admin` role

If a customer tries to access an admin-only route:

```json
{
  "message": "Admin access required"
}
```

This demonstrates role-based authorization.

## API Routes

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
```

### Users

```text
GET    /api/users/profile
GET    /api/users
GET    /api/users/:id
DELETE /api/users/:id
```

### Menu

```text
GET    /api/menu
GET    /api/menu/:id
POST   /api/menu
PUT    /api/menu/:id
DELETE /api/menu/:id
```

### Reservations

```text
POST   /api/reservations
GET    /api/reservations
GET    /api/reservations/:id
PUT    /api/reservations/:id
DELETE /api/reservations/:id
```

## Menu

The Menu API allows users to view menu items.

Administrators can:

* Add menu items
* View all menu items
* View a single menu item
* Update menu items
* Delete menu items
* Upload menu images

Example:

```json
{
  "name": "Savora Signature Steak",
  "description": "Tender grilled steak served with seasonal vegetables and our signature sauce",
  "price": 32,
  "category": "Steak"
}
```

## Reservations

Authenticated users can create reservations.

Administrators can:

* View all reservations
* View a single reservation
* Update reservations
* Delete reservations

Example:

```json
{
  "fullName": "Test Customer",
  "email": "customer@example.com",
  "date": "2026-09-01",
  "time": "19:00",
  "guests": 2
}
```

## Users

The Users API is protected and available to administrators.

Administrators can:

* View all users
* View a single user
* Delete users

Passwords are excluded from user responses.

The `/api/users/profile` route is available to all authenticated users.

## Image Upload

Menu images are uploaded using Multer.

Uploaded images are stored in:

```text
uploads/
```

The image path is saved with the menu item in MongoDB.

Example:

```text
/uploads/menu-image.jpg
```

Images can be accessed through:

```text
http://localhost:3000/uploads/menu-image.jpg
```

## Database

The project uses MongoDB with Mongoose.

The database connection is handled in:

```text
config/db.js
```

Main collections:

* users
* menus
* reservations

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The `.env` file should not be uploaded to GitHub.

## How to Run

1. Clone the project from GitHub.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Create the `.env` file and add the required environment variables.
5. Start the server from the project root:

```bash
node server.js
```

6. The API will run on:

```text
http://localhost:3000
```

## Testing with Postman

The following tests were performed:

### Authentication Tests

* User signup
* Successful login
* Login with incorrect credentials
* JWT token generation
* Protected route without token
* Protected route with valid token

### Authorization Tests

* Admin accessing admin routes
* Customer accessing protected profile route
* Customer attempting to access admin-only routes

### Other Tests

* Menu CRUD
* Reservation CRUD
* User management
* Image upload using Multer

## Session 17 Requirements

The authentication module implements the requirements of the Session 17 assignment.

### Implemented Requirements

* Mongoose User Model
* Admin and Customer roles
* User signup
* User login
* Password hashing using bcryptjs
* JWT token generation
* JWT token verification
* Route protection middleware
* Protected `/api/users/profile` route
* Role-based authorization
* Postman testing
* Modular project structure using routes, controllers, models, and middleware

## Security

* Passwords are hashed before being stored.
* JWT is used for authentication.
* Protected routes require a valid JWT.
* Admin routes require the `admin` role.
* Passwords are excluded from API responses.
* Environment variables are used for sensitive information.
* `.env` is excluded from Git using `.gitignore`.

## Author

Sondos Emad
