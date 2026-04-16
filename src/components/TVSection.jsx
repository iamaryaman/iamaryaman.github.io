import tvImage from '../assets/tv.jpg'
import aryamanImg from '../../media/aryaman_photo.jpeg'
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
        {/* Screen content sits behind the TV frame */}
        <div className={styles.tvScreen}>
          <img
            src={aryamanImg}
            alt="Aryaman in TV"
            className={styles.screenMedia}
            draggable={false}
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
