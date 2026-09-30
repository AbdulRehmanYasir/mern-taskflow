<div align="center">

# 🚀 TASKFLOW

### MERN Task Management Platform

A full-stack task management application built with **React, Node.js, Express, MongoDB, and JWT authentication**.

Users can register, create projects, and manage tasks through a complete REST API with real-time UI updates.

**Plan. Manage. Track. Complete.**

</div>

---

## 📌 About

**TaskFlow** is a full-stack MERN CRUD application built as part of my **Dev Weekends Fellowship**.

The project connects a React + Vite frontend with an Express + MongoDB backend to provide complete CRUD functionality for projects and tasks.

It also includes JWT authentication, task filtering, status and priority management, and client/server-side error handling.

---

## ✨ Features

* 🔐 JWT authentication
* 👤 User-specific data
* 📁 Project CRUD
* ✅ Task CRUD
* 🎯 Task status & priority
* 📅 Due dates
* 🔎 Task filtering
* ⚡ Quick status updates
* 🔄 UI synchronization after CRUD operations
* 🛡 Client & server error handling
* 📡 REST API integration
* 📱 Responsive interface

---

## 🔄 Application Flow

```text
React Frontend
      ↓
Fetch API
      ↓
Express REST API
      ↓
JWT Authentication
      ↓
Controllers
      ↓
Mongoose
      ↓
MongoDB
      ↓
Updated React UI
```

---

## 🏗 Project Structure

```text
mern-taskflow/
│
├── client/          # React + Vite frontend
│   └── src/
│
├── server/          # Express + MongoDB backend
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
│
├── .gitignore
└── README.md
```

---

## 🛠 Tech Stack

| Technology | Usage             |
| ---------- | ----------------- |
| React      | Frontend          |
| Vite       | Frontend tooling  |
| Node.js    | Backend runtime   |
| Express.js | REST API          |
| MongoDB    | Database          |
| Mongoose   | MongoDB ODM       |
| JWT        | Authentication    |
| Fetch API  | API communication |

---

## 📡 API

### Authentication

| Method | Endpoint             | Auth |
| ------ | -------------------- | ---- |
| POST   | `/api/auth/register` | No   |
| POST   | `/api/auth/login`    | No   |
| GET    | `/api/auth/me`       | Yes  |

### Projects

| Method             | Endpoint            | Auth |
| ------------------ | ------------------- | ---- |
| GET / POST         | `/api/projects`     | Yes  |
| GET / PUT / DELETE | `/api/projects/:id` | Yes  |

### Tasks

| Method             | Endpoint         | Auth |
| ------------------ | ---------------- | ---- |
| GET / POST         | `/api/tasks`     | Yes  |
| GET / PUT / DELETE | `/api/tasks/:id` | Yes  |

Task filtering supports:

```text
?project=
?status=
?priority=
?sort=
?page=
?limit=
```

---

## ⚙️ Run Locally

### Backend

```bash
cd server
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run:

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

---

## 🌐 Deployment

Planned deployment:

```text
MongoDB Atlas
      ↓
Render Backend
      ↓
Vercel Frontend
```

**Live App:** `To be deployed`

**Backend API:** `To be deployed`

---

## 🎯 Project Goals

TaskFlow was built around a simple idea:

```text
Plan Your Work
       ↓
Organize Projects
       ↓
Manage Tasks
       ↓
Track Progress
       ↓
Keep Data Synchronized
       ↓
Get Things Done
```

The goal is to build a complete full-stack workflow where the **React frontend, Express API, authentication layer, and MongoDB database** work together as one application.

---

## 👨‍💻 Author

<div align="center">

### Abdul Rehman Yasir

**BS Artificial Intelligence Student | Developer**

Building real-world software & AI projects.

[GitHub](https://github.com/AbdulRehmanYasir)

</div>

---

<div align="center">

### 🚀 TASKFLOW

**Plan. Manage. Track. Complete.**

Built with React + Vite + Node.js + Express + MongoDB.

</div>
