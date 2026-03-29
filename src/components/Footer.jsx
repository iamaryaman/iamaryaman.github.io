import { useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import styles from './Footer.module.css';
import ContactForm from './ContactForm';

// ── Social link definitions (shared between both footer states) ──
const SOCIAL_LINKS = [
  { label: 'EMAIL', href: 'mailto:aryamansharma2511@gmail.com', external: false },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/aryaman-sharmaa/', external: true },
  { label: 'GITHUB', href: 'https://github.com/iamaryaman', external: true },
  { label: 'LEETCODE', href: 'https://leetcode.com/u/isntitaryaman/', external: true },
];

// Arrow SVG reused in social links
function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  );
}

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const isAnimating = useRef(false);

  // ── Animate wave sweep OPEN ──
  const openContact = async () => {
    if (isAnimating.current || isContactOpen) return;
    isAnimating.current = true;

    // 1. Slide the wave element in from left to right
    await animate(
      `.${styles.waveBar}`,
      { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] },
      { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
    );
    // 2. Swap visible state mid-wave
    setIsContactOpen(true);
    // 3. Slide wave OUT to the right side
    await animate(
      `.${styles.waveBar}`,
      { clipPath: ['inset(0 0% 0 0)', 'inset(0 0% 0 100%)'] },
      { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    );
    // 4. Reset clip so it is invisible and ready for next use
    animate(`.${styles.waveBar}`, { clipPath: 'inset(0 100% 0 0)' }, { duration: 0 });

    isAnimating.current = false;
  };

  // ── Animate wave sweep CLOSE ──
  const closeContact = async () => {
    if (isAnimating.current || !isContactOpen) return;
    isAnimating.current = true;

    await animate(
      `.${styles.waveBar}`,
      { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] },
      { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
    );
    setIsContactOpen(false);
    await animate(
      `.${styles.waveBar}`,
      { clipPath: ['inset(0 0% 0 0)', 'inset(0 0% 0 100%)'] },
      { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    );
    animate(`.${styles.waveBar}`, { clipPath: 'inset(0 100% 0 0)' }, { duration: 0 });

    isAnimating.current = false;
  };

  return (
    <footer className={styles.footerSection} id="contact" ref={scope}>

      {/* ── WAVE SWEEP OVERLAY ──────────────────────────────── */}
      {/* Always mounted but invisible via clip-path */}
      <div
        className={styles.waveBar}
        style={{ clipPath: 'inset(0 100% 0 0)' }}
        aria-hidden="true"
      />

      {/* ── FOOTER CONTENT WRAPPER ──────────────────────────── */}
      <div className={styles.footerContent}>

        {/* ── STANDARD CONTENT (vanishes on open) ── */}
        <AnimatePresence mode="wait">
          {!isContactOpen && (
            <motion.div
              key="standard"
              className={styles.standardContent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {/* Top CTA Block */}
              <div className={styles.ctaBlock}>
                <p className={styles.ctaText}>
                  Creating the next best thing humanity needs- designing,<br />
                  engineering, tinkering, and building, one step at a time.
                </p>
                <button
                  className={styles.ctaButton}
                  onClick={openContact}
                  id="footer-contact-btn"
                >
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
                <h2 className={styles.massiveText}>build together?</h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CONTACT FORM (appears on open) ── */}
        <AnimatePresence mode="wait">
          {isContactOpen && (
            <motion.div
              key="contact"
              className={styles.contactWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.05 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {/* Back button */}
              <button
                className={styles.backBtn}
                onClick={closeContact}
                id="footer-back-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>BACK</span>
              </button>

              <ContactForm socialLinks={SOCIAL_LINKS} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM BAR (always visible) ────────────────────── */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.signature}>Aryaman</span>
          </div>

          {/* Social links: always rendered, layout animates position */}
          <motion.div layout className={styles.bottomRight}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={styles.socialLink}
              >
                {link.label}
                <ArrowIcon />
              </a>
            ))}
          </motion.div>
        </div>

      </div>
    </footer>
  );
}
