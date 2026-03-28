import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Stamp.module.css'

export const Stamp = forwardRef(({ 
  title, 
  tagline, 
  date, 
  imageSrc, 
  isCenter = false,
  style
}, ref) => {
  const { ...restStyle } = style || {}
  
  return (
    <motion.div 
      ref={ref}
      className={`${styles.stampWrapper} ${isCenter ? styles.centerStamp : ''}`}
      style={restStyle}
    >
      <div className={styles.stampInner}>
        {isCenter ? (
          <div className={styles.centerContent}>
            <h1 className={styles.centerTitle}>ABOUT ME</h1>
          </div>
        ) : (
          <>
            {/* Image area (top ~60%) */}
            <div className={styles.imageContainer}>
              {imageSrc ? (
                <img src={imageSrc} alt={title} className={styles.image} draggable={false} />
              ) : (
                <div className={styles.placeholderImage} />
              )}
            </div>

            {/* Text content (bottom ~40%) */}
            <div className={styles.contentBlock}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.taglineRow}>
                <span className={styles.tagline}>{tagline}</span>
                <span className={styles.date}>{date}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
})

Stamp.displayName = 'Stamp'
