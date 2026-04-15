import { useState } from 'react'
import tvImage from '../assets/tv.jpg'
import styles from './TVSection.module.css'

// Placeholder image if video fails or while loading
const PLACEHOLDER_SRC = '/tv_placeholder.png'

// REPLACE these with your actual AWS S3 URLs once you have uploaded the 8 videos!
const VIDEO_CHANNELS = [
  "https://iamaryaman-website-bucket.s3.ap-south-1.amazonaws.com/tv/Video+Project+2+(2).mp4"
];

export default function TVSection() {
  const [currentChannel, setCurrentChannel] = useState(0)
  
  // Go to next video
  const handleNextChannel = () => {
    setCurrentChannel((prev) => (prev + 1) % VIDEO_CHANNELS.length)
  }

  return (
    <section className={styles.tvSection}>
      {/* Left label */}
      <div className={styles.labelLeft}>
        <span className={styles.labelPrefix}>A.</span>
        <span className={styles.labelMain}>Foundation</span>
        <span className={styles.slash}>/</span>
      </div>

      {/* TV Container - click to change channel */}
      <div className={styles.tvContainer} onClick={handleNextChannel} title="Click to Change Channel">
        {/* Screen content sits behind the TV frame */}
        <div className={styles.tvScreen}>
          <video
            key={VIDEO_CHANNELS[currentChannel]} // Forces video to reload when source changes
            src={VIDEO_CHANNELS[currentChannel]}
            className={styles.screenMedia}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={handleNextChannel} // Auto-play next channel when current ends
            poster={PLACEHOLDER_SRC} // Shows the retro TV static while buffering
          />
        </div>

        {/* TV frame — original photo */}
        <img
          src={tvImage}
          alt="Retro TV"
          className={styles.tvImage}
          draggable={false}
        />
      </div>

      {/* Right label */}
      <div className={styles.labelRight}>
        <span className={styles.labelPrefix}>for</span>
        <span className={styles.labelMain}>Innovation</span>
        <span className={styles.slash}>/</span>
        <span className={styles.labelPrefix}>in</span>
        <span className={styles.labelMain}>Technology</span>
      </div>
    </section>
  )
}
