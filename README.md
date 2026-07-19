# 🚀 Velora  
## AI-Powered Job Verification & Recommendation Platform

<p align="center">
  <img src="frontend/src/velora.png" width="180" alt="Velora Logo"/>
</p>

<p align="center">
  <b>Find trusted jobs. Match your skills. Build your career with AI.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/badge/Deployment-Vercel%20%7C%20Render-black?style=for-the-badge"/>
</p>

---

# 📌 Overview

**Velora** is an AI-powered job verification and recommendation platform designed to help job seekers discover reliable opportunities, manage their career profiles, and receive personalized job recommendations.

The platform focuses on solving major problems in online job searching:

- Fake or misleading job postings
- Difficulty finding relevant opportunities
- Lack of personalized recommendations
- Inefficient resume-based searching

Velora combines modern web technologies with AI-powered matching to create a smarter job discovery experience.

---

# 🎯 Problem Statement

Finding the right job is becoming increasingly difficult due to:

- Thousands of irrelevant job listings
- Fake recruitment scams
- Lack of personalized suggestions
- Poor matching between candidate skills and job requirements

Candidates often spend hours searching for jobs that do not match their profile.

---

# 💡 Solution

Velora provides:

✅ Verified job discovery  
✅ Resume-based recommendations  
✅ AI-powered matching  
✅ Secure authentication  
✅ Personalized dashboard  
✅ Career-focused user experience  

---

# ✨ Features

## 🔐 Authentication System

- User registration
- Secure login system
- JWT authentication
- Google authentication
- Password encryption using bcrypt
- Protected routes

---

## 💼 Job Discovery

- Browse available jobs
- Search job opportunities
- View detailed job information
- Save important jobs
- Manage saved jobs

---

## 🤖 AI Job Recommendation

Velora intelligently recommends jobs based on:

- Resume information
- User skills
- Job requirements
- Candidate profile

Features:

- Resume-based matching
- Smart recommendations
- Career assistance

---

## 📄 Resume Management

Users can:

- Upload resumes
- Store career information
- Analyze skills
- Receive suitable job suggestions

---

## 👤 User Dashboard

Personalized dashboard containing:

- User profile
- Saved jobs
- Recommended jobs
- Career information

---

# 🏗️ System Architecture


```
                 User
                  |
                  |
              React Frontend
                  |
                  |
              REST API
                  |
          Node.js + Express
                  |
        ---------------------
        |                   |
    MongoDB             AI Engine
        |                   |
    User Data        Job Recommendation
```


---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | User Interface |
| React Router | Navigation |
| Axios | API Communication |
| CSS3 | Styling |
| React Icons | UI Icons |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | Database Modeling |
| JWT | Authentication |
| bcrypt | Password Security |

---

## AI & External Services

| Technology | Purpose |
|---|---|
| AI Recommendation System | Job Matching |
| Google OAuth | Authentication |
| Resume Processing | Candidate Analysis |

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
│   │   ├── services
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

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/velora.git

cd velora
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm start
```

Create `.env`:

```env
REACT_APP_API_URL=your_backend_url
```

Frontend runs:

```
http://localhost:3000
```

---

# Backend Setup

```bash
cd backend

npm install

npm start
```

Create `.env`:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
```

Backend runs:

```
http://localhost:5000
```

---

# 🔌 API Documentation

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/google` | Google authentication |

---

## Jobs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get available jobs |
| POST | `/api/save` | Save a job |

---

## Resume

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload` | Upload resume |

---

# 🌍 Deployment

## Frontend

```
https://velora-ten-puce.vercel.app
```

## Backend

```
https://velora-nv7w.onrender.com
```

## Database

```
MongoDB Atlas
```

---

# 🔒 Security Features

Velora implements:

- JWT authentication
- Password hashing
- Secure API routes
- Environment variable protection
- Google identity verification
- Database security

---

# 📸 Screenshots

Add screenshots here:

```
/screenshots

├── home.png
├── dashboard.png
├── jobs.png
├── profile.png
```

---

# 🚀 Future Roadmap

## Phase 1

✔ Job platform  
✔ Authentication  
✔ Dashboard  
✔ Resume upload  


## Phase 2

- Advanced AI recommendations
- Resume scoring
- Skill gap detection
- Interview preparation assistant


## Phase 3

- Company verification system
- Real-time job alerts
- AI career mentor
- Fraud job detection

---

# 🎯 Project Goals

Velora aims to build a safer and smarter employment ecosystem by:

- Connecting candidates with suitable jobs
- Reducing fake job opportunities
- Improving hiring efficiency
- Providing AI-driven career guidance

---

# 👨‍💻 Developer

Developed using the MERN Stack

**MongoDB + Express.js + React.js + Node.js**

---

# 🤝 Contributing

Contributions are welcome.

Steps:

```bash
git clone repository-url

git checkout -b feature-name

git commit -m "Added new feature"

git push origin feature-name
```

Create a Pull Request.

---

# 📜 License

MIT License

---

# ⭐ Support

If you like Velora, consider giving this repository a ⭐.
