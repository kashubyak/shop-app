# Shop App

A modern React Native e-commerce application built with Expo, TypeScript, and NativeWind.

## Features

- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Checkout**: Complete order form with validation
- **Authentication**: User authentication with token management
- **Dark/Light Theme**: Automatic theme switching based on system preferences

## Tech Stack

- **Framework**: Expo Router (React Native)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Management**: React Hook Form
- **Storage**: AsyncStorage
- **Navigation**: Expo Router with Tab Navigation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shop-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home/Products screen
│   │   ├── cart.tsx       # Shopping cart screen
│   │   └── profile.tsx    # User profile screen
│   └── product/           # Product detail pages
│       └── [id].tsx       # Dynamic product route
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── checkout/          # Checkout form components
│   ├── home/              # Home screen components
│   └── ui/                # UI primitives (Button, Input, etc.)
├── hooks/                 # Custom React hooks
├── navigation/            # Navigation configuration
├── screens/               # Screen components (legacy)
├── service/               # API services
├── store/                 # Zustand stores
│   ├── useAuthStore.ts    # Authentication state
│   └── useCartStore.ts    # Shopping cart state
├── theme/                 # Theme configuration
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Architecture Decisions

### State Management
- **Zustand** is used for global state management (auth, cart)
- Stores are lightweight and type-safe
- Cart state persists to AsyncStorage for offline support

### Form Handling
- **React Hook Form** is used for form management and validation
- Form validation rules are defined inline with clear error messages
- Phone validation ensures numeric input with minimum length

### Data Persistence
- **AsyncStorage** is used for:
  - User authentication tokens
  - Shopping cart items (persists across app restarts)

### Styling
- **NativeWind** (Tailwind CSS) for consistent styling
- Theme-aware colors using CSS variables
- Responsive design with flexbox utilities

### Navigation
- **Expo Router** for file-based routing
- Tab navigation for main screens
- Stack navigation for product details and checkout

## Key Features Implementation

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent storage
- Total price calculation
- Empty state handling

### Checkout Flow
1. User clicks "Checkout" button in cart
2. Modal opens with form (Name, Phone, Address)
3. Form validation ensures:
   - Name: minimum 2 characters
   - Phone: numeric, minimum 10 digits
   - Address: minimum 5 characters
4. On successful submission:
   - Cart is cleared
   - Success modal is displayed
   - User can continue shopping

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
# iOS
npm run ios -- --configuration Release

# Android
npm run android -- --variant release
```

## Code Quality

- TypeScript strict mode enabled
- All components are typed
- No `any` types used
- Error handling with try-catch blocks
- Console errors logged for debugging (no console.log in production code)

## License

Private project

