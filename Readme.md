# TaskNinja

TaskNinja is a simple and efficient Todo List application built with Express.js and MongoDB using Mongoose. It allows users to manage their tasks with ease.

## Features

- Add new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks
- Update tasks
- Filter by title and complete tasks

## Technologies Used

- NodeJS
- ExpressJS
- Mongoose
- JWT (Json Web Token)
- Bcrypt

## Installation

1.  Clone the repository:

```bash
git clone https://github.com/brijesh-py/taskninja.git
cd taskninja
```

2.  Install dependencies:

```bash
npm install
```

3.  Create a `.env` file in the root directory and add your MongoDB URI:

```env
PORT = 5000
MONGODB_URI = mongoose-url
DB_NAME = task-ninja
ACCESS_TOKEN_SECRET = your-acceess-token
ACCESS_TOKEN_EXPIRY = 10
```

4.  Start the application:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

### Create an Account

- **URL:** `/api/v1/signup`
- **Method:** `POST`
- **Description:** Create an Account.
- **Request Body:**

  ```json
  {
    "username": "john_doe",
    "email": "john_doe@gmail.com",
    "password": "john_doe1234"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "username": "john_doe",
      "email": "john_doe@gmail.com",
      "createdAt": "2024-06-28T12:30:26.027+00:00"
    },
    "message": "User created successfully"
  }
  ```

### Login

- **URL:** `/api/v1/login`
- **Method:** `POST`
- **Description:** Login User
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "password": "john_doe1234"
  }
  ```
- **Request Body:**
  ```json
  {
    "success": true,
    "data": {
      "username": "john_doe",
      "email": "john_doe@gmail.com",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 10
    },
    "message": "Login successful"
  }
  ```

### Get Todos

- **URL:** `/api/v1/todos?q=Sample&completed=true`
- **Method:** `GET`
- **Description:** Retrieve a list of todos.
- **Response:**
  ```json
  {
    "title": "Sample Todo",
    "description": "This is a sample todo",
    "completed": false,
    "createdAt": "2021-06-13T14:12:31.919Z",
    "todo_id": "e5t34"
  }
  ...
  ```

### Create a New Todo

- **URL:** `/api/v1/todos`
- **Method:** `POST`
- **Description:** Create a new todo.
- **Request Body:**

  ```json
  {
    "title": "New Todo",
    "completed": true,
    "description": "Description of the new todo"
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "title": "New todo",
      "description": "Description of the new todo",
      "completed": true,
      "todoId": "r35te3",
      "createdAt": "2021-06-13T14:12:31.919Z"
    },
    "message": "Todo created successfully"
  }
  ```

### Update a Todo

- **URL:** `/api/v1/todos/:todoId`
- **Method:** `PUT`
- **Description:** Update a todo.
- **Request Body:**
  ```json
  {
    "title": "Updated Todo",
    "description": "Updated description",
    "completed": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "title": "Updated Todo",
      "description": " Updated description",
      "completed": true,
      "todoId": "23ge4d",
      "createdAt": "2021-06-13T14:12:31.919Z"
    },
    "message": "Todo updated successfully"
  }
  ```

### Delete a Todo

- **URL:** `/api/v1/todos/:todoId`
- **Method:** `DELETE`
- **Description:** Delete a todo.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Todo deleted successfully"
  }
  ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to contact me at [brijeshsoftdev@duck.com](brijeshsoftdev@duck.com).

**Happy coding!**
