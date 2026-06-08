# 🔗 WarpLink API

<div align="center">

### 🚀 Secure • Fast • Scalable URL Shortener API

Create, manage, and share shortened URLs with JWT Authentication, PostgreSQL, and Drizzle ORM.


<br>

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge\&logo=node.js\&logoColor=white)      ![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge\&logo=express)     ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge\&logo=postgresql\&logoColor=white)        ![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge)     ![JWT](https://img.shields.io/badge/JWT-Authentication-D63AFF?style=for-the-badge)      ![Zod](https://img.shields.io/badge/Zod-Validation-3068B7?style=for-the-badge)

</div>

---

# 📖 Overview

ShortLink API is a production-ready REST API that enables users to create, manage, and share shortened URLs securely. The application implements JWT-based authentication, URL ownership, custom short codes, and PostgreSQL persistence using Drizzle ORM.

---

# ✨ Features

| Feature              | Description                  |
| -------------------- | ---------------------------- |
| 🔐 Authentication    | JWT-based authentication     |
| 👤 User Management   | Signup, Login, Current User  |
| 🔗 URL Shortening    | Generate short URLs          |
| 🎯 Custom Aliases    | Custom short codes           |
| 📂 URL Dashboard     | View user-created URLs       |
| 🗑 URL Management    | Delete owned URLs            |
| 🛡 Validation        | Request validation using Zod |
| 🔒 Password Security | Secure password hashing      |
| ⚡ Fast Redirects     | Instant URL redirection      |

---

# 🏛 System Architecture

```mermaid
flowchart TD

A[Client]

A --> B[Express Server]

B --> C[Authentication Middleware]

C --> D{JWT Valid?}

D -->|No| E[401 Unauthorized]

D -->|Yes| F[Route Handler]

F --> G[Service Layer]

G --> H[Drizzle ORM]

H --> I[(PostgreSQL)]

I --> H
H --> G
G --> F
F --> J[JSON Response]
```

---

# 🛠 Tech Stack

| Category       | Technologies        |
| -------------- | ------------------- |
| Backend        | Node.js, Express.js |
| Database       | PostgreSQL          |
| ORM            | Drizzle ORM         |
| Authentication | JWT                 |
| Validation     | Zod                 |
| Security       | bcrypt              |
| Utility        | NanoID              |

---

# 📂 Project Structure

```text
src
│
├── db
│   └── index.js
│
├── models
│   ├── user.model.js
│   └── urls.model.js
│
├── routes
│   ├── user.routes.js
│   └── url.routes.js
│
├── services
│   ├── user.services.js
│   └── url.service.js
│
├── middlewares
│   └── auth.middleware.js
│
├── validation
│   └── request.validation.js
│
├── utils
│   ├── token.util.js
│   └── hashgenerator.util.js
│
└── server.js
```

---

# 🗄 Database Schema

```mermaid
erDiagram

USERS {
    uuid id PK
    varchar firstname
    varchar lastname
    varchar username
    varchar email
    varchar password
}

URLS {
    uuid id PK
    varchar shortCode
    text targetUrl
    uuid userId FK
    timestamp createdAt
}

USERS ||--o{ URLS : owns
```

---

# 🔐 Authentication API

| Method | Endpoint           | Authentication |
| ------ | ------------------ | -------------- |
| POST   | `/api/user/signup` | ❌              |
| POST   | `/api/user/login`  | ❌              |
| GET    | `/api/user/me`     | ✅              |

## Signup

```http
POST /api/user/signup
```

Request

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "message": "User johndoe created successfully"
}
```

---

## Login

```http
POST /api/user/login
```

Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "status": "success",
  "token": "jwt_token"
}
```

---

# 🔗 URL API

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| POST   | `/shorten`    | Create Short URL         |
| GET    | `/codes`      | Get User URLs            |
| DELETE | `/:shortCode` | Delete URL               |
| GET    | `/:shortCode` | Redirect to Original URL |

---

## Create Short URL

```http
POST /shorten
Authorization: Bearer <token>
```

Request

```json
{
  "targetUrl": "https://github.com",
  "code": "github"
}
```

Response

```json
{
  "status": "success",
  "data": {
    "shortCode": "github",
    "targetUrl": "https://github.com"
  }
}
```

---

## Get User URLs

```http
GET /codes
Authorization: Bearer <token>
```

---

## Delete URL

```http
DELETE /github
Authorization: Bearer <token>
```

---

## Redirect

```http
GET /github
```

Redirects to:

```text
https://github.com
```

---

# ⚙ Environment Variables

Create a `.env` file:

```env
PORT=8000

DATABASE_URL=postgresql://username:password@localhost:5432/shortlink

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

---

# 🚀 Quick Start

## Clone Repository

```bash
git clone https://github.com/yourusername/shortlink-api.git
```

## Navigate Into Project

```bash
cd shortlink-api
```

## Install Dependencies

```bash
npm install
```

## Generate Database Files

```bash
npm run db:generate
```

## Run Migrations

```bash
npm run db:migrate
```

## Start Development Server

```bash
npm run dev
```

Server will start at:

```text
http://localhost:8000
```

---

# 📊 Development Status

| Module                | Status     |
| --------------------- | ---------- |
| User Registration     | ✅ Complete |
| User Login            | ✅ Complete |
| JWT Authentication    | ✅ Complete |
| URL Shortening        | ✅ Complete |
| Custom Short Codes    | ✅ Complete |
| User URL Dashboard    | ✅ Complete |
| URL Deletion          | ✅ Complete |
| Request Validation    | ✅ Complete |
| Refresh Tokens        | 🚧 Planned |
| Click Analytics       | 🚧 Planned |
| Swagger Documentation | 🚧 Planned |
| Docker Support        | 🚧 Planned |
| Redis Caching         | 🚧 Planned |
| QR Code Generation    | 🚧 Planned |

---

# 🎯 Future Roadmap

* 📈 URL Click Analytics
* 🔄 Refresh Token Authentication
* 📚 Swagger / OpenAPI Documentation
* 🐳 Docker Support
* ⚡ Redis Caching
* 🌍 Custom Domains
* 📱 React Frontend Dashboard
* 🔔 Webhooks
* 📊 Usage Insights
* 📎 QR Code Generation

---

# 🤝 Contributing

Contributions are welcome.

```bash
Fork ➜ Clone ➜ Create Branch ➜ Commit ➜ Push ➜ Pull Request
```

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

# 📜 License

This project is licensed under the MIT License.

---

