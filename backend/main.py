from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import requests
import pandas as pd
import duckdb

load_dotenv()

app = FastAPI()

# RapidAPI Configuration
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = "tiktok-creative-center-api.p.rapidapi.com"

@app.get("/")
def read_root():
    return {"message": "TikTok Analyzer API is running!"}

@app.get("/trends/hashtags")
def get_trending_hashtags(region: str = "AU"):
    """
    Fetch trending hashtags from RapidAPI (TikTok Creative Center).
    """
    if not RAPIDAPI_KEY:
        raise HTTPException(status_code=500, detail="RAPIDAPI_KEY not configured")
    
    url = f"https://{RAPIDAPI_HOST}/trending/hashtag"
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }
    params = {"region": region}
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/trends/music")
def get_trending_music(region: str = "US", playlist_id: str = "6929526806429469442"):
    """
    Fetch trending music from the Commercial Music Library.
    """
    if not RAPIDAPI_KEY:
        raise HTTPException(status_code=500, detail="RAPIDAPI_KEY not configured")
    
    url = "https://tiktok-creative-center-api.p.rapidapi.com/api/trending/commercial-music-library/playlist/detail"
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
        "Content-Type": "application/json"
    }
    params = {
        "playlist_id": playlist_id,
        "region": region,
        "page": 1,
        "limit": 20
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/best-time")
def calculate_best_time():
    """
    Placeholder for best time to post analysis using personal account data.
    """
    # In Phase 2/3, we will fetch data from TikTok Display API and analyze with pandas.
    return {"message": "Analysis pending account connection."}
