# Walk With Me 

## Overview
Walk with me is a mobile application designed to motivate users to walk, either alone or with friends, while enjoying podcasts or Quran recitations. The app tracks location, time, and distance, rewarding users with coins and unlocking features through a leveling system.

## Features

### Authentication
**Login & Registration:**
- Sign in with Google, Twitter, or email/password.
- Secure user account creation and management.

### Walking Setup
**Set Duration:**
- Choose walk duration (e.g., 30 minutes).
- App estimates distance based on average walking speed (5 km/hr ≈ 2.5 km in 30 minutes).

**Set Distance:**
- Choose target distance (e.g., 5 km).
- App estimates time based on walking speed.

### Walk Options
**Walk Alone:**
- Listen to podcasts (15 min, 30 min, or 1-hour options).
- Choose language: Arabic or English.
- Listen to Quran recitations.

**Walk with a Friend:**
- User status set to "Active (Walking)" for visibility.
- Receive and accept/decline walk requests from friends.
- Options during paired walk:
  - Chat while walking.
  - Listen to synced podcast or Quran recitation.
- Map view displays avatars walking "side by side" based on synced progress, regardless of physical location.

### 🗺️ Real-Time Tracking & Visualization
- Tracks user’s location, path, and progress.
- Displays real-time avatar updates.
- For paired walks, shows both users’ avatars progressing together.

### 🏆 Levels & Coin System
**Coin Earning:**
- 1 km walked = 100 coins.
- 15 minutes walked = 75 coins.
- Walk with a friend = +50 coins bonus.
- Listen to podcast/Quran = +25 coins bonus.

**Leveling System:**

| Level | Coins Needed | Unlocks                              |
|-------|--------------|--------------------------------------|
| 1     | 0            | Basic walk, podcast suggestions      |
| 2     | 1000         | Choose specific podcasts             |
| 3     | 1500         | Walk with friends feature            |
| 4     | 2500         | Chat while walking with friends      |
| 5     | 4000         | Choose Quran reciters                |
| 6     | 6000         | Personal goals, visual achievements  |
| 7+    | Customizable | Advanced themes, badges, challenges  |

### 🧠 Suggested Future Enhancements
- Daily/Weekly Challenges: E.g., walk 5 km/day for 5 days for bonus coins.
- Health Stats Integration: Sync with Google Fit/Apple Health for steps and calories.
- Leaderboard: Compare walking stats with friends or globally.
- Mood Tracking: Log post-walk feelings.
- Custom Avatars: Customize avatars with earned rewards.

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



