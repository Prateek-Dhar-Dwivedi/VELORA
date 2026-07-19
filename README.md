# 🚀 Velora  
## AI-Powered Job Verification & Recommendation Platform

<p align="center">
  <img src="frontend/src/velora.png" width="180" alt="Velora Logo"/>
</p>

<p align="center">
  <b>Find Trusted Jobs. Match Your Resume. Build Your Career.</b>
</p>

<p align="center">

<img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react">

<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js">

<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb">

<img src="https://img.shields.io/badge/Auth-Google%20OAuth-4285F4?style=for-the-badge&logo=google">

<img src="https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary">

</p>

---

# 📌 Overview

**Velora** is an AI-powered job verification and recommendation platform designed to help users discover trusted job opportunities, upload resumes, manage career profiles, and receive personalized job recommendations.

The platform combines modern web technologies, cloud services, and AI-based matching to create a smarter job searching experience.

---

# 🎯 Problem Statement

Online job platforms often suffer from:

- Fake job postings
- Irrelevant job recommendations
- Difficulty finding suitable opportunities
- Time-consuming job searching
- Poor matching between skills and requirements

Candidates need a platform that understands their skills and helps them discover suitable opportunities.

---

# 💡 Solution

Velora provides:

- AI-based job recommendations
- Resume-based matching
- Secure authentication
- Cloud-based resume storage
- Personalized job dashboard
- Better job discovery experience

---

# ✨ Features

## 🔐 Authentication System

Velora provides a secure authentication system.

### Features:

- User registration
- Login with email and password
- Google OAuth 2.0 authentication
- JWT-based authentication
- Secure password encryption
- Protected routes

---

## 💼 Job Discovery

Users can:

- Browse available jobs
- Search jobs
- View job details
- Save jobs
- Manage saved jobs

---

## 🤖 AI Job Recommendation

Velora recommends jobs according to:

- Resume information
- Candidate skills
- Job requirements
- User profile data

Features:

- Smart job matching
- Personalized recommendations
- AI-assisted career guidance

---

## 📄 Resume Management

Users can:

- Upload resumes
- Store resume information
- Manage career documents
- Receive job suggestions based on profile

---

## ☁️ Cloudinary Integration

Cloudinary is used for secure file storage.

Features:

- Resume upload
- Cloud-based storage
- Secure file handling
- Fast media delivery

Upload Flow:

```
User
 |
 |
Upload Resume
 |
 |
React Frontend
 |
 |
Node.js API
 |
 |
Cloudinary Storage
 |
 |
Database URL Storage
```

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
     ---------------------------
     |                         |
 MongoDB                  AI Engine
     |
 User Data

                  |
             Cloudinary
                  |
          Resume Storage
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | User Interface |
| React Router DOM | Navigation |
| Axios | API Requests |
| CSS3 | Styling |
| React Icons | UI Icons |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | API Development |
| MongoDB | Database |
| Mongoose | Database Modeling |
| JWT | Authentication |
| bcrypt.js | Password Security |

---

## Authentication

| Technology | Purpose |
|---|---|
| Google OAuth 2.0 | Google Login |
| JWT | User Sessions |
| bcrypt.js | Password Encryption |

---

## Cloud Services

| Technology | Purpose |
|---|---|
| Cloudinary | Resume Storage |
| MongoDB Atlas | Database Hosting |

---

## AI Services

| Technology | Purpose |
|---|---|
| AI Recommendation Engine | Job Matching |
| Resume Analysis | Skill-Based Suggestions |

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
│   ├── uploads
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

```bash
cd frontend

npm install

npm start
```

Create `.env`:

```env
REACT_APP_API_URL=your_backend_url
```

Frontend:

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

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Backend:

```
http://localhost:5000
```

---

# 🔌 API Documentation

## Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/google` | Google Login |

---

## Job Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get Jobs |
| POST | `/api/save` | Save Job |
| GET | `/api/save` | Get Saved Jobs |

---

## Resume Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload` | Upload Resume |

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

## File Storage

```
Cloudinary
```

---

# 🔒 Security Features

Velora implements:

- JWT authentication
- Password hashing with bcrypt
- Google OAuth verification
- Protected API routes
- Secure environment variables
- Cloudinary secure uploads
- Database security

---

# 🚀 Future Roadmap

## AI Improvements

- Resume scoring
- Skill gap analysis
- AI career mentor
- Interview preparation assistant

## Platform Improvements

- Real-time job alerts
- Company verification system
- Fake job detection
- Advanced analytics

---

# 🎯 Project Goals

Velora aims to build a safer and smarter job ecosystem by:

- Helping users find relevant jobs
- Reducing fake opportunities
- Improving job matching
- Providing AI-powered career assistance

---

# 👨‍💻 Developer

Built using the MERN Stack

**MongoDB + Express.js + React.js + Node.js**

with:

- Google OAuth
- Cloudinary
- AI Recommendation System

---

# 🤝 Contribution

Contributions are welcome.

Steps:

```bash
git checkout -b feature-name

git add .

git commit -m "Added feature"

git push origin feature-name
```

Create a Pull Request.

---

# 📜 License

MIT License

---

# ⭐ Support

If you like Velora, consider giving this repository a ⭐ on GitHub.
