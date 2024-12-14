# Task Management API

This project is a Task Management API built with Express.js. It allows you to manage tasks and their history, including creating, updating, deleting, and retrieving tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [Environment Variables](#environment-variables)
- [Postman Collections](#postman-collections)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/task-management-api.git
    cd task-management-api
    ```

2. Install dependencies:
    ```sh
    npm install
    yarn (if you are using yarn)
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your environment variables (see Environment Variables).

4. Start the server:
    ```sh
    npm start
    ```

## Usage

Once the server is running, you can access the API at `http://localhost:3000` (or the port specified in your [.env](http://_vscodecontentref_/1) file).

## API Endpoints

### Task Routes

- `GET /api/v1/task`: Retrieve a list of tasks.
- `GET /api/v1/task/:id`: Retrieve a single task by ID.
- `POST /api/v1/task`: Create a new task.
- `PUT /api/v1/task/:id`: Update an existing task by ID.
- `DELETE /api/v1/task/:id`: Delete a task by ID.

### Task History Routes

- `GET /api/v1/taskHistory`: Retrieve the task history.

## Swagger Documentation

The API is documented using Swagger. Once the server is running, you can access the Swagger UI at `http://localhost:3000/api-docs`.

## Environment Variables

The following environment variables are required:

- [PORT](http://_vscodecontentref_/1): The port on which the server will run (default: 3000).
- [MONGO_URI](http://_vscodecontentref_/2): The URI of your MongoDB database.

Example [.env](http://_vscodecontentref_/2) file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskdb
```
## Postman Collections

Two Postman collections are included in the root directory of the project to help you test the API endpoints in production:

- `tasks.postman_collection.json`: This collection contains requests for managing tasks, including creating, updating, deleting, and retrieving tasks.
- `task_history.postman_collection.json`: This collection contains requests for retrieving the task history.

### To use these collections:

1. Open Postman.
2. Click on the "Import" button.
3. Select the `tasks.postman_collection.json` or `task_history.postman_collection.json` file from the root directory of the project.
4. Once imported, you can use the requests in the collection to test the API endpoints in production.
