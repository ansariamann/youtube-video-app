import React, { useEffect } from 'react'
import './VideoPlayer.css'
import { formatViewCount, formatPublishedDate, truncateText } from '../utils'

const VideoPlayer = ({ video, onClose }) => {
  // Close player on escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Prevent body scroll when player is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const getEmbedUrl = () => {
    return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`
  }

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div className="video-player-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        <div className="video-player-container">
          <div className="video-embed">
            <iframe
              src={getEmbedUrl()}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="video-details">
            <h2 className="video-title">{video.title}</h2>
            
            <div className="video-meta">
              <div className="channel-info">
                <h3 className="channel-name">{video.channelTitle}</h3>
              </div>
              
              <div className="video-stats">
                <span className="views">{formatViewCount(video.viewCount)} views</span>
                <span className="separator">•</span>
                <span className="published">
                  {formatPublishedDate(video.publishedAt)}
                </span>
              </div>
            </div>
            
            <div className="video-description">
              <h4>Description</h4>
              <p>{truncateText(video.description, 300)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
