import React from 'react'
import './VideoCard.css'
import { truncateText } from '../utils'

const VideoCard = ({ video, onClick }) => {
  const getThumbnailUrl = () => {
    // Use the highest quality thumbnail available
    const { thumbnails } = video
    if (thumbnails?.maxres?.url) return thumbnails.maxres.url
    if (thumbnails?.high?.url) return thumbnails.high.url
    if (thumbnails?.medium?.url) return thumbnails.medium.url
    if (thumbnails?.default?.url) return thumbnails.default.url
    return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
  }

  return (
    <div className="video-card" onClick={onClick}>
      <div className="video-thumbnail-container">
        <img
          src={getThumbnailUrl()}
          alt={video.title}
          className="video-thumbnail"
          loading="lazy"
        />
        <div className="video-duration">
          {video.duration}
        </div>
      </div>
      
      <div className="video-info">
        <h3 className="video-title">
          {truncateText(video.title, 80)}
        </h3>
        
        <div className="video-metadata">
          <p className="video-channel">
            {video.channelTitle}
          </p>
          <div className="video-stats">
            <span className="video-views">
              {video.viewCount} views
            </span>
            <span className="video-separator">•</span>
            <span className="video-published">
              {video.publishedAt}
            </span>
          </div>
        </div>
      </div>
      
      <div className="video-card-overlay">
        <div className="play-icon">▶</div>
      </div>
    </div>
  )
}

export default VideoCard
