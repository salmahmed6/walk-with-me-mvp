# Walk With Me 

A social walking application that connects people for walking activities, tracks walks with GPS, and builds a healthy community. Built with Next.js frontend and NestJS backend.

## 🌟 Features

### Core MVP Features
- **User Authentication** - Secure registration and login with JWT
- **GPS Walk Tracking** - Real-time location tracking with interactive maps
- **Social Walking Events** - Create, join, and manage group walks
- **Community Feed** - Share achievements and connect with other walkers
- **Safety Features** - Emergency alerts with SMS notifications
- **Progress Analytics** - Track distance, duration, and walking statistics

### Technical Highlights
- **Modern UI/UX** - Responsive design with Tailwind CSS
- **Real-time Updates** - WebSocket integration for live features
- **Security First** - JWT authentication, input validation, CORS protection
- **Mobile Responsive** - Works seamlessly on all devices
- **Docker Ready** - Containerized for easy deployment

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL with Redis caching
- **Maps**: Google Maps JavaScript API
- **Notifications**: Firebase Cloud Messaging
- **Storage**: AWS S3 for file uploads
- **Deployment**: Docker, Vercel, Railway

### Project Structure
```
walk-with-me-mvp/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── auth/     # Authentication services
│   │   ├── users/    # User management
│   │   ├── walks/    # Walk tracking & events
│   │   ├── posts/    # Community feed
│   │   └── notifications/ # SMS & push notifications
│   └── Dockerfile
├── frontend/         # Next.js web application
│   ├── src/
│   │   ├── app/      # Next.js 14 app router
│   │   ├── components/ # Reusable UI components
│   │   └── store/    # Redux state management
│   └── next.config.js
├── scripts/          # Database setup scripts
└── docker-compose.yml
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Google Maps API key
- Twilio account (for SMS)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/salmahmed6/walk-with-me-mvp.git
cd walk-with-me-mvp
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run prisma:migrate
npm run start:dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your configuration
npm run dev
```

4. **Setup Database (Docker)**
```bash
docker-compose up -d postgres redis
```

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/walkwithme"
JWT_SECRET="your-super-secure-jwt-secret"
GOOGLE_MAPS_API_KEY="your-google-maps-key"
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-key"
```

## 📱 Usage

1. **Register/Login** - Create your account or sign in
2. **Complete Profile** - Add emergency contact and preferences
3. **Create Walks** - Plan walking events and invite others
4. **Track Walks** - Use GPS tracking during your walks
5. **Share Progress** - Post achievements to the community feed
6. **Stay Safe** - Use emergency alerts when needed

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend Tests
```bash
cd frontend
npm run test
npm run test:e2e
```

## 🚀 Deployment

### Using Docker
```bash
docker-compose up -d
```

## 🔧 Configuration

### Google Maps Setup
1. Enable Google Maps JavaScript API
2. Enable Geolocation API
3. Add your domain to API restrictions

### Firebase Push Notifications
1. Create Firebase project
2. Enable Cloud Messaging
3. Download service account key


