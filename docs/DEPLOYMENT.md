# Explore Jharkhand - Deployment Guide

## Deployment Stack
- **Frontend**: Vercel
- **Backend**: Render / Railway
- **Database**: Railway MySQL / PlanetScale / AWS RDS

---

## 1. Deploying Frontend to Vercel

1. Push code to GitHub repository.
2. Log into [Vercel Dashboard](https://vercel.com).
3. Import project repository and select `client` directory as root.
4. Set Build Command: `npm run build`
5. Set Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps Key
   - `VITE_OPENWEATHER_API_KEY`: Your OpenWeather Key

---

## 2. Deploying Backend to Render / Railway

1. Create a Web Service on Render/Railway using the `server` directory.
2. Set Build Command: `npm install`
3. Set Start Command: `node index.js`
4. Configure Environment Variables:
   - `PORT`: `5000`
   - `DB_HOST`: Your MySQL host
   - `DB_USER`: Your MySQL user
   - `DB_PASSWORD`: Your MySQL password
   - `DB_NAME`: `explore_jharkhand`
   - `JWT_SECRET`: Random 256-bit secret string
   - `GOOGLE_MAPS_API_KEY`: Google Maps Key
   - `OPENWEATHER_API_KEY`: OpenWeather Key

---

## 3. Database Initialization

Execute `database/schema.sql` and `database/seed.sql` on your production MySQL instance.
