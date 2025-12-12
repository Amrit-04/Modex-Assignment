# ParkIt: Technical Implementation Report

## 1. Project Overview
ParkIt is a full-stack parking slot booking application designed with a retro 80s aesthetics. It allows users to view parking locations, check real-time availability, and book slots instantly. The system ensures data integrity during concurrent booking attempts.

## 2. Architecture

### Frontend
- **Framework**: React.js (TypeScript)
- **State Management**: React Hooks (`useState`, `useEffect`) and Context API.
- **Styling**: Custom CSS with "Press Start 2P" font, CRT scanline effects, and neon color palette.
- **Routing**: `react-router-dom` for client-side navigation.

### Backend
- **Runtime**: Node.js with Express.js.
- **Database Interface**: `pg` (node-postgres) for direct SQL execution.
- **Pattern**: MVC (Model-View-Controller) architecture for separation of concerns.

### Database
- **System**: PostgreSQL.
- **Schema**: Relational model with `locations`, `slots`, and `bookings` tables.
- **Concurrency Control**: pessimistic locking via `SELECT ... FOR UPDATE` to prevent race conditions.

## 3. Key Design Decisions

### Concurrency Handling
To prevent double-booking (two users booking the same slot simultaneously), we implemented database-level transactions:
1. Start Transaction (`BEGIN`).
2. Lock the specific slot row (`SELECT FOR UPDATE`).
3. Check availability.
4. If available, Insert Booking and Update Slot status.
5. Commit Transaction (`COMMIT`).
This guarantees ACID compliance and booking reliability.

### Retro UI/UX
The design departs from standard Material/Bootstrap looks to offer a unique user experience:
- **Visuals**: High-contrast neon on black, grid layouts, and pixel fonts.
- **Feedback**: Immediate "PROCESSING..." -> "CONFIRMED" states to mimic arcade game responsiveness.

## 4. Challenges & Solutions
- **Real-time Availability**: Initially, the app didn't show aggregate counts. We optimized the SQL query in `locationController` to perform a `JOIN` and `GROUP BY` operation, allowing us to fetch location details + available slot counts in a single efficient query.

## 5. Future Improvements
- **WebSockets**: To push real-time updates to all clients when a slot is booked.
- **Authentication**: Implementing JWT-based auth for user accounts.
- **Payment Gateway**: Integrating Stripe for paid bookings.
