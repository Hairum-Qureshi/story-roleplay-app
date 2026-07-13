# TaleWeaver

TaleWeaver is a collaborative, chat-based role-playing platform built to make finding and writing stories with others fast, focused, and enjoyable. Instead of overwhelming users with bloated profiles and complex systems, TaleWeaver emphasizes simplicity: post an ad, connect with another writer, and start writing.

This repository is a **monorepo** containing both the backend and frontend applications. It uses NestJS, React, Tailwind CSS, and Socket.IO to support real-time, chat-based collaborative storytelling while maintaining a clean separation of concerns and long-term scalability.

---

# What Is TaleWeaver?

TaleWeaver is designed to make collaborative role-playing simple and efficient.

Unlike traditional role-play sites that can feel cluttered or intimidating, TaleWeaver focuses on what matters most:

- Quickly connecting you with other storytellers
- Letting conversations turn into stories naturally
- Keeping the interface clean, modern, and distraction-free

Users can post role-play ads with minimal friction—no lengthy profiles or mandatory character sheets. Just describe what you're looking for, wait for replies, and begin writing together in a real-time chat environment.

---

# Core Philosophy

- **Chat-first storytelling** – Stories unfold organically through conversation
- **Low friction** – Minimal setup before you can start role-playing
- **Optional depth** – Support for character bios and planning without forcing them
- **Modern UX** – Clean UI built with modern web tooling

---

# Tech Stack

This project uses a modern TypeScript-first stack and is organized as a monorepo.

## Backend

- **NestJS** – Scalable Node.js framework
- **Socket.IO** – Real-time chat and events
- **REST + WebSockets** – Hybrid API design

## Frontend

- **React**
- **Vite**
- **Tailwind CSS**

## Tooling

- **TurboRepo** – Task orchestration and caching
- **Single lockfile** – Consistent dependency resolution

---

# Repository Structure

```text
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

# Features (Current & Planned)

Current features:

- Role-play ad creation and discovery
- One-on-one role-play chats (DMs)
- Real-time messaging via WebSockets
- Optional character bios per role-play

Planned features:

- Multiple characters per user
- Character reuse across chats
- Advanced filtering for role-play ads

---

# Development Status

TaleWeaver is currently under active development. The architecture is being designed with long-term scalability in mind, prioritizing clean boundaries between domain logic, transport layers, and UI concerns.

This repository is intended for experimentation, iteration, and growth as features evolve.

If you're interested in collaborative storytelling, real-time writing, or building modern full-stack applications, TaleWeaver aims to be a thoughtful and flexible foundation.

Check out the **TaleWeaver** website for bug reports, upcoming features, and a changelog:

https://story-roleplay-app-frontend.vercel.app/updates-changelog

---

# Deployment

TaleWeaver is deployed using a split hosting strategy that aligns with the architectural needs of each part of the application.

### Frontend

The React frontend is hosted on **Vercel**, which provides fast, globally distributed static hosting, automatic deployments on every push, and seamless CI/CD.

### Backend

The NestJS backend is hosted on **Render** because TaleWeaver relies on **Socket.IO** for persistent WebSocket connections. Platforms like Vercel are built around serverless functions, which are not suitable for long-lived WebSocket connections. Render provides a traditional Node.js runtime capable of maintaining persistent connections required for real-time messaging.

To avoid cold starts on Render's free tier, a cron job periodically pings the backend every 10 minutes to keep the service warm and responsive.

---

# Environment Variables

Create separate `.env` files for both the frontend and backend.

---

## Frontend (`apps/frontend/.env`)

```env
VITE_BACKEND_BASE_URL=http://localhost:3000

# Google OAuth
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
```

### Notes

- `VITE_BACKEND_BASE_URL` should point to your backend API.
- `VITE_GOOGLE_OAUTH_CLIENT_ID` is the OAuth Client ID from your Google Cloud project.
- Environment variables exposed to the frontend must begin with the `VITE_` prefix.

---

## Backend (`apps/backend/.env`)

```env
# App URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000

# Server
PORT=3000
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=604800000 # 7 days (milliseconds)

# Database
MONGO_URI=your_mongodb_connection_string

# Google OAuth
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_SENDER_EMAIL=your_sender_email
RECEIVER_EMAIL=your_receiver_email
```

---

# Google OAuth Setup

TaleWeaver uses **Google OAuth 2.0** for Google sign-in.

To configure it:

1. Create a project in the **Google Cloud Console**.
2. Enable the **Google Identity / OAuth** APIs if prompted.
3. Configure the **OAuth consent screen**.
4. Create an **OAuth 2.0 Client ID**.
5. Add your development and production origins and redirect URIs as needed.
6. Copy the generated:
   - **Client ID**
   - **Client Secret**

Use these values for:

- **Frontend**
  - `VITE_GOOGLE_OAUTH_CLIENT_ID`

- **Backend**
  - `GOOGLE_OAUTH_CLIENT_ID`
  - `GOOGLE_OAUTH_CLIENT_SECRET`

These credentials allow the frontend to initiate Google sign-in and the backend to securely verify OAuth authentication.
