# Restaurant Management System

A RESTful backend API for managing a restaurant system using Node.js, Express.js, MongoDB, and Mongoose.

## Features

* User registration and login
* JWT authentication
* Password hashing using bcryptjs
* Role-based authorization
* Admin-only operations
* Menu CRUD operations
* Reservation CRUD operations
* User management
* Image upload using Multer
* Images stored in the `uploads` folder
* Image path stored with menu data in MongoDB
* MongoDB database integration
* Controllers for separating business logic from routes
* Middleware for authentication, authorization, and file uploads
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

## Architecture

The project follows a simple MVC-style structure.

### Routes

The `routes` folder defines the API endpoints and connects each endpoint to the appropriate controller.

### Controllers

The `controllers` folder contains the main business logic for each feature.

* `auth.controller.js` handles registration and login.
* `menu.controller.js` handles menu CRUD operations and image uploads.
* `reservation.controller.js` handles reservation operations.
* `user.controller.js` handles user management.

### Models

The `models` folder contains the Mongoose schemas used to define the structure of the MongoDB data.

### Middleware

The `middleware` folder contains reusable middleware for:

* JWT authentication
* Admin authorization
* Image upload using Multer

## How to Run

1. Clone the project from GitHub.
2. Open the project folder in VS Code.
3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file and add the MongoDB connection string and JWT secret.

Example:

```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the server:

```bash
node server.js
```

6. The API will run on:

```text
http://localhost:3000
```

## API Usage

### Authentication

Users can register and login through the authentication endpoints.

* Register a new user
* Login using email and password
* Receive a JWT token after successful login
* Use the token to access protected endpoints

### Menu

The Menu API allows users to:

* View all menu items
* View a single menu item

Administrators can:

* Add menu items
* Update menu items
* Delete menu items
* Upload an image for a menu item

Menu creation and updating use `multipart/form-data` when an image is included.

### Reservations

The Reservation API allows authenticated users to:

* Create reservations

Administrators can:

* View all reservations
* View a single reservation
* Update reservation information
* Delete reservations

### Users

The Users API is protected and available to administrators.

Administrators can:

* View all users
* View a single user
* Delete users

Passwords are not returned when retrieving user information.

## Image Upload

Menu images are uploaded using Multer.

When creating or updating a menu item, the request can include an image file using the `image` field.

The uploaded image is stored in:

```text
uploads/
```

The image path is saved with the menu item in MongoDB.

Example:

```text
/uploads/menu-image.jpg
```

Uploaded images can be accessed through:

```text
http://localhost:3000/uploads/menu-image.jpg
```

## Authentication

Protected endpoints require a JWT token.

The token is sent using the Authorization header as a Bearer token.

Example:

```text
Authorization: Bearer <JWT_TOKEN>
```

Admin-only endpoints require a valid authenticated user with the `admin` role.

## Database

The project uses MongoDB with Mongoose.

The main collections are:

* users
* menus
* reservations

## API Endpoints

### Authentication

* `POST /api/auth/register` — Register a new user
* `POST /api/auth/login` — Login and receive a JWT token

### Menu

* `GET /api/menu` — Get all menu items
* `GET /api/menu/:id` — Get one menu item
* `POST /api/menu` — Create a menu item (Admin)
* `PUT /api/menu/:id` — Update a menu item (Admin)
* `DELETE /api/menu/:id` — Delete a menu item (Admin)

### Reservations

* `POST /api/reservations` — Create a reservation (Authenticated user)
* `GET /api/reservations` — Get all reservations (Admin)
* `GET /api/reservations/:id` — Get one reservation (Admin)
* `PUT /api/reservations/:id` — Update a reservation (Admin)
* `DELETE /api/reservations/:id` — Delete a reservation (Admin)

### Users

* `GET /api/users` — Get all users (Admin)
* `GET /api/users/:id` — Get one user (Admin)
* `DELETE /api/users/:id` — Delete a user (Admin)

## Testing

API endpoints were tested using Postman, including:

* User registration
* User login
* JWT authentication
* Admin authorization
* Menu CRUD operations
* Reservation CRUD operations
* User management
* Image upload using Multer
* Protected API endpoints

## Security

* Passwords are hashed before being stored.
* JWT is used for authentication.
* Admin routes are protected with role-based authorization.
* User passwords are excluded from API responses.
* Environment variables are used for sensitive configuration.

## Author

Sondos Emad
