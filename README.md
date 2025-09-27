# Walk With Me Backend

Powering fitness and connection with Walk With Me!

The Walk With Me backend is a Nest.js-based API that supports a mobile app designed to motivate users to walk, either alone or with friends, while enjoying podcasts or Quran recitations. It handles authentication, walk tracking, real-time chat, location updates, rewards, and content integration.

## Key Features

- **Seamless Authentication:** Supports Google, Twitter, and email login via Firebase Auth or OAuth.
- **Walk Management:** Create and track walks by time or distance, with real-time progress via WebSocket.
- **Real-Time Chat:** Enables synced media and chat for social walks using WebSocket.
- **Location Tracking:** Integrates Google Maps API for real-time route and avatar progress.
- **Reward System:** Awards coins for walks and unlocks features through a leveling system.
- **Content Integration:** Connects to podcast (e.g., ListenAPI or Spotify) and Quran (e.g., Al Quran Cloud) APIs.

## Vision
The Walk With Me backend aims to be a scalable, real-time foundation for a fitness and mindfulness app. Future plans include AI-driven walk recommendations, group walk support, and wearable integrations for enhanced tracking.

## Why Contribute?
Join us to build a backend that powers movement and connection. Whether you’re into APIs, real-time systems, or database design, your skills can shape Walk With Me’s future. Let’s make walking rewarding and fun!

## Get Started

- Check out the issues for tasks.
- Fork, clone, and submit PRs—we’d love your ideas!

## Contributing
Want to help shape the backend? See our CONTRIBUTING.md for guidelines on reporting bugs, suggesting features, or submitting code. We’re excited to collaborate!

## Project Structure
The backend is organized for scalability and maintainability:

- `/src`: Core Nest.js code with modules for auth, walks, content, etc.
- `/docs`: API documentation, deployment guides, and TODOs.
- `/diagrams`: System architecture, user flows, and database schemas.
- `/test`: Unit and integration tests for reliability.

For details, see `docs/FILESTRUCTURE.md`.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/salmahmed6/walk-with-me-backend.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env`.
   - Set API keys for Google Maps, podcast (e.g., ListenAPI or Spotify), Quran (e.g., Al Quran Cloud), and Firebase Auth.
4. **Run the backend:**
   ```bash
   npm start
   ```

## Tech Stack

- **Backend:** Nest.js for a scalable server.
- **Database:** Firebase Firestore or MongoDB for data storage.
- **APIs:**
  - Google Maps API for location tracking.
  - Podcast API (e.g., ListenAPI or Spotify) for audio streaming.
  - Quran API (e.g., Al Quran Cloud) for recitations.
- **Authentication:** Firebase Auth or OAuth (Google, Twitter, email).
- **Real-Time:** WebSocket or Firebase Realtime Database for synced walks and chat.
- **Caching:** Redis for performance optimization.

## Documentation

- **TODOs:** See `docs/TODO.md` for MVP and future features.
- **API Docs:** Endpoints are documented in `docs/api`.
- **Diagrams:** Architecture and flows in the `/diagrams` folder.
- **Deployment:** Guides for Docker and AWS in `docs/deployment`.

## License
This project is licensed under the MIT License - see the LICENSE file for details.



