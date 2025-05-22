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

3. Start the development server:
```bash
yarn start
# or
npm start
```

4. Run on your preferred platform:
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

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/oi19/car-request-app](https://github.com/oi19/car-request-app) 