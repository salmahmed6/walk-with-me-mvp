# Walk With Me - TODO

This document outlines the tasks for the Walk With Me MVP and future features to ensure a clear roadmap for development.

## MVP Features

### Authentication
- Implement Google, Twitter, and email login using Firebase Auth.
- Ensure secure session management and token refresh.

### Walk Setup
- Allow users to set walk goals by time or distance.
- Provide a simple UI for selecting walk preferences.

### Solo Walk
- Integrate podcast API (e.g., ListenAPI or Spotify) for audio streaming.
- Integrate Quran API (e.g., Al Quran Cloud) for Arabic/English recitations.
- Cache audio for offline playback during walks.

### Social Walk
- Enable real-time chat for paired users using WebSocket or Firebase Realtime Database.
- Sync media playback (podcast/Quran) between walking partners.

### Real-Time Map
- Use Google Maps API to display user avatars and track progress.
- Show distance, time, and route in real-time.

### Reward System
- Implement a coin-based system tied to walk completion.
- Create a leveling system with unlockable features (e.g., new themes, badges).

### Testing
- Write unit tests for backend services (Nest.js).
- Create integration tests for API and database interactions.

---

## Future Features

### AI Recommendations
- Use AI to suggest podcasts or recitations based on user preferences and walking habits.
- Implement zero-prompt categorization for walk history.

### Group Walks
- Allow multiple users to join a single walk session with shared media.
- Add leaderboards for group challenges.

### Wearable Integration
- Support Apple Watch and Fitbit for heart rate and step tracking.
- Sync wearable data with the app for enhanced analytics.

### Offline Mode
- Cache maps and audio for fully offline walks.
- Store walk data locally and sync when online.

### Visual Dashboard
- Create a dashboard for walk history, stats, and earned coins.
- Add graphs for distance, time, and levels over time.

### Browser Extension
- Develop a browser extension to save podcasts or recitations directly to the app.

---

## Diagrams (Planned)
The `/diagrams` folder will contain:
- **System Architecture:** Diagram showing Nest.js backend, Firebase/MongoDB, and API integrations.
- **User Flow:** Flowchart of user actions (login, walk setup, solo/social walk, rewards).
- **Database Schema:** ERD for user data, walk history, and rewards.
- **UI Mockups:** Wireframes for key screens (home, walk setup, map, rewards).

See the `/diagrams` folder for these assets once created.

---

## Notes
- Prioritize MVP features to ensure a functional release.
- Regularly update this file as tasks are completed or new ideas arise.
- Use issues to track progress and assign tasks. 