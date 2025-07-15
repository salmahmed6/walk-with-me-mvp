Walk With Me Backend Deployment Architecture

[Load Balancer]
    |
    |---[Nest.js API Server (Node 1)]----[Redis Cluster]
    |       |                              |
    |       |                              |--[Primary Node]
    |       |                              |--[Replica Node]
    |       |---[Firestore/MongoDB]
    |              |
    |              |--[Users Collection]
    |              |--[WalkSessions Collection]
    |              |--[ChatMessages Collection]
    |              |--[LocationTracking Collection]
    |              |--[UserLevels Collection]
    |              |--[Achievements Collection]
    |
    |---[Nest.js API Server (Node 2)]----[Redis Cluster]
    |       |
    |       |---[Firestore/MongoDB]
    |
    |---[WebSocket Server (Node 1)]----[Redis Cluster]
    |       |
    |       |---[Firestore/MongoDB]
    |
    |---[WebSocket Server (Node 2)]----[Redis Cluster]
            |
            |---[Firestore/MongoDB]

External Services:
- Google Maps API (Location Tracking)
- Podcast API (e.g., ListenAPI or Spotify)
- Quran API (e.g., Al Quran Cloud)

Cloud Infrastructure:
- Hosted on AWS (e.g., ECS/EKS for containers, RDS for MongoDB if used)
- Auto-scaling for API and WebSocket servers
- CloudWatch for monitoring and logging
- S3 for static assets (if needed)