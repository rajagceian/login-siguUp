# 🔐 JWT Authentication Web App

A simple and secure **user authentication system** using:

- ✅ Node.js + Express.js (Backend)
- ✅ MongoDB (Database)
- ✅ JWT + Cookies (Authentication)
- ✅ HTML, CSS & JS (Frontend)
- ✅ Protected Dashboard Page

---

## 📁 Folder Structure

project/ <br>
├── backend/<br>
│ ├── config/db.js<br>
│ ├── controller/authController.js<br>
│ ├── middleware/jwtAuth.js<br>
│ ├── model/userModel.js<br>
│ ├── router/authRoute.js<br>
│ └── app.js<br>
├── frontend/<br>
│ ├── index.html<br>
│ ├── style.css<br>
│ ├── script.js<br>
│ ├── dashboard.html<br>
│ ├── dashboard.css<br>
│ └── dashboard.js<br>
├── .env<br>
├── package.json<br>
└── README.md<br>


---

## 🛠 Technologies Used

| Purpose     | Tech                     |
|-------------|--------------------------|
| Backend     | Node.js, Express.js      |
| Database    | MongoDB, Mongoose        |
| Auth        | JWT, Cookies             |
| Frontend    | HTML, CSS, JavaScript    |

---

## ✅ Features

- 🔒 JWT-based user authentication
- 🧠 Secure password hashing with bcrypt
- 📂 Protected route (`/user`) using middleware
- 👁️ Show/hide password toggle
- 🎨 Clean UI with blur effects & animations
- 🧍 Avatar + User Info Table (Name, Email)
- 📤 Logout with localStorage & cookie clear

---

## ⚙️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/rajagceian/login-siguUp.git
cd jwt-auth-app
```


## 2. 🔧 Set up Backend

```bash
cd backend
npm install
```
## 3. Create a .env file in the backend folder:

```bash
PORT=8000
MONGODB_URL=your_mongodb_connection_string
SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5500
```
## 4. ▶️ Start the Backend Server
```bash
node app.js
```

## 5. 💻 Run Frontend
### Use Live Server in VS Code or serve via any static server:
```bash
cd frontend
```
### Open index.html in your browser
### OR run: 
```bash
npx live-server
```
## 🖼 Sample UI
### login
<img width="1920" height="1001" alt="Image" src="https://github.com/user-attachments/assets/850f86d0-38c6-4244-be92-a43ff9f33733" />

### Sign Up
<img width="1920" height="1001" alt="Image" src="https://github.com/user-attachments/assets/ba5428ac-314b-4f83-a979-bff939d0e2fe" />


## 👨‍💻 Author
### Raja Kumar
### B.Tech CSE
#### If you found this helpful, drop a ⭐ and share it with your friends!
