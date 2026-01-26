# 🎥 Meetly - Seamless Video Conferencing

Meetly is a modern, high-performance video conferencing platform designed for instant connectivity. Whether you're a registered user or a guest, Meetly makes it simple to create, join, and manage meetings with professional-grade features like screen sharing and real-time chat.

🚀 **[Live Demo](https://meetly-ip4r.vercel.app/)**

---

## ✨ Features

- **⚡ Dual Entry Modes**: 
    - **Guest Access**: Join meetings instantly by just entering a meeting code and a username.
    - **Registered Users**: Create an account to unlock the full power of the platform.
- **📅 Meeting Management**: 
    - Create instant meetings and get a unique shareable code.
    - Join existing meetings seamlessly.
- **💻 Collaborative Tools**:
    - **High-Quality Video/Audio**: Crystal clear communication.
    - **Screen Sharing**: Present your screen to participants with one click.
    - **Real-time Chat**: Send messages to participants during the call.
- **📜 Meeting History**: (Exclusive for registered users) Keep track of all your past meetings and sessions.
- **📱 Responsive Design**: Works beautifully across desktops, tablets, and mobile devices.

---

## 🛠️ Built With

- **Frontend**: React.js / Next.js (Tailwind CSS)
- **Backend**: Node.js / Express.js
- **Real-time Communication**: WebRTC / Socket.io
- **Database**: MongoDB (or your specific DB)
- **Deployment**: Vercel

---

## 🚀 Getting Started

This project is divided into two parts: **Frontend** and **Backend**. You will need to install dependencies in both folders.

### Prerequisites
* Node.js & npm installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/meetly.git](https://github.com/your-username/meetly.git)
   cd meetly

2. **Setup Backend**
   ```bash
   cd backend/src
    npm install
    Create a .env file and add your variables
    npm install -g nodemon  # If not already installed
    nodemon app.js

3. **Setup Frontend**
    ```bash
    Open a new terminal window
    cd frontend
    npm install
    Create a .env.local file and add your frontend variables
    npm run dev

## 📖 How to Use


### 👤 For Guests
> Quick and easy access without an account.
* **Select Join as Guest** on the landing page.
* **Enter the Meeting Code** provided by the host.
* **Choose a Username** and click the join button to enter the room.

---

### 🔐 For Registered Users
> Unlock full features and meeting management.
* **Sign Up/Login** to access your personalized dashboard.
* **Create Meeting**: Generate a unique room ID that you can share with others.
* **Join Meeting**: Enter an existing room ID to jump straight into a call.
* **History**: View your previous sessions and meeting logs anytime under the **History** tab.


