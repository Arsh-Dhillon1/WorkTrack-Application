# WorkTrack – Task Management System

## Overview

WorkTrack is a full-stack task management system that allows users to register, authenticate, create projects, and manage tasks within each project.

The application follows a secure and scalable backend architecture using the MVC pattern and integrates seamlessly with a React frontend.

---

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

## Core Features

### Authentication
- Secure user registration
- JWT-based login
- Protected routes
- Logout functionality

### Project Management
- Create projects
- View project list
- Navigate to project details

### Task Management
- Create tasks
- Edit tasks
- Update task status
- Mark tasks as completed

---

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

---

## Running the Project Locally

### Backend
```bash
cd taskflow_backend
npm install
npm run dev

### Frontend
```bash
cd taskflow-frontend
npm install
npm run dev