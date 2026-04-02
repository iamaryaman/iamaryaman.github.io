import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Stamp.module.css'

// Category labels for each stamp (except center)
const CATEGORIES = ['Education', 'Achievements', null, 'Experience', 'Portfolio']
const INDICES    = ['01', '02', null, '03', '04']

export const Stamp = forwardRef(({ 
  title, 
  tagline, 
  date, 
  imageSrc, 
  isCenter = false,
  style,
  stampIndex
}, ref) => {
  const { ...restStyle } = style || {}
  
  const category = CATEGORIES[stampIndex] ?? ''
  const idx      = INDICES[stampIndex]    ?? ''

  return (
    <motion.div 
      ref={ref}
      className={`${styles.stampWrapper} ${isCenter ? styles.centerStamp : ''}`}
      style={restStyle}
      whileHover={!isCenter ? { scale: 1.04, y: -12, zIndex: 20 } : {}}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className={styles.stampInner}>
        {isCenter ? (
          /* ── CENTER: "ABOUT ME" postmark card ── */
          <div className={styles.centerContent}>
            <span className={styles.centerLabel}>Portfolio</span>
            <h1 className={styles.centerTitle}>About<br/>Me</h1>
            <span className={styles.centerYear}>Est. 2024</span>
          </div>
        ) : (
          <>
            {/* ── TOP HEADER BAND ── */}
            <div className={styles.cardHeader}>
              <span className={styles.cardIndex}>{idx}</span>
              <span className={styles.cardCategory}>{category}</span>
            </div>

            {/* ── IMAGE AREA ── */}
            <div className={styles.imageContainer}>
              {imageSrc ? (
                <img src={imageSrc} alt={title} className={styles.image} draggable={false} />
              ) : (
                <div className={styles.placeholderImage} />
              )}
            </div>

            {/* ── BOTTOM METADATA ── */}
            <div className={styles.contentBlock}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.taglineRow}>
                <span className={styles.tagline}>{tagline}</span>
                <span className={styles.serialNum}>2024 · PRTCL</span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
})

Stamp.displayName = 'Stamp'
