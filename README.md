# WorkTrack - Task Management System
WorkTrack is a full-stack Task Management System built using the MERN stack. 
It allows authenticated users to create projects and manage tasks efficiently.

## Architecture Overview

The application follows a client-server architecture.

- Frontend: Built using React (Vite) and Tailwind CSS.
- Backend: Built using Node.js and Express following MVC architecture.
- Database: MongoDB with Mongoose ODM.
- Authentication: JWT-based token authentication.
- Deployment:
  - Backend: Render
  - Frontend: Vercel

The backend is structured into:
- Routes → Define API endpoints
- Controllers → Handle request and response
- Services → Business logic
- Models → Database schema definitions
- Middleware → Authentication and security checks

## Tech Stack


### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password Hashing)
- express-validator
- Helmet
- express-rate-limit
- CORS

### Frontend
- React (Vite)
- Axios (with interceptors)
- React Router
- Tailwind CSS

---


## Backend Folder Structure

worktrack_backend/
│
├── server.js          # Entry point of the application
├── src/
│   ├── app.js         # Express configuration and middleware
│   ├── routes/        # API route definitions
│   ├── controllers/   # Request-response logic
│   ├── services/      # Business logic
│   ├── models/        # Mongoose schemas
│   ├── middleware/    # Authentication & security middleware
│   └── config/        # Database configuration

## Frontend Folder Structure

worktrack_frontend/
│
├── src/
│   ├── pages/         # Page components (Login, Dashboard, etc.)
│   ├── context/       # Authentication context
│   ├── services/      # Axios configuration
│   ├── components/    # Reusable components
│   └── App.jsx        # Routing setup

## ER Diagram

Entities:

1. User
   - _id
   - name
   - email
   - password (hashed)
   - role

2. Project
   - _id
   - name
   - owner (references User)

3. Task
   - _id
   - title
   - status
   - project (references Project)

Relationships:
- One User → Many Projects
- One Project → Many Tasks

## Deployment

Backend Deployment (Render):
1. Push backend to GitHub.
2. Create new Web Service in Render.
3. Set environment variables.
4. Deploy using Node start command.

Frontend Deployment (Vercel):
1. Connect GitHub repository.
2. Set VITE_API_URL environment variable.
3. Deploy production build.

## Environment Variables

Backend:
- PORT
- MONGO_URI
- JWT_SECRET
- JWT_EXPIRES_IN

Frontend:
- VITE_API_URL

## Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Project Management (CRUD)
- Task Management (CRUD)
- Role-based Authorization
- Secure Password Hashing
- Production Deployment

## Backend Architecture

The backend follows MVC with a service layer:

- Routes → Define API endpoints
- Controllers → Handle HTTP logic
- Services → Business logic layer
- Models → Database schema definitions
- Middleware → Authentication & validation

---

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- CORS configuration
- Rate limiting
- NoSQL injection prevention
