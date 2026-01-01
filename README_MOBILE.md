# Study Abroad Mobile App (STAB)

A comprehensive mobile application for iOS that helps students plan their study abroad journey. Built with React Native and Expo.

## Features

- **Authentication**: Secure login and registration with Firebase
- **Budget Planning**: Plan and track your study abroad budget
- **City Comparison**: Compare living costs and quality of life across different cities
- **Journey Planning**: Track your application process step by step
- **Scholarships**: Browse and filter scholarships based on your profile
- **Community**: Connect with other students, share experiences, and participate in events

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode on macOS) or physical iOS device with Expo Go app

## Installation

1. Clone the repository:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Firebase credentials:
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Running the App

### Development

Start the development server:
```bash
npm start
```

### iOS
```bash
npm run ios
```

This will open the app in the iOS Simulator.

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## Project Structure

```
mobile/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── login.tsx          # Login screen
│   ├── sign-up.tsx        # Registration screen
│   ├── profile.tsx        # User profile screen
│   ├── budget.tsx         # Budget planning screen
│   ├── compare.tsx        # City comparison screen
│   ├── plan-journey.tsx   # Journey planning screen
│   ├── scholarships.tsx   # Scholarships screen
│   └── community.tsx      # Community screen
├── auth/                  # Authentication logic
│   ├── AuthContext.tsx    # Auth context provider
│   ├── firebase.ts        # Firebase configuration
│   ├── login.ts          # Login function
│   ├── register.ts       # Registration function
│   └── resetPassword.ts  # Password reset function
├── components/            # Reusable components
├── services/             # API services
│   └── profileApi.ts     # Profile API service
├── types/                # TypeScript type definitions
│   ├── city.ts
│   ├── scholarship.ts
│   ├── journey.ts
│   ├── community.ts
│   ├── user.ts
│   └── index.ts
├── validators/           # Form validation schemas
│   ├── loginSchema.ts
│   └── registerSchema.ts
└── assets/              # Images, fonts, and other static assets

## Key Technologies

- **React Native**: Mobile app framework
- **Expo**: Development platform
- **Firebase**: Authentication and backend services
- **TypeScript**: Type-safe JavaScript
- **Zod**: Schema validation
- **Axios**: HTTP client
- **React Navigation**: Navigation library

## Features Implementation

### Authentication
- Firebase Authentication integration
- Login, Registration, and Password Reset
- Secure session management with AsyncStorage

### Budget Planning
- Interactive budget calculator
- Category-wise expense tracking
- Monthly and yearly cost projections
- Budget recommendations

### City Comparison
- Side-by-side city comparison
- Cost of living metrics
- Quality of life indicators
- Visual comparisons

### Journey Planning
- Phase-based application tracking
- Task management
- Progress visualization
- Journey profile creation

### Scholarships
- Comprehensive scholarship database
- Advanced filtering by country, level, and field
- Detailed scholarship information
- Application deadlines tracking

### Community
- Upcoming events calendar
- Student success stories
- Forum discussions
- Community engagement features

## Backend Integration

The app is designed to work with the Django backend API. Ensure the backend is running on `http://localhost:8000` or update the `EXPO_PUBLIC_API_URL` in your `.env` file.

## Building for Production

### iOS

1. Configure your app signing in Xcode
2. Run:
```bash
expo build:ios
```

### Android

```bash
expo build:android
```

## Troubleshooting

### Common Issues

1. **Firebase Authentication Not Working**
   - Ensure all Firebase credentials are correctly set in `.env`
   - Check Firebase console for proper iOS/Android app configuration

2. **Metro Bundler Issues**
   - Clear cache: `expo start -c`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

3. **iOS Simulator Not Opening**
   - Ensure Xcode and Command Line Tools are installed
   - Open Xcode and accept license agreements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is part of the STAB (Study Abroad Planning) platform.

## Support

For issues and questions, please contact the development team or create an issue in the repository.
