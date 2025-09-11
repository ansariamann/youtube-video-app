# YouTube Video App

A minimalistic full-stack web application that dynamically fetches and displays random YouTube videos using the YouTube Data API.

## Features

- 🎯 **Dynamic Content**: Automatically fetches random popular videos from YouTube
- 📱 **Responsive Design**: Optimized for all devices
- ▶️ **Video Player**: Click videos to watch them embedded
- 🔄 **Smart Caching**: Caches videos for 1 hour to optimize API usage
- ⚡ **Minimalistic**: Clean, focused codebase with no hardcoded content

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for dynamic caching
- **YouTube Data API v3** for real-time video fetching
- **Smart API management** with automatic fallbacks

### Frontend
- **React 18** with modern hooks
- **Vite** for fast development
- **Responsive CSS Grid** layout

## Project Structure

```
youtube-video-app/
├── server/                 # Minimalistic Backend
│   ├── index.js           # Complete server with dynamic API fetching
│   ├── .env               # Environment variables
│   └── package.json       # Server dependencies
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Client dependencies
│   └── vite.config.js     # Vite configuration
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for production) or use mock data for testing

### Installation & Running

1. **Clone and navigate to the project**
   ```bash
   cd youtube-video-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Set up environment variables** in `server/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/youtube-videos
   YOUTUBE_API_KEY=your_youtube_api_key_from_google_cloud
   PORT=3000
   ```

2. **Start the server** (from the server directory):
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:3000` and automatically fetch videos when accessed

3. **Start the React client** (from the client directory):
   ```bash
   cd ../client
   npm run dev
   ```
   Client will run on `http://localhost:3001`

### How It Works

- **No manual seeding required** - Videos are fetched automatically from YouTube API
- **Smart caching** - Videos are cached for 1 hour to optimize API usage
- **Dynamic content** - Fresh videos fetched every hour with random search terms
- **Fallback system** - Uses cached videos if API is unavailable

### Usage

1. Open your browser and go to `http://localhost:3001`
2. Browse through the video collection
3. Click on any video card to open the video player
4. Use the close button or press ESC to close the player
5. Enjoy watching your favorite videos!

## Features in Detail

### Video Cards
- High-quality thumbnails with hover effects
- Video duration display
- View count and publish date
- Channel information
- Smooth animations and transitions

### Video Player
- Full YouTube embed player
- Auto-play functionality
- Video metadata display
- Responsive modal design
- Keyboard shortcuts (ESC to close)

### Responsive Design
- Grid layout that adapts to screen size
- Mobile-optimized interface
- Touch-friendly interactions

## API Endpoints

- `GET /api/videos` - Fetch all videos with metadata
- `GET /health` - Server health check

## Development

### Available Scripts

**Server:**
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

**Client:**
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
