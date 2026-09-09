# Explore Jharkhand - API Documentation (SIH25032)

## Base URL
- Local: `http://localhost:5000/api`
- Production: `https://explore-jharkhand-api.onrender.com/api`

---

## 1. Authentication Endpoints (`/api/auth`)

### POST `/api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Priya Sharma",
    "email": "priya@gmail.com",
    "password": "password123",
    "role": "tourist",
    "phone": "+919876543210"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Account created successfully!",
    "token": "<JWT_TOKEN>",
    "user": { "id": 3, "name": "Priya Sharma", "email": "priya@gmail.com", "role": "tourist" }
  }
  ```

### POST `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "admin@jharkhand.gov.in",
    "password": "password123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "token": "<JWT_TOKEN>",
    "user": { "id": 1, "name": "Admin Explorer", "email": "admin@jharkhand.gov.in", "role": "admin" }
  }
  ```

---

## 2. Destinations Endpoints (`/api/destinations`)

### GET `/api/destinations`
- **Query Parameters**:
  - `category` (optional): `waterfall` | `wildlife` | `temple` | `festival` | `food` | `adventure`
  - `district` (optional): `Ranchi` | `Deoghar` | `Palamu` | `Ramgarh`
  - `search` (optional): Text search query
  - `sort` (optional): `rating` | `price`
- **Response**: Array of destination objects.

### GET `/api/destinations/:id`
- Returns destination details along with associated user reviews.

### POST `/api/destinations` (Protected, Admin Only)
- Creates new destination in MySQL database with optional image upload.

---

## 3. Smart Trip Planner (`/api/planner`)

### POST `/api/planner/generate`
- **Request Body**:
  ```json
  {
    "budget": 6000,
    "days": 3,
    "startLocation": "Ranchi",
    "interests": ["waterfall", "wildlife", "temple", "adventure"]
  }
  ```
- **Response**: Day-by-day itinerary, budget allocation, packing checklist, route highlights.

---

## 4. Live Weather API (`/api/weather`)

### GET `/api/weather`
- **Query Parameters**: `city` (e.g. `Ranchi`, `Deoghar`) or `lat`/`lng`
- **Response**: Live temperature, humidity, rain chance, wind speed, sunrise/sunset, travel advisory.

---

## 5. Google Places & Navigation (`/api/places`)

### GET `/api/places/nearby`
- **Query Parameters**: `lat`, `lng`, `type` (`lodging`, `restaurant`, `hospital`, `police`, `gas_station`, `train_station`, `bus_station`)

### GET `/api/places/route`
- **Query Parameters**: `originLat`, `originLng`, `destLat`, `destLng`
- **Response**: Distance text, duration text, ETA calculation.
