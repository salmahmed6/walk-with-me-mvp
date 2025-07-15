```plantuml
@startuml
!define RECTANGLE class

actor User

package "Walk With Me Backend" {
  [Nest.js API] #-->[Redis Cache]
  [Nest.js API] #-->[WebSocket Server]
  [Nest.js API] #-->[Firestore/MongoDB]
  [Nest.js API] -->[Google Maps API]
  [Nest.js API] -->[Podcast API]
  [Nest.js API] -->[Quran API]
  [WebSocket Server] #-->[Firestore/MongoDB]
}

User --> [Nest.js API]
User --> [WebSocket Server]

[Firestore/MongoDB] : User Data
[Firestore/MongoDB] : Walk Sessions
[Firestore/MongoDB] : Chat Messages
[Firestore/MongoDB] : Location Tracking
[Firestore/MongoDB] : Rewards & Levels

[Redis Cache] : Session Data
[Redis Cache] : Content Metadata

[Google Maps API] : Location Tracking
[Podcast API] : Audio Streaming
[Quran API] : Audio Streaming

@enduml
```