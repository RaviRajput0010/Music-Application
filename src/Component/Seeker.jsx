import { useContext, useEffect, useState } from 'react'
import { img1 } from '../Assests/images'
import './Seeker.css'
import { Context } from '../Context'

function Seeker() {
  const { playingone, Duration, changeimage, changesongname } = useContext(Context)

  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Update percentage as song plays
  useEffect(() => {
    const interval = setInterval(() => {
      if (playingone.current && Duration > 0) {
        setPercentage((playingone.current.currentTime / Duration) * 100)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [playingone, Duration])

  // Seek when user changes slider
  const handleSeek = (e) => {
    const newPercentage = e.target.value
    setPercentage(newPercentage)

    if (playingone.current && Duration > 0) {
      playingone.current.currentTime = (newPercentage / 100) * Duration
    }
  }

  // Listen for play/pause
  useEffect(() => {
    if (!playingone.current) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    playingone.current.addEventListener('play', handlePlay)
    playingone.current.addEventListener('pause', handlePause)

    return () => {
      playingone.current?.removeEventListener('play', handlePlay)
      playingone.current?.removeEventListener('pause', handlePause)
    }
  }, [playingone])

  function togglePlayPause() {
    if (!playingone.current) return

    if (playingone.current.paused) {
      playingone.current.play()
      setIsPlaying(true)
    } else {
      playingone.current.pause()
      setIsPlaying(false)
    }
  }

  function skipForward() {
    if (playingone.current) {
      playingone.current.currentTime += 10
    }
  }

  function skipBackward() {
    if (playingone.current) {
      playingone.current.currentTime -= 10
    }
  }

  return (
    <div className='seek'>
      <div className="left1">
        <img src={changeimage} alt="song" />
        <div className="details">
          <p><span>{changesongname}</span></p>
        </div>
      </div>

      <div className="center1">
        <div className="controls">
          <button onClick={skipBackward}><img src={img1.left} alt="Back" /></button>
          <button onClick={togglePlayPause}>
            <img src={isPlaying ? img1.pause : img1.play1} alt="Play/Pause" />
          </button>
          <button onClick={skipForward}><img src={img1.right} alt="Forward" /></button>
        </div>
      </div>

      <div className="right1">
        <input
          type="range"
          className="seekbar"
          min="0"
          max="100"
          value={percentage}
          onChange={handleSeek}
        />
      </div>
    </div>
  )
}

export default Seeker
