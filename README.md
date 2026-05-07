# Task Management System

## A full-stack task management application built for the HMCTS Developer Technical Test. The application enables caseworkers to efficiently create, manage, update, and track tasks through a modern and responsive interface.

# Overview
This project was developed to satisfy the following requirements:

- Create tasks
- Retrieve a task by ID
- Retrieve all tasks
- Update task status
- Delete tasks
- Display tasks in a user-friendly frontend
- Store task data in a database
- Include validation and error handling
- Implement unit-test-ready architecture
- Document API endpoints

The application is built using the Next.js App Router architecture and uses Prisma ORM with MongoDB for data persistence.

# Tech Stack

## Frontend

`*` Next.js 13 (App Router)
`*` React 18
`*` TypeScript
`*` Tailwind CSS
`*` Styled Components
`*` React Hot Toast

## Backend

`*` Next.js API Routes
`*` Prisma ORM
`*` MongoDB

## Authentication

`*` Clerk Authentication

## Additional Libraries

`*` Axios
`*` Moment.js
`*` NextJS Top Loader

## Authentication & Authorization
 - Secure user authentication using Clerk
 - User-specific task management
 - Authorized user support for shared task visibility

 ## Installation & Setup
 - 1. Clone the Repository
    `*` git clone <your-repository-url>
     `*`cd mytask2
 - 2. Install Dependencies
     `*` npm install
 - 3. Configure Environment Variables
      Create a .env.local file in the root directory:
     `*` DATABASE_URL="your_mongodb_connection_string"
     `*` NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
     `*` CLERK_SECRET_KEY="your_clerk_secret_key"
 - 4. Generate Prisma Client
      `*`npx prisma generate
 - 5. Run the Development Server
     `*` npm run dev

## Validation & Error Handling
The application includes:

- Input validation for required task fields
- Graceful API error handling
- User feedback notifications
- Database operation error protection

## Testing
The project structure supports unit testing and can be extended using:

- Jest
- React Testing Library
- Prisma test utilities