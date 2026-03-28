import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import HeroTypography from './components/HeroTypography'
import TVSection from './components/TVSection'
import AboutParallax from './components/AboutParallax'
import TechStack from './components/TechStack'
import QuoteBanner from './components/QuoteBanner'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import styles from './App.module.css'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className={styles.page}>
        <div className={styles.heroViewport}>
          <Navbar />
          <HeroTypography />
          <TVSection />
        </div>
        <AboutParallax />
        <QuoteBanner />
        <TechStack />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </>
  )
}
