# TikTok Real-Time Analyzer & Posting Optimizer

A personal tool to identify real-time TikTok trends (hashtags, sounds, keywords) and determine optimal posting times.

## Setup Instructions

### 1. RapidAPI Key (for Broad Trends)
- Sign up at [RapidAPI](https://rapidapi.com/).
- Search for "TikTok Creative Center API" (e.g., [this one](https://rapidapi.com/search/tiktok%20creative%20center)).
- Subscribe to a tier (many have a free tier for 50-100 requests/month).
- Copy your `X-RapidAPI-Key`.

### 2. TikTok Developer App (for Personal Account Metrics)
- Go to the [TikTok for Developers](https://developers.tiktok.com/) portal.
- Create a new App.
- Set up the **Display API**.
- You will need to provide a "Redirect URI" (e.g., `http://localhost:8000/auth/callback`).
- Once approved, copy your `Client Key` and `Client Secret`.

### 3. Local Configuration
- Create a `.env` file in the `backend` directory with the following:
  ```env
  RAPIDAPI_KEY=your_rapidapi_key_here
  TIKTOK_CLIENT_KEY=your_tiktok_client_key_here
  TIKTOK_CLIENT_SECRET=your_tiktok_client_secret_here
  REDIRECT_URI=http://localhost:8000/auth/callback
  ```

## Running the Project

### Backend
1. Navigate to `backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run the server: `uvicorn main:app --reload`.

### Frontend
1. Navigate to `frontend`.
2. Install dependencies: `npm install`.
3. Start the app: `npm start`.
