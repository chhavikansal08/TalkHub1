# 🚀 TalkHub

TalkHub is a **full-stack real-time chat application** built with **Java Spring Boot** on the backend and **React + Vite** on the frontend.

It provides a **modern, responsive interface** with **instant messaging powered by WebSockets** and **persistent chat history with MongoDB**.

---

## ✨ Features

- 🔴 **Real-time Messaging** → instant delivery with WebSockets
- 🏠 **Room Management** → create and join chat rooms seamlessly
- ⚡ **RESTful APIs** → backend endpoints for managing rooms and messages
- 📱 **Responsive UI** → built with Tailwind CSS for all devices
- 🗄️ **Persistent Storage** → chat history stored in MongoDB
- 🔐 **Scalable Architecture** → designed to handle multiple rooms and users

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (with Vite for fast builds)
- 🎨 Tailwind CSS (UI styling)

### Backend
- ☕ Java 21
- 🌱 Spring Boot

### Database
- 🍃 MongoDB (chat storage & room persistence)

---

## 🔄 Workflow

1. The **User interacts** with the **Frontend (React + Vite)**.
2. Frontend communicates with the **Backend (Spring Boot)** through **REST APIs** for:
   - Creating/joining rooms
   - Fetching chat history
3. For **real-time chat**, the frontend connects to the **WebSocket server**, enabling instant message delivery.
4. The **Backend** manages chat logic and persists messages in **MongoDB**.
5. On reload, the **Frontend retrieves chat history** from MongoDB via backend APIs.

---

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Node.js 18+
- MongoDB
- Maven

#### 1. Clone the Repository
```bash
git clone https://github.com/chhavikansal08/TalkHub1.git
cd TalkHub1
```

#### 2. Start the backend
```bash
cd chat-app-backend
./mvnw spring-boot:run
```

#### 3. Start the frontend
```bash
cd chat-app-frontend
npm install
npm run dev
```


## Usage
- Enter a username and join or create a chat room
- Start chatting in real time
- Messages are stored and visible to all room members


## ⭐ Acknowledgments

- Built with ❤️ using Spring Boot + React
- Inspired by the need for real-time, scalable chat applications

---

## 📞 Support

If you like this project, please consider giving it a ⭐ on GitHub!

For questions or support, please open an issue in the GitHub repository.
