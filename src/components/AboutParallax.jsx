import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Stamp } from './Stamp'
import styles from './AboutParallax.module.css'

import uniImg from '../../media/uni.png'
import winsImg from '../../media/wins.png'
import yoeImg from '../../media/YOE.png'
import nooprojImg from '../../media/NOOPROJ.png'

// Hardcoded data based on the prompt's image_1.png
const stampData = [
  {
    title: "University",
    tagline: "2024-28",
    date: "",
    imageSrc: uniImg, 
  },
  {
    title: "Hackathon Wins",
    tagline: "SDI, BSV, LEAP",
    date: "",
    imageSrc: winsImg, 
  },
  {
    title: "ABOUT ME",
    tagline: "",
    date: "",
    imageSrc: null, 
    isCenter: true // Explicitly marking the center card for special styling
  },
  {
    title: "Years of experience",
    tagline: "SCHOOL, UNI AND STARTUP",
    date: "",
    imageSrc: yoeImg, 
  },
  {
    title: "Number of Projects",
    tagline: "WITH A TEAM OF 4",
    date: "",
    imageSrc: nooprojImg, 
  }
]

export default function AboutParallax() {
  const containerRef = useRef(null)

  // Track scroll progress of this container
  // It has a height of 300vh. Scroll starts when top hits viewport top, ends when bottom hits viewport bottom.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // ── Animations for the OUTER stamps (Indices 0, 1, 3, 4) ──
  // They all START at x: 0% perfectly stacked under the center stamp
  // As we scroll to 1, they fan out to form a row.
  
  // Stamp 0 (Far Left)
  const x0 = useTransform(scrollYProgress, [0, 1], ["0%", "-210%"])

  // Stamp 1 (Mid Left)
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-105%"])

  // Stamp 3 (Mid Right)
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "105%"])

  // Stamp 4 (Far Right)
  const x4 = useTransform(scrollYProgress, [0, 1], ["0%", "210%"])

  // ── Animations for the CENTER stamp (Juspay, Index 2) ──
  // Stays exactly in the center
  const xCenter = "0%"

  // Swap to full-color at the very end of the scroll
  const centerColorOp = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  const transforms = [
    { x: x0, opacity: 1, zIndex: 3, position: 'absolute' },
    { x: x1, opacity: 1, zIndex: 4, position: 'absolute' },
    { x: xCenter, opacity: 1, zIndex: 10, position: 'absolute', fullColorFade: centerColorOp }, // Center
    { x: x3, opacity: 1, zIndex: 4, position: 'absolute' },
    { x: x4, opacity: 1, zIndex: 3, position: 'absolute' }
  ]

  return (
    <div ref={containerRef} className={styles.scrollContainer} id="about">
      {/* Sticky container holds the stamps perfectly centered in the viewport */}
      <div className={styles.stickySection}>
        <div className={styles.stampsRow}>
          {stampData.map((data, i) => {
            const style = transforms[i]
            return (
              <Stamp
                key={data.id || i}
                title={data.title}
                tagline={data.tagline}
                date={data.date}
                imageSrc={data.imageSrc}
                isCenter={data.isCenter}
                style={style}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
