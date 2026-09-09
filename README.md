# Explore Jharkhand - Smart Tourism Platform (SIH2025 • SIH25032)

![Explore Jharkhand Banner](https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80)

Explore Jharkhand is a production-quality, full-stack smart tourism web application built for **Smart India Hackathon 2025 (Problem Statement: SIH25032)**. It showcases Jharkhand's famous waterfalls, wildlife reserves, sacred temples, tribal festivals, local delicacies, and hill valleys with real-time Google Maps, live OpenWeather forecasts, JWT authentication, algorithmic trip planner, and normalized MySQL database.

---

## 🌟 Key Features

1. **Ultra-Premium UI/UX Design**: Inspired by Airbnb, Incredible India, and Booking.com. Built with Glassmorphism, Green & Blue theme, Dark Mode support, and smooth Framer Motion page transitions.
2. **Real API Integrations & Resilient Fallbacks**:
   - **Google Maps JavaScript API**: Live maps, marker clustering, and custom pin popups.
   - **Google Places API**: Real-time nearby hotels, restaurants, hospitals, police stations, fuel stations, railway stations, and bus stands.
   - **Google Distance Matrix API**: Driving distance and ETA travel time calculation.
   - **OpenWeather API**: Current temp, humidity, wind, rain chance, and travel advisories with auto-refresh.
   - **Browser Geolocation API**: Pinpoint user's current GPS location.
   - **Browser Notification API**: Instant desktop notifications for booking confirmations and weather alerts.
3. **Role-Based Access Control (RBAC)**:
   - **Tourist**: Register, login, browse destinations, interactive maps, save wishlist, post reviews with photos, book certified guides/homestays, generate smart itineraries.
   - **Admin**: Dashboard metrics, total users, add/edit/delete destinations, manage user accounts.
4. **Algorithmic Smart Trip Planner**: Custom backend algorithm taking budget, duration (days), starting city, and interests to generate day-by-day itineraries, exact cost breakdowns, optimal driving routes, and packing advice.
5. **Real-time Notifications**: Socket.IO event emission for live booking confirmations and community review additions.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios, Leaflet / Google Maps API, React Icons.
- **Backend**: Node.js, Express.js, JWT, bcryptjs, Multer, Socket.IO, Express Validator, Helmet, Morgan, MySQL2.
- **Database**: MySQL (Normalized schema with PKs, FKs, CASCADE ON DELETE, indexes, comprehensive seed data).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MySQL Server (Optional - app includes instant in-memory fallback if local MySQL is not running)

### Installation

1. **Clone & Install Dependencies**:
   ```bash
   npm run install-all
   ```

2. **Setup Environment Variables**:
   Copy `.env.example` to `.env` in both root and `server/`:
   ```bash
   cp .env.example .env
   ```

3. **Initialize MySQL Database (Optional)**:
   Import `database/schema.sql` and `database/seed.sql` into your MySQL instance:
   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p < database/seed.sql
   ```

4. **Launch Application in Development Mode**:
   ```bash
   npm run dev
   ```
   - Client App: `http://localhost:5173`
   - Server API: `http://localhost:5000`

---

## 🔑 Demo Account Credentials

- **Tourist Account**:
  - Email: `aarav@gmail.com`
  - Password: `password123`

- **Admin Account**:
  - Email: `admin@jharkhand.gov.in`
  - Password: `password123`

---

## 📁 Project Structure

```
Explore-Jharkhand/
├── client/              # React + Vite + Tailwind CSS Frontend
├── server/              # Node.js + Express REST API & Socket.IO
├── database/            # MySQL schema.sql & seed.sql
├── docs/                # API_DOCUMENTATION.md & DEPLOYMENT.md
├── .env.example
└── package.json
```

---

## 📜 License
Developed for Smart India Hackathon 2025 (SIH25032) under MIT License.
