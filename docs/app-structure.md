# Walk With Me - File Structure

This document outlines the file structure for the Walk With Me project to ensure clarity and maintainability.

walk-with-me-structure
```
├── /src
│   ├── /common                 # Shared utilities and middleware
│   │   ├── /decorators         # Custom decorators
│   │   │   ├── auth.decorator.ts
│   │   │   ├── user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── /guards             # Authentication and authorization
│   │   │   ├── auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── websocket-auth.guard.ts
│   │   ├── /interceptors       # Request/response interceptors
│   │   │   ├── transform.interceptor.ts
│   │   │   ├── logging.interceptor.ts
│   │   │   └── cache.interceptor.ts
│   │   ├── /pipes              # Validation and parsing
│   │   │   ├── validation.pipe.ts
│   │   │   └── parse-uuid.pipe.ts
│   │   ├── /filters            # Exception handling
│   │   │   ├── all-exceptions.filter.ts
│   │   │   └── validation-exception.filter.ts
│   │   └── /utils              # Helpers and constants
│   │       ├── constants.ts
│   │       ├── helpers.ts
│   │       └── crypto.util.ts
│   ├── /config                 # Configuration files
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   ├── oauth.config.ts
│   │   ├── redis.config.ts
│   │   └── app.config.ts
│   ├── /database               # Database-related files
│   │   ├── /entities           # Database entities
│   │   │   ├── user.entity.ts
│   │   │   ├── walk-session.entity.ts
│   │   │   ├── friendship.entity.ts
│   │   │   ├── walk-invitation.entity.ts
│   │   │   ├── content.entity.ts
│   │   │   ├── user-level.entity.ts
│   │   │   ├── achievement.entity.ts
│   │   │   ├── chat-message.entity.ts
│   │   │   └── location-tracking.entity.ts
│   │   ├── /migrations         # Database migrations
│   │   │   ├── 001-create-users.ts
│   │   │   ├── 002-create-walks.ts
│   │   │   ├── 003-create-friendships.ts
│   │   │   └── 004-create-content.ts
│   │   └── /seeders            # Database seeders
│   │       ├── user.seeder.ts
│   │       └── content.seeder.ts
│   ├── /modules                # Feature modules
│   │   ├── /auth               # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── /strategies
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── google.strategy.ts
│   │   │   │   └── twitter.strategy.ts
│   │   │   └── /dto
│   │   │       ├── login.dto.ts
│   │   │       ├── register.dto.ts
│   │   │       └── oauth-callback.dto.ts
│   │   ├── /users              # User management module
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── /dto
│   │   │       ├── create-user.dto.ts
│   │   │       ├── update-profile.dto.ts
│   │   │       ├── friend-request.dto.ts
│   │   │       └── user-response.dto.ts
│   │   ├── /walks              # Walk management module
│   │   │   ├── walks.module.ts
│   │   │   ├── walks.controller.ts
│   │   │   ├── walks.service.ts
│   │   │   ├── walks.gateway.ts
│   │   │   └── /dto
│   │   │       ├── create-walk.dto.ts
│   │   │       ├── join-walk.dto.ts
│   │   │       ├── walk-progress.dto.ts
│   │   │       └── walk-invitation.dto.ts
│   │   ├── /content            # Podcast and Quran content module
│   │   │   ├── content.module.ts
│   │   │   ├── content.controller.ts
│   │   │   ├── content.service.ts
│   │   │   ├── /integrations
│   │   │   │   ├── podcast.service.ts
│   │   │   │   └── quran.service.ts
│   │   │   └── /dto
│   │   │       ├── podcast-query.dto.ts
│   │   │       └── quran-query.dto.ts
│   │   ├── /rewards            # Rewards and leveling module
│   │   │   ├── rewards.module.ts
│   │   │   ├── rewards.service.ts
│   │   │   ├── leveling.service.ts
│   │   │   └── /dto
│   │   │       ├── reward-calculation.dto.ts
│   │   │       └── level-progress.dto.ts
│   │   ├── /chat               # Real-time chat module
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.gateway.ts
│   │   │   ├── chat.service.ts
│   │   │   └── /dto
│   │   │       ├── send-message.dto.ts
│   │   │       └── chat-room.dto.ts
│   │   ├── /location           # Location tracking module
│   │   │   ├── location.module.ts
│   │   │   ├── location.service.ts
│   │   │   ├── location.gateway.ts
│   │   │   └── /dto
│   │   │       ├── location-update.dto.ts
│   │   │       └── route-tracking.dto.ts
│   │   └── /notifications      # Push notifications module
│   │       ├── notifications.module.ts
│   │       ├── notifications.service.ts
│   │       └── /dto
│   │           └── notification.dto.ts
│   ├── /shared                 # Shared services and interfaces
│   │   ├── /services
│   │   │   ├── redis.service.ts
│   │   │   ├── firebase.service.ts
│   │   │   ├── maps.service.ts
│   │   │   └── external-api.service.ts
│   │   └── /interfaces
│   │       ├── user.interface.ts
│   │       ├── walk.interface.ts
│   │       ├── content.interface.ts
│   │       └── websocket.interface.ts
│   ├── /types                  # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── walk.types.ts
│   │   └── content.types.ts
│   ├── main.ts                 # Application entry point
│   └── app.module.ts           # Root module
├── /test                       # Tests
│   ├── /unit                   # Unit tests
│   │   ├── auth/
│   │   ├── users/
│   │   ├── walks/
│   │   └── content/
│   ├── /integration            # Integration tests
│   │   ├── auth.e2e-spec.ts
│   │   ├── walks.e2e-spec.ts
│   │   └── users.e2e-spec.ts
│   └── /fixtures               # Test fixtures
│       ├── user.fixture.ts
│       └── walk.fixture.ts
├── /docs                       # Documentation
│   ├── /api                    # API documentation
│   │   ├── auth.md
│   │   ├── users.md
│   │   ├── walks.md
│   │   └── content.md
│   ├── /deployment             # Deployment guides
│   │   ├── docker.md
│   │   └── aws.md
│   ├── TODO.md                 # Feature roadmap
│   ├── FILESTRUCTURE.md        # Project structure
│   └── CONTRIBUTING.md         # Contribution guidelines
├── /diagrams                   # Architecture diagrams
│   ├── system-architecture.drawio  # System architecture
│   ├── user-flow.drawio           # User journey flowchart
│   ├── database-schema.drawio     # Database ERD
│   └── api-flow.drawio            # API request flows
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose for local dev
├── nest-cli.json               # Nest.js CLI configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest testing configuration
└── README.md                   # Project overview
```

## Additional Notes

- **Diagrams:** The /diagrams folder retains placeholders for .drawio files. Use tools like diagrams.net to create:
  - **System Architecture:** Visualize Nest.js, Firebase/MongoDB, APIs, and WebSocket.
  - **User Flow:** Map API calls (e.g., POST /walks, WS /chat).
  - **Database Schema:** ERD for entities like user, walk-session.
  - **API Flow:** Show request-response for key endpoints.
- **CI/CD:** Add .github/workflows for GitHub Actions to automate testing and deployment.
- **Swagger:** Integrate @nestjs/swagger to auto-generate API docs in /docs/api.
