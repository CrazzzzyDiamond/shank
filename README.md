# Shank

A modern music training application for learning instrument notes with real-time pitch detection.

## Overview

Shank is an interactive music training tool designed to help musicians practice and improve their note recognition and intonation accuracy. Currently focused on trumpet training with plans to support multiple instruments.

## Features

- **Real-time Pitch Detection**: Uses advanced YIN algorithm for accurate frequency detection
- **Visual Note Display**: Musical notation rendered with VexFlow
- **Intonation Feedback**: Cents indicator showing pitch accuracy with visual feedback
- **Configurable Practice Range**: Adjustable note ranges for focused practice
- **Trumpet Support**: Built-in trumpet configuration with proper transposition
- **Responsive Design**: Clean, modern interface with theme support
- **Progress Tracking**: Visual feedback for successful note matching

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build System**: Vite with Turbo monorepo
- **Package Manager**: pnpm
- **Music Notation**: VexFlow
- **Pitch Detection**: Custom YIN algorithm implementation
- **Styling**: TailwindCSS v4

## Project Structure

```
shank/
├── apps/
│   └── web/                 # Main React application
│       ├── src/
│       │   ├── components/  # React components
│       │   └── hooks/       # Custom hooks
│       └── ...
├── packages/
│   ├── music/              # Music theory and instrument definitions
│   └── pitch/              # Pitch detection algorithms
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shank
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
pnpm build
```

## Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

#### Automatic Deployment

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://yourusername.github.io/shank/`

#### Manual Deployment Setup

1. Go to your GitHub repository settings
2. Navigate to "Pages" section  
3. Under "Source", select "GitHub Actions"
4. Push to the `main` branch to trigger deployment

#### Local Build for GitHub Pages

To test the production build locally:

```bash
pnpm build:gh-pages
```

## Usage

1. **Grant Microphone Access**: Allow the application to access your microphone when prompted
2. **Select Note Range**: Use the settings panel to configure your practice range
3. **Start Practicing**: Play the displayed note on your trumpet
4. **Get Feedback**: Watch the cents indicator for intonation accuracy
5. **Progress**: Successfully matched notes will advance to the next random note

### Settings

- **Note Range**: Set minimum and maximum notes for practice
- **Tolerance**: Adjust the acceptable pitch deviation (in cents)
- **Theme**: Switch between light and dark themes

## Packages

### @shank/music
Core music theory utilities including:
- Note definitions and MIDI mappings
- Instrument configurations (trumpet)
- Frequency calculations and note matching
- Random note generation

### @shank/pitch
Pitch detection algorithms:
- YIN algorithm implementation
- Real-time audio processing
- Frequency analysis utilities

## Roadmap

- [ ] Additional instrument support (clarinet, saxophone, etc.)
- [ ] Practice session analytics
- [ ] Custom exercises and scales
- [ ] Multiplayer practice modes
- [ ] Progress tracking and achievements
- [ ] Advanced intonation exercises

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-instrument`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add support for clarinet'`
6. Push to the branch: `git push origin feature/new-instrument`
7. Submit a pull request

## License

This project is private and not yet licensed for public use.

## Development

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm build:gh-pages` - Build for GitHub Pages deployment
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

### Architecture

The application uses a monorepo structure with:
- **apps/web**: Main React application
- **packages/music**: Music theory and instrument definitions
- **packages/pitch**: Audio processing and pitch detection

Each package is independently versioned and can be developed in isolation while maintaining strong typing across the entire application.