# ﻿Node-Blog-API

## Description

This is a RESTful blog API built with Node.js, Express, and MongoDB. It provides CRUD operations for managing blog posts, user authentication, comments, and user profiles, and connects to a MongoDB database for persistence.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete blog posts
- Create, read, update, and delete comments
- Like/Dislike posts
- Like/Dislike comments
- User profile management
- Session management with express-session and MongoDB
- Middleware for authentication
- images upload with *Clodinary*

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ABNmmd/Node-Blog-API.git
   cd Node-Blog-API
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   SESSION_SECRET=your_session_secret
   ```

## Environment Variables

- `PORT`: The port your server will run on.
- `MONGODB_URI`: The URI for your MongoDB database.
- `SESSION_SECRET`: A secret key for signing session cookies.

## Usage

Use Postman, Insomnia, or any other API client to interact with the API.

Check The Front-end [AcademiaHub](https://github.com/ABNmmd/AcademiaHub-FrontEnd)

## Project Structure

```
Back-end/
├── index.js
├── controllers/
│   ├── authController.js
│   ├── commentController.js
│   ├── postController.js
│   ├── userController.js
├── models/
│   ├── comment.js
│   ├── post.js
│   ├── user.js
├── routes/
│   ├── authRoutes.js
|   ├── commentRoutes.js
│   ├── postRoutes.js
│   ├── userRoutes.js
├── utils/
│   ├── validators.js
├── config/
│   ├── cloudinary.js
│   ├── multer.js
├── middleware/
│   ├── authMiddleware.js
└── .env
```
