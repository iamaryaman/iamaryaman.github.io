import tvImage from '../assets/tv.png'
import styles from './TVSection.module.css'

export default function TVSection() {
  return (
    <section className={styles.tvSection}>
      {/* Left label */}
      <div className={styles.labelLeft}>
        <span className={styles.labelPrefix}>A.</span>
        <span className={styles.labelMain}>Foundation</span>
        <span className={styles.slash}>/</span>
      </div>

      {/* TV Container */}
      <div className={styles.tvContainer}>
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
