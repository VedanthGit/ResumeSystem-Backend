# 🧾 Resume System Backend (MERN Stack)

This is the **backend service** for the **Resume System** — a next-generation resume-building and career ecosystem designed for students and professionals.
It enables **secure user authentication**, **resume data management**, and **cross-platform integration** (e.g., automatically updating resumes from external platforms like internships, hackathons, or learning portals).

---

## 🚀 Features

✅ **User Authentication (JWT-based)**
✅ **Resume CRUD APIs** (create, read, update, delete)
✅ **Image Uploads** (profile and resume thumbnails)
✅ **Cross-Platform Integration API** (secured via API key)
✅ **MongoDB + Mongoose** for scalable data storage
✅ **Modular Express.js structure** for easy maintenance

---

## 🏗️ Tech Stack

| Category          | Technology                    |  
| ----------------- | ----------------------------- |  
| Backend Framework | Node.js, Express.js           |  
| Database          | MongoDB with Mongoose         |  
| Authentication    | JWT (JSON Web Tokens)         |  
| File Uploads      | Multer                        |  
| Security          | bcryptjs, dotenv, CORS        |  
| Integration       | API key–based external access |  

---

## 📁 Folder Structure

```  
backend/  
│  
├── config/  
│   └── db.js  
│  
├── controllers/  
│   ├── authController.js  
│   ├── resumeController.js  
│   └── uploadImages.js  
│  
├── middlewares/  
│   ├── authMiddleware.js  
│   ├── uploadMiddleware.js  
│   └── integrationMiddleware.js  
│  
├── models/  
│   ├── User.js  
│   └── Resume.js  
│  
├── routes/  
│   ├── authRoutes.js  
│   ├── resumeRoutes.js  
│   └── integrationRoutes.js  
│  
├── utils/  
│   └── generateTokens.js  
│  
├── uploads/  
│  
├── .env  
├── server.js  
└── package.json  
```  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/resume-system-backend.git
cd resume-system-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
EXTERNAL_API_KEY=resume-system-external-key-123
```
> node -e "console.log('JWT_SECRET=', require('crypto').randomBytes(32).toString('hex'));"  
> node -e "console.log('EXTERNAL_API_KEY=', require('crypto').randomBytes(64).toString('hex'));"


### 4️⃣ Start the server

```bash
npm run dev
```

> Server runs at **[http://localhost:8000](http://localhost:8000)**

---

## 🔐 Authentication APIs

| Method | Endpoint                 | Description             | Protected |
| ------ | ------------------------ | ----------------------- | --------- |
| `POST` | `/api/auth/register`     | Register new user       | ❌         |
| `POST` | `/api/auth/login`        | Login existing user     | ❌         |
| `GET`  | `/api/auth/profile`      | Get logged-in user data | ✅         |
| `POST` | `/api/auth/upload-image` | Upload profile image    | ✅         |

---

## 🧾 Resume APIs

| Method   | Endpoint                        | Description                  | Protected |
| -------- | ------------------------------- | ---------------------------- | --------- |
| `POST`   | `/api/resume`                   | Create a new resume          | ✅         |
| `GET`    | `/api/resume`                   | Get all resumes              | ✅         |
| `GET`    | `/api/resume/:id`               | Get a specific resume        | ✅         |
| `PUT`    | `/api/resume/:id`               | Update resume                | ✅         |
| `PUT`    | `/api/resume/:id/upload-images` | Upload resume/profile images | ✅         |
| `DELETE` | `/api/resume/:id`               | Delete resume                | ✅         |

---

## 🌐 Cross-Platform Integration API

| Method | Endpoint                            | Description                                                                  | Protection                     |
| ------ | ----------------------------------- | ---------------------------------------------------------------------------- | ------------------------------ |
| `POST` | `/api/integrations/add-achievement` | External platforms can add achievements or certifications to a user’s resume | Secured via `x-api-key` header |

**Header Example:**

```
x-api-key: resume-system-external-key-123
```

**Request Body Example:**

```json
{
  "userId": "6714b7f7a0f1f8c12345abcd",
  "title": "Completed Full-Stack Bootcamp",
  "description": "Built real-world MERN projects.",
  "year": 2025,
  "platform": "Internshala"
}
```

**Response Example:**

```json
{
  "message": "Achievement added successfully from external source",
  "updatedResume": { ... }
}
```

---

## 🧰 Useful Scripts

| Script        | Description                           |
| ------------- | ------------------------------------- |
| `npm start`   | Run server (production mode)          |
| `npm run dev` | Run server with Nodemon (development) |

---

## 🧠 Security Highlights

* **Passwords hashed** with `bcryptjs`
* **JWT tokens** for authentication
* **CORS** configured for frontend
* **API key validation** for external integrations
* **File upload restrictions** to `.jpg`, `.jpeg`, `.png`

---

## 💡 Future Enhancements

* Cloud image storage (e.g., Cloudinary / S3)
* Role-based access (Admin / User)
* AI resume summary generator
* Webhook listener for automatic resume updates from verified sources

---

## 🧑‍💻 Developer Info

**Developer:** Vedanth Lahoti  
**Email:** vedanthlahoti@gmail.com  
**Role:** MERN Stack Developer  
**Project:** Resume System Backend (Trial Task)  

---

## ✅ Summary

This backend successfully implements:

✔ **User authentication with JWT**  
✔ **Comprehensive resume management APIs**  
✔ **Secure image uploads**  
✔ **Cross-platform integration readiness**  

> Designed with scalability, modularity, and integration in mind — ready to plug into the Resume System frontend or other ecosystem services.




