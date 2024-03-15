# Task Manager

Welcome to Task Manager - a simple task management application!

## Installation

1. Clone the repository:
git clone https://github.com/your/repository.git
cd project-folder

2. Install dependencies:

- npm install

- npm start

## API Endpoints

User Routes
1- POST /users/register
Register a new user with a username and password.

Request Body: 
{
    "username": "example_user",
    "password": "example_password"
}

2- POST /users/login
Authenticate a user and retrieve a JWT token.

Request Body:
{
    "username": "example_user",
    "password": "example_password"
}

Task Routes
3- GET /tasks
Retrieve all tasks for the authenticated user.

POST /tasks
Create a new task for the authenticated user.

Request Body:

{
    "title": "Task Title",
    "description": "Task Description"
}

4- GET /tasks
Retrieve all tasks for the authenticated user.

POST /tasks
Create a new task for the authenticated user.

Request Body:
{
    "title": "Task Title",
    "description": "Task Description"
}

5- GET /tasks/:taskId
Retrieve a specific task by ID for the authenticated user.

PUT /tasks/:taskId
Update a specific task by ID for the authenticated user.

Request Body:
{
    "title": "Updated Task Title",
    "description": "Updated Task Description"
}

6- DELETE /tasks/:taskId
Delete a specific task by ID for the authenticated user.