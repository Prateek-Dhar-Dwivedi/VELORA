# 🚀 Velora - AI Powered Job Verification Platform

![Velora Logo](frontend/src/velora.png)

Velora is an AI-powered job verification and recommendation platform that helps users discover trusted job opportunities, manage their career profile, upload resumes, and get personalized job recommendations.

The main goal of Velora is to reduce fake job listings and provide a smarter, safer, and efficient job search experience.

---

# ✨ Features

## 🔐 Authentication

- User registration and login
- JWT-based authentication
- Google authentication
- Secure password encryption
- Protected user routes

---

## 💼 Job Management

- Browse job opportunities
- Search jobs
- View job details
- Save jobs
- Manage saved jobs
- Personalized job dashboard

---

## 🤖 AI Job Recommendation

- Resume-based job matching
- Skill-based recommendations
- AI-powered career assistance
- Smart job suggestions

---

## 📄 Resume Management

- Upload resume
- Store resume information
- Analyze candidate skills
- Recommend suitable jobs

---

## 📊 User Dashboard

- User profile management
- Saved jobs section
- Recommended jobs
- Career information

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS3
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API

## AI & Services

- AI Recommendation System
- Google OAuth
- Resume Processing

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# 📂 Project Structure

```
Velora
│
├── frontend
│   │
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── App.js
│   │
│   └── package.json
│
├── backend
│   │
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/velora.git

cd velora
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=your_backend_url
```

Run frontend:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
```

Run backend:

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔑 API Documentation

## Authentication APIs

### Register User

```
POST /api/auth/register
```

Request:

```json
{
 "name":"User Name",
 "email":"user@gmail.com",
 "password":"password"
}
```

---

### Login User

```
POST /api/auth/login
```

Request:

```json
{
 "email":"user@gmail.com",
 "password":"password"
}
```

---

### Google Login

```
POST /api/auth/google
```

Request:

```json
{
 "credential":"google_token"
}
```

---

# 💼 Job APIs

## Get Jobs

```
GET /api/jobs
```

---

## Save Job

```
POST /api/save
```

---

# 📄 Resume APIs

## Upload Resume

```
POST /api/upload
```

---

# 🌐 Deployment

## Frontend

```
https://velora-ten-puce.vercel.app
```

## Backend

```
https://velora-nv7w.onrender.com
```

---

# 🔒 Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected API routes
- Secure Google login
- Environment variable protection
- Database security

---

# 🚀 Future Improvements

- AI resume scoring
- Company verification system
- Real-time job alerts
- Interview preparation assistant
- Skill gap analysis
- AI career mentor
- Advanced job fraud detection

---

# 🎯 Project Objective

Velora aims to create a reliable job searching ecosystem by:

- Reducing fake job opportunities
- Helping candidates find relevant jobs
- Providing AI-based recommendations
- Improving career decisions

---

# 👨‍💻 Developer

Developed using MERN Stack

Technologies:

- MongoDB
- Express.js
- React.js
- Node.js

---

# 🤝 Contribution

Contributions are welcome.

Steps:

1. Fork the repository

2. Create a branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Create Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project, consider giving it a star on GitHub.
