import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './QuoteBanner.module.css'

gsap.registerPlugin(ScrollTrigger)

const QUOTE = 'a nothing but everything engineer'

export default function QuoteBanner() {
  const containerRef = useRef(null)
  const quoteLineRef = useRef(null)

  useEffect(() => {
    const lineEl = quoteLineRef.current
    if (!lineEl) return

    // Split into individual character spans
    lineEl.innerHTML = ''
    QUOTE.split('').forEach((char) => {
      const span = document.createElement('span')
      span.className = styles.char
      span.textContent = char === ' ' ? '\u00A0' : char
      lineEl.appendChild(span)
    })

    const chars = lineEl.querySelectorAll(`.${styles.char}`)

    // Set initial hidden state so chars are invisible before trigger fires
    gsap.set(chars, { opacity: 0, y: 48, rotateX: -30 })

    const tween = gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.028,
      paused: true,
      willChange: 'transform, opacity',
      force3D: true,
    })

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        tween.restart()
      },
      onEnterBack: () => {
        tween.restart()
      },
      onLeave: () => {
        // Reset chars to hidden so they re-animate cleanly on next enter
        tween.pause(0)
        gsap.set(chars, { opacity: 0, y: 48, rotateX: -30 })
      },
      onLeaveBack: () => {
        tween.pause(0)
        gsap.set(chars, { opacity: 0, y: 48, rotateX: -30 })
      },
    })

    return () => {
      st.kill()
      tween.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.quoteBanner}>
      <p className={styles.quoteText}>
        <span ref={quoteLineRef} className={styles.quoteLine} />
      </p>
    </div>
  )
}
