# TaleWeaver

TaleWeaver is a collaborative, chat-based role‑playing platform built to make finding and writing stories with others fast, focused, and enjoyable. Instead of overwhelming users with bloated profiles and complex systems, TaleWeaver emphasizes simplicity: post an ad, connect with another writer, and start writing.

This repository is a **monorepo** containing both the backend and frontend applications. It uses Nest.js, React, Tailwind CSS, and Socket.IO to support real-time, chat-based collaborative storytelling, while maintaining a clean separation of concerns and long-term sca

---

## What Is TaleWeaver?

TaleWeaver is designed to make collaborative role‑playing simple and efficient.

Unlike traditional role‑play sites that can feel cluttered or intimidating, TaleWeaver focuses on what matters most:

- Quickly connecting you with other storytellers
- Letting conversations turn into stories naturally
- Keeping the interface clean, modern, and distraction‑free

Users can post role‑play ads with minimal friction—no lengthy profiles or mandatory character sheets. Just describe what you’re looking for, wait for replies, and begin writing together in a real‑time chat environment.

---

## Core Philosophy

- **Chat‑first storytelling** – Stories unfold organically through conversation
- **Low friction** – Minimal setup before you can start role‑playing
- **Optional depth** – Support for character bios and planning without forcing them
- **Modern UX** – Clean UI built with modern web tooling

---

## Tech Stack

This project uses a modern TypeScript‑first stack and is organized as a monorepo.

### Backend

- **NestJS** – Scalable Node.js framework
- **Socket.IO** – Real‑time chat and events
- **REST + WebSockets** – Hybrid API design

### Frontend

- **React** – UI framework
- **Vite** – Fast development and build tooling
- **Tailwind CSS** – Utility‑first styling

### Tooling

- **TurboRepo** – Task orchestration and caching
- **Single lockfile** – Consistent dependency resolution

---

## Repository Structure

```
.
├── apps/
│   ├── backend/          # NestJS backend application
│   └── frontend/         # React + Vite + Tailwind frontend
├── packages/             # Optional shared packages (empty by default)
├── package.json          # Root workspace + Turbo configuration
├── package-lock.json     # Single lockfile for the entire monorepo
├── turbo.json            # Turbo task pipeline
└── README.md
```

---

## Features (Current & Planned)

- Role‑play ad creation and discovery
- One‑on‑one role‑play chats (DMs)
- Real‑time messaging via WebSockets
- Optional character bios per role‑play

Planned features may include:

- Multiple characters per user
- Character reuse across chats
- Advanced filtering for role‑play ads

---

## Development Status

TaleWeaver is currently under active development. The architecture is being designed with long‑term scalability in mind, prioritizing clean boundaries between domain logic, transport layers, and UI concerns.

This repository is intended for experimentation, iteration, and growth as features evolve.

If you’re interested in collaborative storytelling, real‑time writing, or building modern full‑stack applications, TaleWeaver aims to be a thoughtful and flexible foundation.

Check out the [Tale Weaver](https://story-roleplay-app-frontend.vercel.app/updates-changelog) website for bug reports, upcoming features, and a changelog.

---

## Deployment

TaleWeaver is deployed using a split hosting strategy that aligns with the architectural needs of each part of the application.

- **Frontend** – The React frontend is hosted on **Vercel**, which provides fast, globally distributed static delivery, automatic builds on every push, and seamless CI/CD. This makes it ideal for serving the UI layer with minimal operational overhead while ensuring users always receive the latest version of the app.

- **Backend** – The NestJS backend is deployed on **Render**. Render was chosen specifically because TaleWeaver relies on **Socket.IO** for real-time, persistent WebSocket connections. Platforms like Vercel are designed around **serverless, stateless functions**, which do not support long-lived WebSocket connections required by Socket.IO. Because of this limitation, running the backend on Vercel would break real-time chat functionality. Render, by contrast, provides a traditional Node.js runtime with persistent processes, making it well-suited for WebSocket-based applications.

To mitigate Render’s free-tier behavior of suspending inactive services, a **cron job is configured to ping the backend every 10 minutes**. This periodic request keeps the server instance warm and prevents cold starts that would otherwise introduce noticeable delays when users send their first message after inactivity. This ensures a smoother real-time chat experience while keeping hosting costs low.

---

Here’s a clean, production-ready **README “Environment Variables” section** with all sensitive values replaced by safe placeholders and clear explanations.

---

## Environment Variables

This project requires environment variables for both the frontend and backend. Create separate `.env` files in each respective directory.

---

### Frontend (`apps/frontend/.env`)

```env
VITE_BACKEND_BASE_URL=http://localhost:3000

# Firebase (Client SDK)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Notes

- These variables are used by the frontend (Vite).
- Firebase values come from your Firebase project settings.
- `VITE_` prefix is required for variables to be exposed in Vite.

### Backend (`apps/backend/.env`)

```env
# App URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000

# Server
PORT=3000
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=604800000 # (in ms, e.g. 7 days)

# Database
MONGO_URI=your_mongodb_connection_string

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_SENDER_EMAIL=your_sender_email
RECEIVER_EMAIL=your_receiver_email

# Firebase Admin SDK
FIREBASE_SERVICE_ACCOUNT='{
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "your_client_email",
  "client_id": "your_client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your_cert_url",
  "universe_domain": "googleapis.com"
}'
```
