import styles from './AboutMobile.module.css'
import uniImg from '../../media/uni.png'
import winsImg from '../../media/wins.png'
import yoeImg from '../../media/YOE.png'
import nooprojImg from '../../media/NOOPROJ.png'

const stats = [
  {
    index: '01',
    category: 'Education',
    title: 'University',
    tagline: '2024 – 28',
    imageSrc: uniImg,
    objectPosition: '62.5% center',
  },
  {
    index: '02',
    category: 'Achievements',
    title: 'Hackathon Wins',
    tagline: 'SDI, BSV, LEAP',
    imageSrc: winsImg,
  },
  {
    index: '03',
    category: 'Experience',
    title: 'Years of Experience',
    tagline: 'School, Uni & Startup',
    imageSrc: yoeImg,
  },
  {
    index: '04',
    category: 'Portfolio',
    title: 'Projects Built',
    tagline: 'With a Team of 4',
    imageSrc: nooprojImg,
  },
]

export default function AboutMobile() {
  return (
    <section className={styles.section} id="about">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerLabel}>Portfolio</span>
        <h2 className={styles.headerTitle}>About Me</h2>

      </div>

      {/* Cards grid */}
      <div className={styles.grid}>
        {stats.map((item) => (
          <div key={item.index} className={styles.card}>
            {/* Top bar */}
            <div className={styles.cardHeader}>
              <span className={styles.cardIndex}>{item.index}</span>
              <span className={styles.cardCategory}>{item.category}</span>
            </div>

            {/* Image */}
            <div className={styles.cardImage}>
              <img 
                src={item.imageSrc} 
                alt={item.title} 
                draggable={false} 
                style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
              />
            </div>

            {/* Bottom text */}
            <div className={styles.cardFooter}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <span className={styles.cardTagline}>{item.tagline}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
