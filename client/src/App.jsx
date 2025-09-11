import React, { useState } from 'react'
import VideoList from './components/VideoList'
import VideoPlayer from './components/VideoPlayer'
import './App.css'

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const handleClosePlayer = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎥 YouTube Video Collection</h1>
        <p>Discover amazing videos from our curated collection</p>
      </header>
      
      <main className="App-main">
        <VideoList onVideoSelect={handleVideoSelect} />
      </main>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  )
}

export default App
