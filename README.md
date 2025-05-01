# 📝 Freshcode Todo List

A simple To-Do list project using Node.js, Express, and MongoDB. Implements a REST API for task management with a basic HTML/CSS/JavaScript frontend.

## 🚀 Features

- Create, update, delete, and view tasks
- Connects to MongoDB (local or MongoDB Atlas)
- REST API
- Uses environment variables via `.env`
- Responsive frontend with task status toggling

## 📁 Project Structure

```
freshcode-todo-list/
├── server.js
├── script.js
├── style.css
├── index.html
├── .env
├── package.json
└── README.md
```
## 🔧 Installation & Launch

### 1. Clone the repository

```
git clone https://github.com/shapikkk/freshcode-todo-list.git
cd freshcode-todo-list
```

### 2. Install dependencies

```
npm install
```

### 3. Create a `.env` file in the project root

```
PORT=9345
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.u4tzt.mongodb.net/todolist?retryWrites=true&w=majority
```

> Replace <username> and <password> with your MongoDB Atlas credentials. Alternatively, use mongodb://localhost:27017/todolist for a local MongoDB instance running on port 27017.

### 4. Start the backend server

#### Normally:
```
node server.js
```
> The server will run at http://localhost:9345.

### 5. Serve the frontend
```
npx http-server -p 8080
```

> Open http://localhost:8080 in a browser to use the To-Do list.

## 📬 API Endpoints

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| GET    | /api/tasks     | Get all tasks       |
| POST   | /api/tasks     | Create a new task   |
| PUT    | /api/tasks/:id | Update a task by ID |
| DELETE | /api/tasks/:id | Delete a task by ID |

## 📦 Dependencies

- [express](https://expressjs.com/)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon) *(for development)*

## 🧑‍💻 Author

**[shapikkk](https://github.com/shapikkk)**  
Project created as part of a Freshcode training course.
