# Roadmap: "the tiktok signal" - Data-Driven Creator Tool

## 1. Objective
Build a high-performance, minimalist dashboard for TikTok creators. The tool focuses on real-time data retrieval from TikTok's official and authorized APIs to identify trends and optimize posting schedules without external AI or database dependencies.

## 2. Core Features (Data-Only)

### A. Real-Time Trend Analyzer
*   **Search-Driven Trends:** Enter a topic (e.g., "skincare") to fetch the top 10-20 trending hashtags and sounds currently viral in a specific region (AU/Global).
*   **Engagement Benchmarks:** Calculate the average views and likes for the top videos in that topic to show the "difficulty" or "potential" of the niche.
*   **Keyword Extraction:** Analyze the captions of trending videos to show which words (SEO keywords) appear most frequently.
*   **Copy-to-Clipboard:** One-click button to copy the trending hashtags for immediate use in a TikTok caption.

### B. Post-Timing & Analytics (OAuth Required)
*   **Peak Window Analysis:** Fetch the user's last 20 videos via the TikTok Display API.
*   **Engagement Heatmap:** Correlate `create_time` with `view_count` and `like_count` to visualize when the user's specific audience is most active.
*   **Countdown Timer:** A simple "Don't Post Yet" / "Post Now!" indicator based on the identified peak windows in Brisbane local time.

### C. Visual Feed for Inspiration
*   **Trending Feed:** A clean grid of the top trending video thumbnails/links for the searched topic, acting as a raw mood board.

## 3. UI/UX Specifications
*   **Theme:** Deep Black Background (`#000000`) with high-contrast text (`#FFFFFF`).
*   **Accents:** TikTok Pink (`#fe2c55`) and TikTok Cyan (`#25f4ee`).
*   **Layout:** Minimalist, card-based design with zero clutter. Focus on one clear search action and immediate data results.

## 4. Technical Requirements
*   **Frontend:** React (TypeScript) + Lucide Icons + Recharts (for the timing heatmap).
*   **Backend:** FastAPI (Python) to proxy requests to RapidAPI and TikTok Display API.
*   **State:** Local React state only (data is "live" and refreshes on search; no permanent storage).

## 5. Next Steps
1.  Finalize the "Black & Neon" minimalist UI design.
2.  Connect the Search bar to the live RapidAPI "Trending Music" and "Hashtag" endpoints.
3.  Implement the Posting Time heatmap logic using live video metadata.
