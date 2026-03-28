import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Preloader.module.css'

export default function Preloader({ onComplete }) {
  const pathRef = useRef(null)

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      pathRef.current.style.setProperty('--path-length', length)
    }
    
    // Hold for 3.2s (drawing 2.5s, shrinking 0.5s, slight buffer) then clear
    const timer = setTimeout(() => {
      onComplete()
    }, 3200)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div 
      className={styles.preloader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.svg 
        className={styles.signatureSvg} 
        viewBox="0 0 661 444" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1, 0] }}
        transition={{ 
          duration: 3, 
          times: [0, 0.85, 1], 
          ease: "easeInOut" 
        }}
      >
        <path 
          ref={pathRef}
          className={styles.signaturePath}
          d="M187.057 208.797C213.943 129.79 256.557 -49.703 265.057 16.297C273.557 82.297 264.781 284.493 280.057 249.797C295.334 215.101 161.639 103.864 19.5572 154.797L535.557 7.79701C535.557 7.79701 82.5572 246.797 31.5572 286.797C-19.4429 326.797 3.17998 324.322 42.0572 304.797C179.94 221.474 174.196 238.95 125.557 299.797C135.594 286.42 141.251 279.827 151.557 274.797C135.503 323.048 145.34 315.912 181.557 269.297C177.185 356.823 148.335 392.187 68.0571 440.297C64.8338 399.484 128.87 344.131 221.057 281.797C275.453 256.282 284.467 257.876 272.057 281.797C436.797 244.18 519.054 209.796 659.557 140.297" 
        />
      </motion.svg>
    </motion.div>
  )
}
