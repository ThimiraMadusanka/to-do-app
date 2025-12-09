# To-Do App

This repository contains a fully containerized To-Do Application built using:

- Backend: Node.js + Express.js + Sequelize
- Frontend: React (Vite)
- Database: MySQL

## Features
- Create a new to-do task by providing a title and description.
- Display only the most recent uncompleted 5 tasks.
- Mark a task as completed.

## Clone the Repository
```bash
git clone https://github.com/ThimiraMadusanka/to-do-app.git
cd to-do-app
```
## Running the Application with Docker
To build and start all services in Docker, run the following command.

```bash
docker compose up --build
```
After the services have started, you can access the application at: http://localhost:5173

## Setup the Application Locally
To run the project locally (without Docker), you need to have Node.js, npm, and MySQL installed on your device.

### Backend
Run the following commands to start the backend:

```bash
cd backend
npm i
```

Before running the backend server:
 1. Create a MySQL database, e.g., todo_db.
 2. Update the backend .env file with your configuration:

```bash
PORT=5000
DB_NAME=<your_db_name>
DB_USER=<your_db_user_name>
DB_PASS=<your_db_password>
DB_HOST="localhost"
DB_DIALECT="mysql"
DB_PORT=3306
```

Then start the backend with:

```bash
npm run dev
```

### Frontend
Run the following commands to start the frontend:

```bash
cd frontend
npm i
npm run dev
```

After setting up the frontend and backend, the site will be available at: http://localhost:5173
