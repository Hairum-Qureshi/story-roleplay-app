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

--

## Deployment

TaleWeaver is deployed using modern hosting platforms for simplicity and scalability:

- **Frontend** – The React frontend is hosted on **Vercel**, providing fast, globally distributed delivery with automatic builds and updates on every push to the repository. Users always get the latest version of the UI without manual deployment steps.

- **Backend** – The NestJS backend runs on **Render**, which provides easy deployment of Node.js applications with built-in HTTPS and automatic scaling. Since Render may put inactive instances to sleep to save resources, the backend server might need to **wake up** if it hasn’t been accessed recently. This can cause a slight delay (usually a few seconds) for the first request after a period of inactivity.

This setup ensures that TaleWeaver remains accessible and performant while keeping deployment and maintenance straightforward.
