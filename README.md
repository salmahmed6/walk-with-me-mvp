# Walk With Me

Step into fitness and connection with Walk With Me.

Walk With Me is a mobile application designed to inspire users to walk, whether solo or with friends, while enjoying podcasts or Quran recitations. The app tracks your location, time, and distance, rewarding you with coins and unlocking exciting features through a leveling system.

## Key Features

- **Effortless Walk Setup:** Choose to walk by time or distance, tailored to your goals.
- **Solo or Social Walks:** Walk alone with podcasts or Quran recitations (Arabic/English) or connect with a friend for shared media and chat.
- **Real-Time Progress:** View your walk on a map with avatar-based progress tracking.
- **Rewarding System:** Earn coins for every walk, unlocking new features as you level up.
- **Seamless Authentication:** Sign in with Google, Twitter, or email for quick access.
- **Smart Integration:** Syncs with podcast and Quran APIs for a rich audio experience.

## Vision
Walk With Me aims to become the ultimate companion for fitness and mindfulness, blending physical activity with meaningful audio content and social connection. Future plans include AI-driven walk recommendations, offline audio support, group walks, and integration with wearables for enhanced tracking.

## Why Contribute?
Join us to create an app that motivates people to move, connect, and grow. Whether you're passionate about mobile development, real-time systems, or UI/UX design, your skills can shape Walk With Me’s future. Let’s make walking a joyful, rewarding experience!

## Get Started

- Explore the issues for open tasks.
- Fork, clone, and submit pull requests—we’re excited to see your ideas!

## Contributing
Want to help build Walk With Me? Check out our CONTRIBUTING.md for guidelines on reporting bugs, suggesting features, or submitting code. We’re thrilled to collaborate!

## Project Structure
The project is organized for clarity and scalability:

- `/src`: Core application code (backend and frontend logic).
- `/docs`: Documentation, including TODOs and diagrams (see docs/TODO.md).
- `/diagrams`: System architecture, flowcharts, and UI mockups for the app.
- `/tests`: Unit and integration tests for robust development.

For a detailed file structure, see `docs/FILESTRUCTURE.md`.

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
   - Set up API keys for Google Maps, podcast (e.g., ListenAPI or Spotify), and Quran (e.g., Al Quran Cloud) APIs.
   - Configure Firebase Auth or other OAuth providers.
   - Set up Firebase Firestore or MongoDB for the database.
4. **Run the app:**
   ```bash
   npm start
   ```

## Tech Stack

- **Backend:** Nest.js for a scalable server.
- **Database:** Firebase Firestore or MongoDB for data storage.
- **APIs:**
  - Google Maps API for real-time location tracking.
  - Podcast API (e.g., ListenAPI or Spotify) for audio streaming.
  - Quran API (e.g., Al Quran Cloud) for recitations.
- **Authentication:** Firebase Auth or OAuth (Google, Twitter, email).
- **Real-Time:** WebSocket or Firebase Realtime Database for synced walks and chat.

## Documentation

- **TODOs:** See `docs/TODO.md` for MVP and future feature plans.
- **Diagrams:** Architecture and flow diagrams are in the `/diagrams` folder (e.g., system architecture, user flow, and database schema).

## License
This project is licensed under the MIT License - see the LICENSE file for details.



