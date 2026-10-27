# 🅿️ ParkIt

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![NodeJS](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0-6BA539?style=flat&logo=openapi-initiative&logoColor=white)](./swagger.yaml)

A retro-themed parking slot booking application built with React, Node.js, and PostgreSQL.

## 🚀 Deliverables
- **Source Code**: [Amrit-04/Modex-Assignment](https://github.com/Amrit-04/Modex-Assignment)
- **API Documentation**: [swagger.yaml](./swagger.yaml) (OpenAPI 3.0)
- **Technical Report**: [TECHNICAL_WRITEUP.md](./TECHNICAL_WRITEUP.md)

## 🛠 Features
- **Real-time Locations**: View parking lots with live availability counters.
- **Instant Booking**: Book specific time slots with immediate feedback.
- **Concurrency Safety**: Prevents double-booking using PostgreSQL transactions.
- **Retro UI**: 80s arcade style aesthetics using "Press Start 2P" font and neon effects.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)

### 1. Database Setup
Create a database named `parkit`.
```bash
# In psql terminal:
CREATE DATABASE parkit;
```

Run the schema and seed scripts:
```bash
cd backend
# Install dependencies
npm install
# Create tables and seed data
npx ts-node scripts/applySchema.ts
npx ts-node scripts/seed.ts
```

### 2. Backend Setup
Create a `.env` file in `backend/` (see `.env.example`).
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/parkit
PORT=5000
```

Start the server:
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
App will run on `http://localhost:3000` (or 3001/3002 if 3000 is busy).

## 📡 API Reference
See `swagger.yaml` for full details. 
- `GET /api/locations`: List locations + stats.
- `GET /api/slots/:id`: List slots.
- `POST /api/bookings`: Book a slot.

## ☁️ Deployment Guide

### Database (Render/Railway)
1.  Create a PostgreSQL database on a provider like Render or Railway.
2.  Copy the external `DATABASE_URL`.
3.  Connect via local terminal and run the local `scripts/applySchema.ts` logic manually (or use a DB management tool like DBeaver) to create tables.

### Backend (Render/Heroku/Vercel)
1.  Push code to GitHub.
2.  Connect repository to hosting provider.
3.  Set Environment Variable `DATABASE_URL` to your cloud DB URL.
4.  Build Command: `npm install && npm run build`.
5.  Start Command: `node dist/index.js`.

### Frontend (Vercel/Netlify)
1.  Connect repository.
2.  Set Build Command: `npm run build`.
3.  Set Output Directory: `build`.
4.  **Important**: Set up a proxy rewrite or configure the React app to point to your deployed Backend URL instead of `localhost`.
