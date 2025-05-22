# Car Request App

A React Native application for managing and filtering car import requests. This app provides a modern, user-friendly interface for viewing and filtering car requests with features like infinite scrolling, caching, and real-time filtering.

## Features

- 📱 Modern React Native UI with smooth animations
- 🔍 Advanced filtering system
  - Price filtering
  - Production year filtering
  - Car type filtering
- ♾️ Infinite scroll pagination
- 💾 Response caching for better performance
- 🎯 Clean architecture implementation
- 📊 Comprehensive test coverage
- 🎨 Consistent theming and styling
- 🔄 Pull-to-refresh functionality
- 🚀 Optimized performance

## Tech Stack

- **Framework:** React Native with Expo
- **State Management:** Zustand
- **API Integration:** Axios
- **Caching:** Custom cache service
- **Testing:** Jest & React Native Testing Library
- **Navigation:** React Navigation
- **UI Components:** Custom components with React Native
- **Styling:** React Native StyleSheet
- **Type Safety:** TypeScript

## API Documentation

### Base URL
```
https://6820b96e259dad2655ad68e1.mockapi.io
```

### Endpoints

#### Get Car Requests
```
GET /api/v1/car-requests
```

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page (default: 10)
- `price` (number): Filter by price
- `productionYear` (number): Filter by production year
- `type` (string): Filter by car type

**Example Request:**
```
GET /api/v1/car-requests?page=1&limit=10&productionYear=2020&price=27000&type=SUV
```

**Example Response:**
```json
[
  {
    "id": "1",
    "carModel": "Toyota RAV4",
    "productionYear": 2020,
    "price": 32000,
    "type": "SUV",
    "requesterName": "Ahmed Samir",
    "location": "Cairo",
    "image": "https://example.com/image.png"
  }
]
```

## Environment Setup

1. Create a `.env` file in the root directory:
```bash
touch .env
```

2. Add the following environment variables:
```env
API_BASE_URL=https://6820b96e259dad2655ad68e1.mockapi.io
API_TIMEOUT=10000
CACHE_DURATION=300000  # 5 minutes in milliseconds
```

## Prerequisites

- Node.js (v14 or higher)
- Yarn or npm
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone https://github.com/oi19/car-request-app.git
cd car-request-app
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
yarn start
# or
npm start
```

5. Run on your preferred platform:
```bash
# For iOS
yarn ios
# For Android
yarn android
```

## Project Structure

```
src/
├── data/               # Data layer
│   ├── api/           # API integration
│   └── cache/         # Caching service
├── domain/            # Business logic
│   ├── entities/      # Type definitions
│   ├── repositories/  # Repository interfaces
│   └── usecases/      # Business use cases
├── presentation/      # UI layer
│   ├── components/    # Reusable components
│   ├── screens/       # Screen components
│   ├── hooks/         # Custom hooks
│   └── theme/         # Theme configuration
└── store/            # State management
```

## Testing

Run the test suite:
```bash
yarn test
```

Run tests with coverage:
```bash
yarn test --coverage
```

### Test Coverage
- Unit tests for components
- Integration tests for API calls
- Hook tests for custom hooks
- State management tests
- Cache service tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React Native community
- Expo team
- All contributors and maintainers

## Contact


Project Link: [https://github.com/oi19/car-request-app](https://github.com/oi19/car-request-app) 
