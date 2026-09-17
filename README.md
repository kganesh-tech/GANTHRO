# GANTHRO

GANTHRO is an authentication platform currently under development.

## Features

- User Signup
- User Login
- JWT-based Authentication
- Password Reset
- User-specific Project Management
- API Key Generation
- API Key Management

## Authentication

Users can:

- Create an account
- Login securely
- Reset their password
- Access protected resources using JWT authentication

JWT authentication is used to identify the logged-in user and retrieve user-related projects.

## Project Management

Authenticated users can create and access their own projects.

Projects are associated with the authenticated user's identity using the JWT token.

## API Keys

GANTHRO currently supports API key generation for projects.

Users can:

- Generate API keys
- View their API keys
- Associate API keys with their projects

For security, the generated API keys are stored in the database in hashed form using bcrypt.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt
- Nodemailer
- JavaScript
- HTML
- CSS

## Project Status

- GANTHRO is currently under development.

The current implementation includes user authentication, password reset, project management, and API key generation and management.

More authentication-platform features will be added as development continues.

## Live Application

https://ganthro.onrender.com
