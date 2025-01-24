# Edulite - E-learning Platform

Welcome to **Edulite**, a feature-rich e-learning platform designed to enhance online education. Built with a modern web stack, Edulite offers a seamless experience for students and administrators.

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Folder Structure](#folder-structure)
7. [API Endpoints](#api-endpoints)
8. [Future Improvements](#future-improvements)
9. [Contributors](#contributors)

---

## About the Project

Edulite is an e-learning platform that enables users to browse, enroll in, and manage courses. It also includes role-based access for administrators to manage course content. The platform leverages modern technologies to ensure a user-friendly and responsive experience.

---

## Features

- **Authentication:**

  - User signup and login.
  - Role-based access (Admin and User).

- **Courses:**

  - Browse available courses.
  - Enroll in courses.
  - View enrolled courses.

- **Responsive Design:**
  - Optimized for both desktop and mobile devices.
- **Secure Backend:**
  - User authentication with session management.

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Prisma
- **Database:** PostgreSQL

---

## Installation

To set up the project locally, follow these steps:

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (v16+ recommended).
2. Install [PostgreSQL](https://www.postgresql.org/).
3. Clone the repository:

```sh
   git clone https://github.com/your-username/edulite.git
   cd edulite
```

### Setup

1. Install dependencies:

```sh
npm install
```

2. Configure the environment variables:

   Create a `.env` file in the root directory with the following keys:

```env
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_jwt_secret
```

3. Migrate the database:

```sh
 npx prisma migrate dev
```

4. Start the development server:

```sh
    npm run dev
```

5. Open your browser and navigate to http://localhost:3000.

### Usage

Sign up or log in.
Browse courses and view details.

### Folder Structure

/pages
|--- /api
| |--- /courses
| | |--- [id].js
| |--- auth.js
| |--- courses.js
| |--- enroll.js
| |--- user.js

/prisma
|--- /migrations
|--- schema.prisma

/public
|--- /images

/src
|--- /app
| |--- /login
| | |--- page.tsx
| |--- /signup
| | |--- page.tsx
| |--- /courses
| | |--- /[id]
| | | |--- page.tsx
| | |--- page.tsx
| |--- /dashboard
| | |--- page.tsx
|--- /components
| |--- Navbar.tsx
| |--- CourseCard.tsx
| |--- CourseDetail.tsx
| |--- Hero.tsx
| |--- InfoCard.tsx
| |--- StatCard.tsx
| |--- TeamMemberCard.tsx
| |--- TestimonialCard.tsx
|--- /Testimonials
| |--- page.tsx
|--- globals.css
|--- layout.tsx
|--- page.tsx

|--- /lib
| |--- api.ts

### API Endpoints

Method Endpoint Description
POST /api/auth?action=signup Create a new user.
POST /api/auth?action=login Authenticate a user.
GET /api/courses Fetch all courses.
GET /api/courses/:id Fetch course details.
POST /api/enroll Enroll in a course.
GET /api/courses Fetch all enrollments.
GET /api/courses/:id Fetch enrollment details.

### Future Improvements

    Add real-time chat or discussion forums for courses.
    Implement a payment gateway for premium courses.
    Enhance accessibility for better inclusivity.
    Optimize database queries for large-scale deployments.

### Contributors

    Aziz Ali - Backend Developer
    Wafaa Gaafar - Frontend Developer

### License

This project is licensed under the MIT License. See the LICENSE file for more information.
Acknowledgments

Special thanks to ALX Africa for providing the learning opportunity and guiding us through the project.
