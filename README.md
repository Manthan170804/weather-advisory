# Farmer Weather Advisory System (MERN Stack)

A full-stack MERN application that provides real-time weather information and farmer-friendly crop advisory.

## Features
- Real-time weather data
- Temperature trend chart
- PDF advisory report
- MongoDB storage
- Responsive UI

## Installation

### Backend
```
cd backend
npm install
```

Create `.env`:
```
PORT=5000
OWM_KEY=your_api_key
MONGO_URI=your_mongo_uri
```

Run backend:
```
npm start
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## API Setup
Set baseURL in `frontend/src/services/api.js`:
```
baseURL: "http://localhost:5000"
```

## MongoDB Setup
- Add IP `0.0.0.0/0`
- Create DB user
- Paste connection string in `.env`

## OpenWeatherMap Setup
Add API key in `.env`.

## Usage
- Enter city name
- View weather + advisory
- Download PDF
- View temperature chart

## Project Structure
See README for details.
