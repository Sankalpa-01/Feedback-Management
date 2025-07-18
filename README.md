# 🌟 Feedback Collection Platform

A full-stack feedback collection tool where businesses (admins) can create feedback forms and view responses, while users can submit feedback via a public link — all without logging in.

---

## 🚀 Features

### 👤 Admin (Business)
- Register/Login (JWT Auth)
- Create feedback forms (text & multiple-choice questions)
- Share public URL to collect responses
- View all responses (tabular view with summary)
- Export responses to CSV

### 🙋‍♂️ User (Customer)
- Access public form without login
- Submit feedback anonymously

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Auth:** JWT-based authentication
- **Styling:** TailwindCSS + React Toastify
- **CSV Export:** `json2csv`

---

## ⚙️ How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/feedback-platform.git
cd feedback-platform
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Open your browser at:
```
http://localhost:5173
```

---

## 🔗 Usage

### ➕ Admin
- Register or login via `/register` or `/login`
- Create forms with title and questions
- Share public link with users (e.g. `/form/abc123`)
- View all forms and responses on the dashboard
- Export responses to CSV

### ✍️ User
- Open shared public link `/form/:publicUrl`
- Submit feedback (no login required)
- Get redirected to success page

---

## 🧠 Design Decisions

- Clean RESTful API separation
- JWT tokens securely stored in frontend
- MongoDB schema designed for flexible question formats
- Public URL is randomly generated to avoid collisions
- Tailwind + Toastify for modern, responsive UI

---

## ✅ Bonus Features

- 📥 CSV Export for admin
- 📱 Mobile-responsive design
- ✅ Toast alerts for actions

---

## 👨‍💻 Author

**Sankalpa Panda**  
[GitHub](https://github.com/Sankalpa-01)  
[LinkedIn](https://www.linkedin.com/in/sankalpa-panda-807b78274/)

---

## 📜 License

This project is licensed under the MIT License.
