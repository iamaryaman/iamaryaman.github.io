import { useState } from 'react';
import styles from './Footer.module.css';
import ContactModal from './ContactModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className={styles.footerSection} id="contact">
      <div className={styles.footerContent}>
        
        {/* Top CTA Block */}
        <div className={styles.ctaBlock}>
          <p className={styles.ctaText}>
            Creating the next best thing humanity needs- designing,<br />
            engineering, tinkering, and building, one step at a time.
          </p>
          <button className={styles.ctaButton} onClick={() => setIsModalOpen(true)}>
            <span>CONTACT ME</span>
            <div className={styles.arrowContainer}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>
        </div>

        {/* Massive Display Text */}
        <div className={styles.massiveTextContainer}>
          <h1 className={styles.massiveText}>build together?</h1>
        </div>

        {/* Bottom Footer Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            {/* Using a highly stylized cursive font equivalent or just pure stroke styling */}
            <span className={styles.signature}>Aryaman</span>
          </div>
          
          <div className={styles.bottomRight}>
            <a href="mailto:aryamansharma2511@gmail.com" className={styles.socialLink}>
              EMAIL
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/aryaman-sharmaa/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LINKEDIN
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <a href="https://github.com/iamaryaman" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GITHUB
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <a href="https://leetcode.com/u/isntitaryaman/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LEETCODE
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Interactive Contact Form Overlay */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
