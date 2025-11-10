# 🎉 Vibevent

**Vibevent** is an interactive event management web application built with a modern full-stack architecture.  
It provides a seamless platform for users and organizers to create, explore, and engage with events — from conferences and workshops to club activities and social gatherings.  

The system combines a **dynamic React frontend** with an **Express.js + PostgreSQL backend** and leverages **Socket.IO** for real-time updates, ensuring instant communication and notifications for all participants.

---

## 🧱 Project Structure

```
Vibevent/
├── package.json             # Root metadata
├── api/                     # Backend (Express API)
│   ├── package.json
│   ├── .env
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── src/                     # Frontend (React)
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

---

## 🚀 Features

- 🧑‍🤝‍🧑 **User Interaction** – Real-time notifications and event updates using Socket.IO  
- 📨 **Authentication System** – Secure login and registration with JWT and bcrypt  
- 🧾 **Event Management** – Create, edit, and RSVP to events effortlessly  
- 💬 **Email Alerts** – Integrated with Nodemailer to notify users about new or updated events  
- 🌐 **Responsive UI** – React and Framer Motion ensure smooth animations and mobile responsiveness  
- ⚙️ **Database Integration** – PostgreSQL powers the backend for secure, persistent storage  
- 🔒 **Environment-based Config** – dotenv for managing sensitive variables securely  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, React Router DOM, Axios, Framer Motion, Lucide React, React Hot Toast |
| **Backend** | Node.js, Express.js, Socket.IO, Express Validator |
| **Database** | PostgreSQL |
| **Security** | bcrypt, JWT (jsonwebtoken), CORS |
| **Email/Notifications** | Nodemailer |
| **Dev Tools** | Nodemon, dotenv |

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/MarcoBitar/Vibevent.git
cd Vibevent
```

### 2️⃣ Install dependencies for both frontend and backend
```bash
# Frontend
npm install

# Backend
cd Vibevent/api
npm install
```

### 3️⃣ Configure environment variables  
Create a `.env` file inside `Vibevent/api/`:

```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/vibevent
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## ▶️ Running the App

### Start the backend
```bash
cd Vibevent/api
npm run dev
```

### Start the frontend
```bash
cd ../
npm run dev
```

By default:
- **Frontend:** http://localhost:5173  
- **Backend API:** http://localhost:5000  

---

## 📡 API Overview

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/users/register` | POST | Register a new user |
| `/api/users/login` | POST | Authenticate user |
| `/api/events` | GET | Get all events |
| `/api/events` | POST | Create a new event |
| `/api/rsvp` | POST | RSVP to an event |

*(Endpoints may vary depending on your final route structure.)*

---

## 🧠 Usage Guide

1. **Sign Up / Log In:** Create an account or log in using your credentials.  
2. **Explore Events:** Browse through available events or search by category.  
3. **RSVP:** Register your interest and view confirmation in real time.  
4. **Notifications:** Receive instant updates for new events or changes.  
5. **Organizer Tools:** (if admin) Create and manage your own events.

---

## 🛠️ Development Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Run in development mode |
| `npm start` | Run in production mode |
| `npm test` | Run unit tests (if configured) |

---

## 🧩 Environment Variables

| Variable | Description |
|-----------|-------------|
| `PORT` | Backend server port |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for token encryption |
| `EMAIL_USER` / `EMAIL_PASS` | Credentials for Nodemailer |

---

## 🌟 Vision & Future Enhancements

Vibevent aims to simplify event management and participation, making it an essential tool for both organizers and attendees.  
In the future, the app will introduce:  

- 📱 A **Progressive Web App (PWA)** version for mobile users  
- 📊 **Analytics Dashboard** for event insights  
- 🗓️ **Calendar Integration** for reminders and scheduling  
- 🔔 **Push Notifications** for new and updated events  
- 🧑‍💻 **Role-Based Access** to manage admin and regular user functionalities  

---

## 🤝 Contributing

Contributions are welcome!  
To contribute:
1. Fork the repository  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Open a pull request  

---

## 👨‍💻 Author

**Marco Bitar**  
🎓 Computer Science Student  
📧 [Email](bitar.marco21@gmail.com) | [GitHub](https://github.com/MarcoBitar) | [LinkedIn](https://www.linkedin.com/in/marco-bitar-545046285)
