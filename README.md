# 📝 The Idea Board

The **Idea Board** is a realtime, anonymous idea-sharing platform.  
Users can submit ideas, upvote suggestions, and collaborate in real time.  
The project is **fully Dockerized** with a **React frontend**, **Node.js/Express backend**, and **PostgreSQL database** managed via **Sequelize ORM**.  
Realtime updates are powered by **Socket.IO**.

---

## 📌 Architecture

- **Frontend** → React + Vite + Tailwind CSS  
- **Backend** → Node.js + Express + Sequelize + Socket.IO  
- **Database** → PostgreSQL (with Sequelize migrations & models)  
- **Communication** → REST API + WebSockets  
- **Deployment** → Docker Compose orchestrates all services  

The system is structured into three containers:
1. `frontend` → React app served with Nginx
2. `backend` → Express API + Socket.IO
3. `db` → PostgreSQL database with persistent volume

---

## 🚀 Running Locally (with Docker Compose)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SahO-ux/the-idea-board.git
cd the-idea-board
```

### 2️⃣ Setup Environment Variables
Copy the example env file:
```bash
cp .env.example .env
```

The `.env` file contains:
```env
# Postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ideasdb

# Backend
BACKEND_PORT=4000
CORS_ORIGIN=http://localhost:3000

# Frontend (Vite - build time)
VITE_API_URL=http://localhost:4000
```

### 3️⃣ Build & Start Containers
```bash
docker compose up --build
```

- Frontend → http://localhost:3000  
- Backend API → http://localhost:4000/api  
- Database → exposed on port 5432  

### 4️⃣ Stopping Containers
```bash
docker compose down
```

---

## 📡 API Endpoints

All API endpoints are prefixed with `/api`.

### 📍 `GET /api/ideas`
Fetch all ideas.

**Response Example**
```json
[
  {
    "id": 1,
    "content": "Make meetings more productive",
    "votes": 5,
    "createdAt": "2025-10-02T18:30:00.000Z"
  }
]
```

---

### 📍 `POST /api/ideas`
Submit a new idea.  

**Request Body**
```json
{
  "content": "Your idea text (max 280 chars)"
}
```

**Response**
```json
{
  "id": 2,
  "content": "New idea here",
  "votes": 0,
  "createdAt": "2025-10-02T19:00:00.000Z"
}
```

---

### 📍 `POST /api/ideas/:id/vote`
Upvote an idea by ID.  

**Response**
```json
{
  "id": 2,
  "content": "New idea here",
  "votes": 1,
  "createdAt": "2025-10-02T19:00:00.000Z"
}
```

---

## ⚡ Realtime Features (Socket.IO)

- **Event:** `idea:created` → Broadcast when a new idea is added.  
- **Event:** `idea:voted` → Broadcast when an idea is upvoted.  

The frontend listens to these events to update instantly without refresh.

---

## 📝 Notes & Trade-offs

- **Sequelize** chosen for ORM simplicity instead of raw SQL.  
- **Docker Compose** ensures reproducibility and avoids manual DB setup.  
- **Socket.IO** ensures realtime sync across clients.  
- **UI UX trade-offs:**  
  - Mobile truncation & modal for long text.  
  - Hidden "Features" button on wider screens to avoid confusion.  

---

## 📂 Project Structure

```
the-idea-board/
│── backend/          # Express + Sequelize + Socket.IO
│── frontend/         # React + Vite + Tailwind
│── docker-compose.yml
│── .env.example
│── README.md
│── .gitignore
```

---

## 👨‍💻 Author

Built with ❤️ by **Sahil Akbari** for the Fullstack Developer role assessment.
