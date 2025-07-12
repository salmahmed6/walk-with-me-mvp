# Walk With Me 

## Overview
Walk with me is a mobile application designed to motivate users to walk, either alone or with friends, while enjoying podcasts or Quran recitations. The app tracks location, time, and distance, rewarding users with coins and unlocking features through a leveling system.

## MVP Scope
- Authentication (Google, Twitter, email).
- Walk setup by time or distance.
- Walk alone with podcast/Quran (Arabic/English).
- Walk with a friend (chat + shared media).
- Real-time map with avatar progress.
- Coin-based reward system.
- Leveling system with unlockable features.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/salmahmed6/walk-with-me-mvp.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Set up API keys for Google and Twitter OAuth.
   - Configure backend database and podcast/Quran APIs.
4. **Run the app:**
   ```bash
   npm start
   ```

## Tech Stack
- **Backend:** Node.js with Express (or Firebase for MVP).
- **Database:** Firebase Firestore or MongoDB.
- **APIs:**
  - Google Maps API for location tracking.
  - Podcast API (e.g., ListenAPI or Spotify).
  - Quran recitation API (e.g., Al Quran Cloud).
- **Authentication:** Firebase Auth or OAuth providers.
- **Real-Time:** WebSocket or Firebase Realtime Database for synced walks.



