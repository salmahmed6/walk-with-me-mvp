# Walk With Me 🚶‍♂️🚶‍♀️

A social walking application that connects people for walking activities, tracks walks with GPS, and builds a healthy community. Built with Next.js frontend and NestJS backend.

![Walk With Me Banner](https://via.placeholder.com/800x200/22c55e/ffffff?text=Walk+With+Me+-+Social+Walking+App)

## 🌟 Features

### Core MVP Features
- **👤 User Authentication** - Secure registration and login with JWT
- **🗺️ GPS Walk Tracking** - Real-time location tracking with interactive maps
- **👥 Social Walking Events** - Create, join, and manage group walks
- **📱 Community Feed** - Share achievements and connect with other walkers
- **🚨 Safety Features** - Emergency alerts with SMS notifications
- **📊 Progress Analytics** - Track distance, duration, and walking statistics

### Technical Highlights
- **🎨 Modern UI/UX** - Responsive design with Tailwind CSS
- **⚡ Real-time Updates** - WebSocket integration for live features
- **🔒 Security First** - JWT authentication, input validation, CORS protection
- **📱 Mobile Responsive** - Works seamlessly on all devices
- **🐳 Docker Ready** - Containerized for easy deployment

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL with Redis caching
- **Maps**: Google Maps JavaScript API
- **Notifications**: Twilio SMS, Firebase Cloud Messaging
- **Storage**: AWS S3 for file uploads
- **Deployment**: Docker, Vercel, Railway

### Project Structure
\`\`\`
walk-with-me-mvp/
├── backend/          # NestJS API server
├── frontend/         # Next.js web application
├── scripts/          # Database setup scripts
└── docker-compose.yml
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Google Maps API key
- Twilio account (for SMS)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/walk-with-me-mvp.git
cd walk-with-me-mvp
\`\`\`

2. **Setup Backend**
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run prisma:migrate
npm run start:dev
\`\`\`

3. **Setup Frontend**
\`\`\`bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your configuration
npm run dev
\`\`\`

4. **Setup Database (Docker)**
\`\`\`bash
docker-compose up -d postgres redis
\`\`\`

### Environment Variables

#### Backend (.env)
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/walkwithme"
JWT_SECRET="your-super-secure-jwt-secret"
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"
GOOGLE_MAPS_API_KEY="your-google-maps-key"
\`\`\`

#### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-key"
\`\`\`

## 📱 Usage

1. **Register/Login** - Create your account or sign in
2. **Complete Profile** - Add emergency contact and preferences
3. **Create Walks** - Plan walking events and invite others
4. **Track Walks** - Use GPS tracking during your walks
5. **Share Progress** - Post achievements to the community feed
6. **Stay Safe** - Use emergency alerts when needed

## 🧪 Testing

### Backend Tests
\`\`\`bash
cd backend
npm run test
npm run test:e2e
\`\`\`

### Frontend Tests
\`\`\`bash
cd frontend
npm run test
npm run test:e2e
\`\`\`

## 🚀 Deployment

### Using Docker
\`\`\`bash
docker-compose up -d
\`\`\`

### Manual Deployment
- **Frontend**: Deploy to Vercel or Netlify
- **Backend**: Deploy to Railway, Heroku, or AWS
- **Database**: Use managed PostgreSQL (Neon, Supabase, AWS RDS)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Update documentation for API changes

## 📊 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **API Endpoints**: http://localhost:3000/api

### Key Endpoints
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/login\` - User login
- \`GET /api/walks\` - Get user walks
- \`POST /api/walks\` - Create new walk
- \`POST /api/walks/:id/start-session\` - Start GPS tracking
- \`GET /api/posts/feed\` - Get community feed

## 🔧 Configuration

### Google Maps Setup
1. Enable Google Maps JavaScript API
2. Enable Geolocation API
3. Add your domain to API restrictions

### Twilio SMS Setup
1. Create Twilio account
2. Get phone number for SMS
3. Configure webhook URLs

### Firebase Push Notifications
1. Create Firebase project
2. Enable Cloud Messaging
3. Download service account key

## 📈 Performance

- **Frontend**: Optimized with Next.js SSR and code splitting
- **Backend**: Efficient database queries with Prisma
- **Caching**: Redis for session and data caching
- **CDN**: Static assets served via CDN

## 🔒 Security

- JWT token authentication
- Input validation with class-validator
- CORS protection
- Rate limiting on API endpoints
- Encrypted sensitive data storage
- HTTPS enforcement in production

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Your Name](https://github.com/yourusername)
- **UI/UX Designer**: [Designer Name](https://github.com/designer)
- **Backend Developer**: [Backend Dev](https://github.com/backenddev)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [NestJS](https://nestjs.com/) for the powerful Node.js framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Google Maps](https://developers.google.com/maps) for mapping services
- [Twilio](https://www.twilio.com/) for SMS notifications

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/walk-with-me-mvp/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/walk-with-me-mvp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/walk-with-me-mvp/discussions)
- **Email**: support@walkwithme.app

---

**Made with ❤️ for the walking community**
