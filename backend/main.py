from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = FastAPI()

# Allow the React frontend to talk to the Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = "tiktok-creative-center-api.p.rapidapi.com"

@app.get("/")
def read_root():
    return {"status": "online"}

@app.get("/search")
def search_tiktok_trends(query: str, region: str = "AU", goal: str = "Reach"):
    """
    Search for trending hashtags, music, and creator search insights.
    """
    if not RAPIDAPI_KEY:
        raise HTTPException(status_code=500, detail="RapidAPI Key missing in .env")

    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST
    }

    # 1. Fetch Trending Hashtags (Region-specific)
    hashtag_url = f"https://{RAPIDAPI_HOST}/api/trending/hashtag/list"
    hashtag_params = {"region": region, "page": 1, "limit": 20}
    
    # 2. Fetch Trending Music
    music_url = f"https://{RAPIDAPI_HOST}/api/trending/commercial-music-library/playlist/detail"
    music_params = {"region": region, "playlist_id": "6929526806429469442", "limit": 10}

    # 3. Creator Search Insights (Simulated based on Topic & Goal)
    # In a full version, this would pull from a Keyword Research API
    search_insights = [
        f"how to {query}",
        f"{query} for beginners",
        f"best {query} 2026",
        f"{query} routine",
        f"{query} hacks",
        f"why {query} is trending",
        f"{query} transformation",
        f"{query} review",
        f"top 10 {query}",
        f"{query} mistakes to avoid"
    ]

    try:
        h_res = requests.get(hashtag_url, headers=headers, params=hashtag_params)
        m_res = requests.get(music_url, headers=headers, params=music_params)
        
        return {
            "hashtags": h_res.json().get("data", {}).get("list", []),
            "music": m_res.json().get("data", {}).get("list", []),
            "search_insights": search_insights
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
