import styles from './HeroTypography.module.css'
import TextType from './TextType';

/* Hand-drawn yellow smiley face SVG */
function SmileySVG() {
  return (
    <svg
      viewBox="0 0 80 80"
      width="72"
      height="72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.smiley}
    >
      {/* Outer circle - hand-drawn style with slight imperfection */}
      <path
        d="M40 6 C60 5, 76 22, 75 42 C74 62, 58 76, 38 75 C18 74, 4 58, 5 38 C6 18, 20 7, 40 6Z"
        stroke="#F5C842"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left eye */}
      <circle cx="28" cy="30" r="3" fill="#F5C842" />
      {/* Right eye */}
      <circle cx="52" cy="30" r="3" fill="#F5C842" />
      {/* Smile - curved path */}
      <path
        d="M24 48 Q40 62 56 48"
        stroke="#F5C842"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export default function HeroTypography() {
  return (
    <section className={styles.hero}>
      {/* Line 1 wrapper */}
      <div className={styles.line1Wrapper}>
        <h1 className={styles.line1}>Aryaman Sharma</h1>
        {/* Top-right smiley accent — positioned relative to line1Wrapper */}
        <div className={styles.smileyAccent}>
          <SmileySVG />
          <span className={styles.smileyLabel}>Taking up<br />projects</span>
        </div>
      </div>

      {/* Line 2 wrapper */}
      <div className={styles.line2Wrapper}>
        {/* Left small text block */}
        <p className={styles.sideText}>
          Designing for the future of tech, crafting authentic solutions for real-life problems, changing how we use the internet
        </p>
        <TextType 
          as="h1" 
          className={styles.line2}
          text={['designer', 'founder', 'engineer', 'developer']}
          pauseDuration={3000}
          typingSpeed={60}
          deletingSpeed={30}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>
    </section>
  )
}
