# Course Selling App

## Description

This is a course selling app that supports two types of users:
1. Admins
2. Users

Admins can sign up and create courses. Users can sign up, view courses, and purchase courses. This app uses MongoDB to store data persistently.

## Routes

### Admin Routes

- **POST /admin/signup**
  - Description: Creates a new admin account.
  - Input Body: `{ username: 'admin', password: 'pass' }`
  - Output: `{ message: 'Admin created successfully' }`

- **POST /admin/courses**
  - Description: Creates a new course.
  - Input: Headers: `{ 'username': 'username', 'password': 'password' }`, Body: `{ title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }`
  - Output: `{ message: 'Course created successfully', courseId: "new course id" }`

- **GET /admin/courses**
  - Description: Returns all the courses.
  - Input: Headers: `{ 'username': 'username', 'password': 'password' }`
  - Output: `{ courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }`

### User Routes

- **POST /users/signup**
  - Description: Creates a new user account.
  - Input: `{ username: 'user', password: 'pass' }`
  - Output: `{ message: 'User created successfully' }`

- **GET /users/courses**
  - Description: Lists all the courses.
  - Input: Headers: `{ 'username': 'username', 'password': 'password' }`
  - Output: `{ courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }`

- **POST /users/courses/:courseId**
  - Description: Purchases a course. `courseId` in the URL path should be replaced with the ID of the course to be purchased.
  - Input: Headers: `{ 'username': 'username', 'password': 'password' }`
  - Output: `{ message: 'Course purchased successfully' }`

- **GET /users/purchasedCourses**
  - Description: Lists all the courses purchased by the user.
  - Input: Headers: `{ 'username': 'username', 'password': 'password' }`
  - Output: `{ purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }`

## Index.js

This is the main entry point for the course selling app. It sets up the Express server and configures the routes for the application.

### Dependencies

- `express`: A web framework for Node.js.
- `body-parser`: Middleware to parse incoming request bodies.

### Code Overview

#### Importing Dependencies

```javascript
const express = require('express');
const bodyParser = require('body-parser');