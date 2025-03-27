# NIM Project

A modern web application built with Next.js, TypeScript, and React, featuring a robust development environment with comprehensive testing and linting setup.

## 🎮 About the Game

Nim is a mathematical game of strategy in which two players take turns removing objects from heaps or piles. In this implementation:

- The game starts with 13 sticks
- Players take turns removing 1, 2, or 3 sticks at a time
- The player who is forced to take the last stick loses
- Play against either a random or intelligent computer opponent

The intelligent computer opponent uses a winning strategy based on mathematical principles, making it unbeatable when played optimally.

## 🎨 Retro Styling

The game features a nostalgic Nintendo Entertainment System (NES) inspired design using [nes.css](https://nostalgic-css.github.io/NES.css/), a NES-style CSS framework. This gives the game a charming retro look while maintaining modern web development practices and responsive design.

## 🚀 Tech Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: TailwindCSS
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint with TypeScript, React, and Accessibility rules
- **Code Formatting**: Prettier
- **Internationalization**: next-intl

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/webisdead/nim.git
cd nim
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## 🚀 Development

Start the development server with Turbopack:
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run Jest tests in watch mode

## 🧪 Testing

The project uses Jest and React Testing Library for testing. Tests can be run using:
```bash
npm run test
```

For development with watch mode:
```bash
npm run test:watch
```

## 📦 Project Structure

```
nim/
├── src/               # Source code
├── public/           # Static files
├── .next/           # Next.js build output
├── node_modules/    # Dependencies
└── [config files]   # Various configuration files
```

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.mjs` - Jest configuration
- `.eslintrc.js` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration
- `tailwind.config.js` - TailwindCSS configuration

## 🎨 Code Quality

The project uses several tools to maintain code quality:

- **ESLint**: For code linting with TypeScript, React, and accessibility rules
- **Prettier**: For code formatting
- **TypeScript**: For type checking
- **Jest**: For unit and integration testing

## 🌐 Internationalization

The project uses `next-intl` for internationalization support. Messages and translations can be found in the `messages` directory.

## 📱 Responsive Design

The application is built with responsive design principles using TailwindCSS for styling.

