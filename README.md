# YouTube Video App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React Version](https://img.shields.io/badge/react-v18.2.0-blue.svg)
![Express Version](https://img.shields.io/badge/express-v5.1.0-lightgrey.svg)

A full-stack web application built with React and Express that dynamically fetches, caches, and displays trending videos using the YouTube Data API v3 and MongoDB.

---

## What the Project Does

The YouTube Video App automatically discovers trending music videos from YouTube, stores metadata in MongoDB with dynamic 1-hour caching, and renders them in a responsive React interface. Users can browse video cards displaying titles, channel names, view counts, durations, and publication dates, and watch videos inside an embedded modal player.

---

## Why the Project Is Useful

- **Automated Content Fetching**: Automatically fetches fresh video data from YouTube API using dynamic search terms without needing manual database seeding.
- **Smart Caching System**: Minimizes API quota usage by caching fetched video metadata in MongoDB for 1 hour with fallbacks to cached data if the API is unavailable.
- **Modern Tech Stack**: Uses React 18 with Vite for fast frontend rendering and HMR, paired with an Express 5 Node.js backend.
- **Responsive Modal Player**: Clean grid layout with visual feedback, thumbnail previews, metadata display, and keyboard navigation (`Esc` to close).

---

## How Users Can Get Started

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/) (v7.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (running instance locally or via MongoDB Atlas)
- YouTube Data API v3 Key from [Google Cloud Console](https://console.cloud.google.com/)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/youtube-video-app.git
   cd youtube-video-app
   ```

2. **Install Server Dependencies**
   Navigate to the [`server`](server/) directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   Set up your `.env` file inside the [`server`](server/) directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/youtube-videos
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Install Client Dependencies**
   Navigate to the [`client`](client/) directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   From the [`server`](server/) directory:
   ```bash
   cd server
   npm run dev
   ```
   The backend API will start on `http://localhost:3000`.

2. **Start the Frontend Client**
   In a separate terminal window, from the [`client`](client/) directory:
   ```bash
   cd client
   npm run dev
   ```
   The frontend application will start on `http://localhost:3001` (or `http://localhost:5173`).

### Usage Example

```bash
# Check server health
curl http://localhost:3000/health
# Response: {"status":"Server is running","timestamp":"..."}

# Query video list API endpoint
curl http://localhost:3000/api/videos
```

Open `http://localhost:3001` in your browser to browse and stream YouTube videos.

---

## Where Users Can Get Help

- **Documentation & Architecture**: Explore backend services in [`server`](server/) and frontend components in [`client/src`](client/src/).
- **Issue Tracking**: Submit bug reports and feature requests via GitHub Issues.
- **Community Discussions**: Join discussions and get community support via GitHub Discussions.

---

## Who Maintains and Contributes

### Maintainers

Maintained by the core development team and open-source contributors.

### Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
