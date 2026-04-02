import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Scroll tracking logic for hiding/showing navbar
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Hide if scrolling down and past 50px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
        setIsMenuOpen(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      pathRef.current.style.setProperty('--path-length', length)
    }
  }, [])

  // Close menu when a link is clicked
  const handleNavClick = () => setIsMenuOpen(false)

  return (
    <nav className={`${styles.navbar} ${isVisible ? '' : styles.hidden} ${isMenuOpen ? styles.menuOpen : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <svg 
          className={styles.autographSvg} 
          viewBox="0 0 661 444" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            ref={pathRef}
            className={styles.autographPath}
            d="M187.057 208.797C213.943 129.79 256.557 -49.703 265.057 16.297C273.557 82.297 264.781 284.493 280.057 249.797C295.334 215.101 161.639 103.864 19.5572 154.797L535.557 7.79701C535.557 7.79701 82.5572 246.797 31.5572 286.797C-19.4429 326.797 3.17998 324.322 42.0572 304.797C179.94 221.474 174.196 238.95 125.557 299.797C135.594 286.42 141.251 279.827 151.557 274.797C135.503 323.048 145.34 315.912 181.557 269.297C177.185 356.823 148.335 392.187 68.0571 440.297C64.8338 399.484 128.87 344.131 221.057 281.797C275.453 256.282 284.467 257.876 272.057 281.797C436.797 244.18 519.054 209.796 659.557 140.297" 
          />
        </svg>
      </div>

      {/* Desktop: Right side nav wrapper */}
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li><a href="#about">ABOUT</a></li>
          <li><a href="#projects">PROJECTS</a></li>
          <li><a href="#experience">STARTUP</a></li>
        </ul>
        <div className={styles.ctaWrapper}>
          <button 
            className={styles.ctaBtn}
            onClick={() => window.open('/aryaman_sharma_resume_2026.pdf', '_blank', 'noopener,noreferrer')}
          >
            RESUME
          </button>
          <span className={styles.floatingDot} aria-hidden="true" />
        </div>
      </div>

      {/* Mobile: Hamburger button */}
      <button
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.lineTop : ''}`} />
        <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.lineMiddle : ''}`} />
        <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.lineBottom : ''}`} />
      </button>

      {/* Mobile: Drawer */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><a href="#about" onClick={handleNavClick}>ABOUT</a></li>
          <li><a href="#projects" onClick={handleNavClick}>PROJECTS</a></li>
          <li><a href="#experience" onClick={handleNavClick}>STARTUP</a></li>
        </ul>
        <button 
          className={styles.mobileCta}
          onClick={() => {
            setIsMenuOpen(false)
            window.open('/aryaman_sharma_resume_2026.pdf', '_blank', 'noopener,noreferrer')
          }}
        >
          VIEW RESUME →
        </button>
      </div>
    </nav>
  )
}
