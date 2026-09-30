# TaskFlow — MERN CRUD App

Full-stack MERN app: **React (Vite)** frontend talking to an **Express + MongoDB (Mongoose)** REST API with **JWT auth**.
Users register/log in, create **projects**, and manage **tasks** inside each project (full CRUD on both).

**Live app:** `<your-frontend-url>`  |  **API:** `<your-backend-url>`

## Features
- Frontend uses `fetch` (single wrapper in `client/src/api.js`) to call the API
- UI updates immediately after every create / update / delete (state synced with server responses)
- Error handling on both sides
  - Server: central `errorHandler` (validation, bad IDs, duplicates, JWT errors) → `{ success:false, message }`
  - Client: error banners on auth, projects and tasks; auto-logout on expired token; network-failure message
- Auth: register, login, protected routes, data scoped per user
- Task extras: status/priority/due date, status filter tabs, quick status dropdown

## Structure
```
server/   Express API (models, controllers, routes, middleware)
client/   React app (components, auth context, api wrapper)
```

## Run locally
**Backend**
```bash
cd server
npm install
cp .env.example .env     # set MONGO_URI and JWT_SECRET
npm run dev              # http://localhost:5000
```
**Frontend**
```bash
cd client
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm run dev              # http://localhost:5173
```

## API
| Method | Route | Auth |
|--------|-------|------|
| POST | `/api/auth/register`, `/api/auth/login` | No |
| GET | `/api/auth/me` | Yes |
| GET/POST | `/api/projects` | Yes |
| GET/PUT/DELETE | `/api/projects/:id` | Yes |
| GET/POST | `/api/tasks` (`?project=&status=&priority=&sort=&page=&limit=`) | Yes |
| GET/PUT/DELETE | `/api/tasks/:id` | Yes |

## Deployment
1. **Database — MongoDB Atlas:** create a free cluster, add a DB user, allow access from anywhere (`0.0.0.0/0`), copy the connection string.
2. **Backend — Render** (New → Web Service, connect the repo):
   - Root Directory: `server` · Build: `npm install` · Start: `npm start`
   - Env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your frontend URL, added after step 3)
3. **Frontend — Vercel or Netlify** (import the repo):
   - Root Directory: `client` · Build: `npm run build` · Output: `dist`
   - Env var: `VITE_API_URL=https://<your-render-app>.onrender.com/api`
4. Go back to Render and set `CLIENT_URL` to the final frontend URL (no trailing slash), then redeploy.
5. Put both URLs at the top of this README.

Note: Render's free tier sleeps after inactivity, so the first request can take ~30–60 s.
