# StackIt

A minimal, full-stack Q&A platform like StackOverflow — built with **ReactJS**, **Bootstrap**, **Node.js**, **Express**, and **MongoDB**. Authenticated users can ask questions, answer others, and explore topics using tags.

---

## 🛠️ Features

### ✅ Authentication

- Sign Up & Sign In (JWT-based)
- Token stored in `localStorage`
- Route protection (e.g., only authenticated users can ask questions or answer)

### 💬 Questions & Answers

- Ask new questions (title, description, tags)
- Browse all questions
- View individual question pages with answers
- Only logged-in users can submit answers

### 🔎 Tags & Search

- Add tags to categorize questions
- Search bar to quickly find questions

### 🎨 UI

- Responsive dark-themed design using **React Bootstrap**
- Clean and minimal interface for optimal readability

---



## ⚙️ Tech Stack

### Frontend

- ReactJS
- React Router
- Bootstrap 5
- Rich Text Editor (optional for future)

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for auth
- CORS and Body-Parser

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/stackit.git
cd stackit
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env.development.local` for development or `.env.production.local` for production in `backend/`:

```env
NODE_ENV=your_env
PORT=4500
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRY=expiry
```

Start backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 🔐 Auth Routes

- `POST /api/auth/sign-up` → { username, email, password }
- `POST /api/auth/sign-in` → { email, password }

Response includes a JWT token (stored in localStorage).

---

## 📌 Protected Routes

Frontend uses a `PrivateRoute`-style redirect:

- If token is missing/invalid → redirect to `/signup`
- Else → access pages like `/ask` or answer questions

---

## 📤 Ask a Question

- Only accessible to authenticated users
- Fields: title, description, tags
- On success → redirect to newly created question detail page

---

## 💡 Future Enhancements

- Voting on questions/answers
- User profiles and activity history
- Tag filtering and sorting
- Markdown support

---
## Team Members Detail
1. Vivek Kumar
Email: vivekkumar16777@gmail.com
ph no: 8530518436
2. Ankit Jangid
Email: Ankitj2811@gmail.com
ph no: 95888090462
3. Ujjwal Sen
Email: Ujjwalsen23@gmail.com
ph no: 9461094449
4. Anubhav Mishra
Email: Mishra.Anubhav108@gmail.com
ph no: 7016624726

