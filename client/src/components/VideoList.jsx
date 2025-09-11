import React, { useState, useEffect } from 'react'
import axios from 'axios'
import VideoCard from './VideoCard'
import './VideoList.css'

import { formatViewCount, formatDuration, formatPublishedDate } from '../utils'

const VideoList = ({ onVideoSelect }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('/api/videos')
      setVideos(response.data)
    } catch (err) {
      console.error('Error fetching videos:', err)
      setError('Failed to load videos. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="video-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading amazing videos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="video-list-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchVideos} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="video-list-container">
      <h2 className="section-title">Featured Videos</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={{
              ...video,
              viewCount: formatViewCount(video.viewCount),
              duration: formatDuration(video.duration),
              publishedAt: formatPublishedDate(video.publishedAt)
            }}
            onClick={() => onVideoSelect(video)}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoList
