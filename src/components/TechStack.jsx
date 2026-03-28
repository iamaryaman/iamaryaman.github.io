import styles from './TechStack.module.css'

const clientIcons = [
  { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Framer', src: 'https://cdn.simpleicons.org/framer/000000', isBlack: true },
  { name: 'Canva', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
  { name: 'Android', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { name: 'Arduino', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
  { name: 'Kotlin', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'OpenCV', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  { name: 'NumPy', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Scikit-learn', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'TensorFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Keras', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
  { name: 'Matplotlib', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
  { name: 'Pandas', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', isBlack: true }
]

const serverIcons = [
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', isBlack: true },
  { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Microsoft SQL Server', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Firebase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Supabase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'JWT', src: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff', isWhite: true },
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', isBlack: true },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Bash', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', isBlack: true },
  { name: 'Postman', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name: 'Vercel', src: 'https://cdn.simpleicons.org/vercel/000000', isBlack: true },
  { name: 'Netlify', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
  { name: 'FFmpeg', src: 'https://cdn.simpleicons.org/ffmpeg/000000', isBlack: true },
  { name: 'LaTeX', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg', isBlack: true }
]

export default function TechStack() {
  return (
    <section className={styles.techSection} id="tech-stack">
      
      <h2 className={styles.sectionHeading}>Tech Stack</h2>

      <div className={styles.panesContainer}>
        {/* Left Pane - Blue Background */}
        <div className={styles.leftPane}>
          <div className={styles.leftCard}>
            <div className={styles.leftCardTop}>
              <h3 className={styles.cardTitle}>Design &<br/>Client-Side UX</h3>
            </div>
            <div className={styles.leftCardBottom}>
              <div className={styles.iconGrid}>
                {clientIcons.map((icon, idx) => (
                  <div key={idx} className={styles.techIcon} title={icon.name}>
                    {/* Left card has cream background in bottom mostly, so invert white JWTs to black */}
                    <img src={icon.src} alt={icon.name} className={icon.isWhite ? styles.invertImg : ''} draggable="false" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Dark Blocky Background */}
        <div className={styles.rightPane}>
          <div className={styles.rightCard}>
            <div className={styles.rightCardTop}>
              <h3 className={styles.cardTitle}>Architecture &<br/>Infrastructure</h3>
            </div>
            
            <div className={styles.rightCardBottom}>
              <div className={styles.iconGridRight}>
                {serverIcons.map((icon, idx) => (
                  <div key={idx} className={styles.techIconRight} title={icon.name}>
                    <img src={icon.src} alt={icon.name} className={icon.isWhite ? styles.invertImg : ''} draggable="false" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
