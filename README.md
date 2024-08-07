# Node-Blog-API

## Description
This is a RESTful blog API built with Node.js, Express, and MongoDB. It provides CRUD operations for managing blog posts, user authentication, comments, and user profiles, and connects to a MongoDB database for persistence.

## Features
- User authentication (register, login, logout)
- Create, read, update, and delete blog posts
- Create, read, update, and delete comments
- User profile management
- Session management with express-session and MongoDB
- Middleware for authentication

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Posts](#posts)
  - [Comments](#comments)
  - [User Profile](#user-profile)

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

## API Endpoints

### Authentication
- **Register**
  - `POST /api/auth/register`
  - Request body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- **Login**
  - `POST /api/auth/login`
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `{ "message": "Logged in successfully" }`

- **Logout**
  - `POST /api/auth/logout`
  - Response: `{ "message": "Logged out successfully" }`

### Posts
- **Create Post**
  - `POST /api/posts`
  - Request body: `{ "title": "string", "content": "string" }`
  - Response: `{ "post": { "id": "string", "title": "string", "content": "string", "authorId": "string" } }`

- **Get All Posts**
  - `GET /api/posts`
  - Response: `{ "posts": [ { "id": "string", "title": "string", "content": "string", "authorId": "string" } ] }`

- **Get Single Post**
  - `GET /api/posts/:id`
  - Response: `{ "post": { "id": "string", "title": "string", "content": "string", "authorId": "string" } }`

- **Update Post**
  - `PUT /api/posts/:id`
  - Request body: `{ "title": "string", "content": "string" }`
  - Response: `{ "post": { "id": "string", "title": "string", "content": "string", "authorId": "string" } }`

- **Delete Post**
  - `DELETE /api/posts/:id`
  - Response: `{ "message": "Post deleted successfully" }`

### Comments
- **Create Comment**
  - `POST /api/comments`
  - Request body: `{ "content": "string", "postId": "string" }`
  - Response: `{ "comment": { "id": "string", "content": "string", "authorId": "string", "postId": "string" } }`

- **Get Comments for Post**
  - `GET /api/comments/:postId`
  - Response: `{ "comments": [ { "id": "string", "content": "string", "authorId": "string", "postId": "string" } ] }`

- **Update Comment**
  - `PUT /api/comments/:id`
  - Request body: `{ "newContent": "string" }`
  - Response: `{ "comment": { "id": "string", "content": "string", "authorId": "string", "postId": "string" } }`

- **Delete Comment**
  - `DELETE /api/comments/:id`
  - Response: `{ "message": "Comment deleted successfully" }`

### User Profile
- **Get User Profile**
  - `GET /api/users/profile`
  - Response: `{ "user": { "id": "string", "username": "string", "email": "string", "profilePicture": "string", "bio": "string" } }`

- **Update User Profile**
  - `PUT /api/users/profile`
  - Request body: `{ "username": "string", "email": "string", "profilePicture": "string", "bio": "string" }`
  - Response: `{ "user": { "id": "string", "username": "string", "email": "string", "profilePicture": "string", "bio": "string" } }`

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.
