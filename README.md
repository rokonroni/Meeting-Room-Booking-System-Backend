# Meeting Room Booking System

Welcome to the Meeting Room Booking System! This README file will guide you through setting up and using the application.

## Project Name

### Meeting Room Booking System

## Live URL

### [Meeting Room Booking System](https://meeting-room-booking-system-backend.vercel.app)

## Features

- **User Authentication**: Sign up and login functionality for both users and admins.
- **Room Management**: Admins can create, update, delete, and retrieve details about rooms.
- **Slot Management**: Admins can create time slots for rooms, specifying the date, start time, and end time.
- **Booking Management**: Users can book available time slots for meeting rooms, view booking details, and receive real-time feedback on room availability.
- **Validation and Error Handling**: Robust mechanisms to ensure smooth user interactions and informative messages on booking conflicts or validation errors.

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database and ODM**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Environment Management**: dotenv
- **Validation**: Zod
- **Other Tools**: ESLint, Prettier

## Project Structure

```bash
meeting-room-booking-system/
├── src/
│   ├── app/
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── eslint.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## How to Run the Project Locally
To run the project locally, follow these steps:

Clone the repository and open a terminal in the root directory of the project.
Install dependencies using ``npm install``.
Set up environment variables as specified below.
Ensure your MongoDB instance is running successfully.
Start the application in development mode using npm ``run start:dev``.
Set up environment variables

Create a .env file in the root directory with the following content:


```bash
env
Copy code
DATABASE_URI=YOUR_MONGODB_URI
PORT=5000
JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRES_IN=YOUR_JWT_EXPIRES_IN
```
NPM Scripts
To install dependencies:


```bash
npm install
```
To run in development mode:


```bash
npm run start:dev
```
To build the project:

```bash
npm run build
```
To run the production build:

```bash
npm run start:prod
```
To run lint:

````bash
npm run lint
````
To fix lint issues:

````bash
npm run lint:fix
````
To run Prettier:

````bash
npm run prettier
````
To fix Prettier issues:

````bash
npm run prettier:fix
````
API Usage
Admin Operations
Create a Room:

````bash
POST /api/rooms
Authorization: Bearer <token>
Content-Type: application/json
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
````
Update a Room:

````bash
PUT /api/rooms/:id
Authorization: Bearer <token>
Content-Type: application/json
{
  "pricePerSlot": 150
}
````

Delete a Room:

````bash
DELETE /api/rooms/:id
Authorization: Bearer <token>
````

Create a Slot:

````bash
POST /api/slots
Authorization: Bearer <token>
Content-Type: application/json
{
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "14:00"
}
````
## User Operations
### Sign Up:

````bash
POST /api/auth/signup
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "user",
  "address": "123 Main Street, City, Country"
}
````
Login:
````bash
POST /api/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}
````
Book a Room:

````bash
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json
{
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "date": "2024-06-15",
  "totalAmount": 200
}
````
## Usage Access the Application
Open your browser and navigate to http://localhost:5000 (or the port you specified).

## Admin Operations

Create, update, and delete rooms.
Create available booking slots for each room.
User Operations

Sign up and log in to the system.
Book rooms for specific time slots.
View and manage bookings.
## Conclusion
Thank you for using the Meeting Room Booking System. If you have any questions or need further assistance, please feel free to reach out. Happy booking!