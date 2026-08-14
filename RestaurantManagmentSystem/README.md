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

## How to Run

1. Clone the project from GitHub.

2. Open the project folder in VS Code.

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file and add the MongoDB connection string and JWT secret.

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

The Menu API allows administrators to:

* Add menu items
* View all menu items
* View a single menu item
* Update menu items
* Delete menu items
* Upload an image for a menu item

Regular users can view menu items, while creating, updating, and deleting menu items requires admin authorization.

### Reservations

The Reservation API allows users to:

* Create reservations
* View reservations
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

### Image Upload

Menu images are uploaded using Multer.

When creating or updating a menu item, the request can include an image file.

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

Admin-only endpoints require a valid authenticated user with the `admin` role.

## Database

The project uses MongoDB with Mongoose.

The main collections are:

* users
* menus
* reservations

## Testing

API endpoints were tested using Postman, including:

* User registration
* User login
* JWT authentication
* Admin authorization
* Menu CRUD
* Reservation CRUD
* User management
* Image upload using Multer

## Security

* Passwords are hashed before being stored.
* JWT is used for authentication.
* Admin routes are protected with role-based authorization.
* User passwords are excluded from API responses.
* Environment variables are used for sensitive configuration.

## Author

Sondos Emad
