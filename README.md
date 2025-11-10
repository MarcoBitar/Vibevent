# 🎉 Vibevent

**Vibevent** is an interactive event management web application built with a modern full-stack architecture.
It provides a seamless platform for users and organizers to create, explore, and engage with events, from conferences and workshops to club activities and social gatherings.

The system combines a **dynamic React frontend** with an **Express.js + PostgreSQL backend** and uses **Socket.IO** for real-time updates, ensuring instant communication and notifications for all participants.

---

## 🧠 About the Project

Managing and participating in events can often be time-consuming, especially when using multiple platforms for RSVPs, updates, and communication.
**Vibevent** was built to simplify this process by bringing everything together in one intuitive web application.

This project started as a university-level full-stack development project and demonstrates the integration between frontend, backend, and database systems using modern technologies.

The goal is to provide both **users** and **organizers** with a smoother, smarter event experience:

* **Users** can discover events, RSVP in one click, and stay informed with real-time notifications.
* **Clubs** can create, edit, and manage their own events while monitoring engagement using analytics.

Vibevent already includes **Progressive Web App (PWA)** functionality, **push notifications**, and **analytics dashboards** for both users and clubs, making it a fully interactive and data-driven platform.

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

* 🧑‍🤝‍🧑 **User Interaction** – Real-time notifications and event updates using Socket.IO
* 📨 **Authentication System** – Secure login and registration with JWT and bcrypt
* 🧾 **Event Management** – Users and clubs can create, edit, and RSVP to events
* 💬 **Email Alerts** – Integrated with Nodemailer to notify users about new or updated events
* 🌐 **Responsive UI** – React and Framer Motion ensure smooth animations and mobile responsiveness
* ⚙️ **Database Integration** – PostgreSQL powers the backend for secure, persistent storage
* 🔒 **Environment-based Config** – dotenv for managing sensitive variables securely
* 📱 **Progressive Web App (PWA)** – Installable on mobile and desktop with offline capabilities
* 🔔 **Push Notifications** – Real-time alerts for upcoming or updated events
* 📊 **Analytics** – Visual insights for users and clubs to track engagement and participation

---

## 🧰 Tech Stack

| Layer                   | Technology                                                                   |
| ----------------------- | ---------------------------------------------------------------------------- |
| **Frontend**            | React, React Router DOM, Axios, Framer Motion, Lucide React, React Hot Toast |
| **Backend**             | Node.js, Express.js, Socket.IO, Express Validator                            |
| **Database**            | PostgreSQL                                                                   |
| **Security**            | bcrypt, JWT (jsonwebtoken), CORS                                             |
| **Email/Notifications** | Nodemailer, Web Push                                                         |
| **Dev Tools**           | Nodemon, dotenv, Vite                                                        |

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

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 📡 API Overview

| Endpoint              | Method | Description         |
| --------------------- | ------ | ------------------- |
| `/api/users/register` | POST   | Register a new user |
| `/api/users/login`    | POST   | Authenticate user   |
| `/api/events`         | GET    | Get all events      |
| `/api/events`         | POST   | Create a new event  |
| `/api/rsvp`           | POST   | RSVP to an event    |

*(Endpoints may vary depending on your final route structure.)*

---

## 🧠 Usage Guide

1. **Sign Up / Log In:** Create an account or log in using your credentials.
2. **Explore Events:** Browse through available events or search by category.
3. **RSVP:** Register your interest and view confirmation in real time.
4. **Notifications:** Receive instant updates for new or modified events.
5. **Clubs:** Manage your own events and monitor analytics for engagement.

---

## 🛠️ Development Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `npm run dev` | Run in development mode        |
| `npm start`   | Run in production mode         |
| `npm test`    | Run unit tests (if configured) |

---

## 🧩 Environment Variables

| Variable                    | Description                     |
| --------------------------- | ------------------------------- |
| `PORT`                      | Backend server port             |
| `DATABASE_URL`              | PostgreSQL connection string    |
| `JWT_SECRET`                | Secret key for token encryption |
| `EMAIL_USER` / `EMAIL_PASS` | Credentials for Nodemailer      |

---

## 🌟 Vision & Future Enhancements

Vibevent is already equipped with PWA support, push notifications, and analytics features for both users and clubs.
The next steps for development focus on expanding functionality and improving control across the platform.

### Planned Features:

* 🧑‍💼 **Admin Dashboard** to manage users, clubs, and platform-wide activities
* 🗓️ **Calendar Integration** to view and manage events in a monthly or weekly format
* 🧩 **Role-Based Access Control** to distinguish between admins, clubs, and regular users

These upcoming additions will enhance platform scalability and streamline event management at every level.

---

## 🤝 Contributing

Contributions are welcome.
To contribute:

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Open a pull request

---

## 👨‍💻 Author

**Marco Bitar**
🎓 Computer Science Student
📧 [bitar.marco21@gmail.com](mailto:bitar.marco21@gmail.com)
🌐 [GitHub](https://github.com/MarcoBitar) | [LinkedIn](https://www.linkedin.com/in/marco-bitar-545046285)

---

Would you like me to include your `.gitignore` file right below this (so you can copy both in one go)?
