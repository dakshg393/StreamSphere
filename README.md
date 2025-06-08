
# 🎥 StreamSphere – Full-Stack Video Sharing Platform

**StreamSphere** is a YouTube-like video sharing platform that allows users to upload, watch, like, and comment on videos. Built using the MERN stack with a scalable folder structure (`frontend/` and `backend/`), it’s designed for both learning and showcasing full-stack development skills.

---

## 🗂️ Project Structure

```
StreamSphere/
├── frontend/      # React-based client app
└── backend/       # Express + MongoDB REST API
```

---

## 🚀 Features

* 📤 **Video Upload** – Upload MP4 videos with custom titles and thumbnails
* ▶️ **Video Player** – Watch videos in a clean, responsive player
* ❤️ **Like & Comment** – Interact with content and other users
* 🔐 **Authentication** – Register and log in with secure JWT-based auth
* 🔎 **Search & Filter** – Discover content by title, category, or tags
* 🧾 **User Dashboard** – View uploaded videos and profile info

---

## 🛠️ Tech Stack

* **Frontend**: React, React Router, Axios, Tailwind CSS
* **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer (for file uploads)
* **Auth**: JWT-based authentication
* **Storage**: Local or cloud storage (e.g., AWS S3, optional)

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/streamsphere.git
cd streamsphere
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
```

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 📸 Screenshots

*Add screenshots here once available*

---

## 🏁 Project Status

✅ MVP complete
🚧 Future: Live streaming, subscriptions, video analytics, cloud storage support

---
