const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const mongoClient = new MongoClient(process.env.MONGODB_URI);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoClient.connect();
    db = mongoClient.db('youtube-videos');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

// Search terms for random video discovery
const searchTerms = [
  'official music video',
  'popular songs 2024',
  'viral music',
  'trending songs',
  'hit music',
  'top songs'
];

// Fetch random videos from YouTube API
async function fetchRandomVideos(count = 10) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  
  if (!API_KEY || API_KEY === 'your_youtube_api_key_here') {
    console.log('❌ YouTube API key not configured');
    return [];
  }

  try {
    console.log(`🔍 Fetching ${count} random videos from YouTube...`);
    
    // Random search term
    const searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    // Search for videos
    const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchTerm,
        type: 'video',
        order: 'relevance',
        maxResults: count * 2, // Get more to filter and randomize
        key: API_KEY,
        videoCategoryId: '10', // Music category
        publishedAfter: '2020-01-01T00:00:00Z'
      }
    });

    if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
      console.log('❌ No videos found');
      return [];
    }

    // Get random video IDs
    const videoIds = searchResponse.data.items
      .map(item => item.id.videoId)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    // Fetch detailed video information
    const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
        key: API_KEY
      }
    });

    const videos = videoResponse.data.items.map(video => ({
      videoId: video.id,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      thumbnails: video.snippet.thumbnails,
      duration: video.contentDetails.duration,
      viewCount: video.statistics.viewCount || '0',
      publishedAt: video.snippet.publishedAt,
      description: video.snippet.description || '',
      fetchedAt: new Date()
    }));

    console.log(`✅ Fetched ${videos.length} videos from YouTube API`);
    return videos;

  } catch (error) {
    console.error('❌ YouTube API error:', error.response?.data?.error?.message || error.message);
    return [];
  }
}

// Save videos to MongoDB
async function saveVideosToDatabase(videos) {
  if (videos.length === 0) return;
  
  try {
    // Insert videos (replace existing collection)
    await db.collection('videos').deleteMany({});
    const result = await db.collection('videos').insertMany(videos);
    console.log(`💾 Saved ${result.insertedCount} videos to database`);
  } catch (error) {
    console.error('❌ Database save error:', error);
  }
}

// Route to get videos - fetches from API and saves to DB dynamically
app.get('/api/videos', async (req, res) => {
  try {
    // Check if we have recent videos in database (within last hour)
    const recentVideos = await db.collection('videos')
      .find({ fetchedAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } })
      .toArray();

    if (recentVideos.length > 0) {
      console.log(`📱 Serving ${recentVideos.length} cached videos`);
      return res.json(recentVideos);
    }

    // Fetch fresh videos from YouTube API
    const freshVideos = await fetchRandomVideos(10);
    
    if (freshVideos.length === 0) {
      // If API fails, try to serve any existing videos from database
      const existingVideos = await db.collection('videos').find({}).toArray();
      if (existingVideos.length > 0) {
        console.log('⚠️ API failed, serving existing database videos');
        return res.json(existingVideos);
      }
      
      return res.status(503).json({ error: 'Unable to fetch videos from YouTube API' });
    }

    // Save fresh videos to database
    await saveVideosToDatabase(freshVideos);
    
    res.json(freshVideos);
  } catch (error) {
    console.error('❌ Error in /api/videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  await mongoClient.close();
  process.exit(0);
});
