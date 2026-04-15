import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectOverlay.module.css';

const RotatingEvents = ({ events }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!events || events.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events]);

  if (!events || events.length === 0) return null;

  return (
    <div className={styles.rotatingEventsContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.rotatingEventText}
        >
          {events[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ProjectOverlay — Fullscreen Takeover (No Scroll Version)
   ─────────────────────────────────────────────────────────────
   Modal replacement that occupies 100vw/100vh. Everything fits in view.
   Right Sidebar: Thumbnail images flexed properly.
   Main Area: Split into two sub-sections by a vertical dividing line.
   Wheel Event: Scrolling traverses the list of projects.
   Animations: Strict top-to-bottom hierarchy stagger.
   ──────────────────────────────────────────────────────────── */

export default function ProjectOverlay({ projectImages = [], projectDetails = {}, icons = {}, initialIndex, onClose }) {
  if (!projectImages.length) return null;

  const [activeIndex, setActiveIndex] = useState(initialIndex || projectImages[0].id);
  const isThrottled = useRef(false);

  // Derive active data
  const activeImg = useMemo(() => projectImages.find(i => i.id === activeIndex) || projectImages[0], [activeIndex, projectImages]);
  const activeProject = useMemo(() => projectDetails[activeIndex] || {}, [activeIndex, projectDetails]);

  const {
    name,
    fullName,
    events,
    aboutText,
    engineeringText,
    clientName,
    websiteUrl,
    demoUrl,
    githubUrl,
    youtubeUrl,
    stackCols = 2,
    stack = []
  } = activeProject;

  const eventsArray = Array.isArray(events) ? events : [events];
  const client = clientName || (eventsArray.length ? eventsArray[0] : null);

  const aboutParagraphs = aboutText ? (Array.isArray(aboutText) ? aboutText : [aboutText]) : null;
  const engineeringParagraphs = engineeringText ? (Array.isArray(engineeringText) ? engineeringText : [engineeringText]) : null;

  const visitLink = websiteUrl || demoUrl || null;

  const links = [];
  if (youtubeUrl && youtubeUrl !== '#') links.push({ label: 'View Demo', url: youtubeUrl });
  if (visitLink) {
    let label = 'Visit Site';
    if ([1, 2, 3, 4, 5].includes(activeIndex)) label = 'View Zomakarb';
    else if ([6, 7, 8].includes(activeIndex)) label = 'Github Repository';
    links.push({ label, url: visitLink });
  }
  if (githubUrl && githubUrl !== '#') links.push({ label: 'Source Code', url: githubUrl });

  // Wheel traversal logic
  const handleWheel = (e) => {
    // Only intercept noticeable scrolls
    if (Math.abs(e.deltaY) < 20) return;
    
    if (isThrottled.current) return;
    isThrottled.current = true;

    const currIdx = projectImages.findIndex(img => img.id === activeIndex);
    const direction = e.deltaY > 0 ? 1 : -1;
    
    let nextIdx = currIdx + direction;
    if (nextIdx < 0) nextIdx = projectImages.length - 1;
    if (nextIdx >= projectImages.length) nextIdx = 0;

    setActiveIndex(projectImages[nextIdx].id);

    // Throttle duration slightly longer than crossfade
    setTimeout(() => {
      isThrottled.current = false;
    }, 700);
  };

  // ── Hierarchy Animation Variants ──
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24, 
        delay: customDelay * 0.1 
      }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
  };

  const bgVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className={styles.overlay} onWheel={handleWheel}>
      
      {/* ── Background Layer ── */}
      <div className={styles.bgContainer}>
        <AnimatePresence>
          <motion.img
            key={activeImg.id}
            src={activeImg.src}
            alt=""
            className={styles.bgImage}
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className={styles.bgOverlay} />
      </div>

      {/* ── Content Layer ── */}
      <div className={styles.contentWrapper}>
        
        {/* ── MAIN SPLIT AREA ── */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeIndex + "main"}
            className={styles.mainArea}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            
            {/* Sub-section 1: Left */}
            <div className={styles.leftSubSection}>
              <div className={styles.leftInner}>
                
                <div className={styles.leftTop}>
                  <motion.h2 variants={itemVariants} custom={1} className={styles.massiveTitle}>
                    {name}
                  </motion.h2>

                  {fullName && (
                    <motion.div variants={itemVariants} custom={1.5} className={styles.linedSmallText}>
                      <span>{fullName}</span>
                    </motion.div>
                  )}
                  
                  {client && (
                    <motion.div variants={itemVariants} custom={2} className={styles.clientTag}>
                      {client}
                    </motion.div>
                  )}
                </div>

                <div className={styles.leftMiddle}>
                  {/* Quick Links */}
                  {(links.length > 0) && (
                    <motion.div variants={itemVariants} custom={3} className={styles.quickLinks}>
                      {links.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className={idx === 0 ? styles.primaryLinkBtn : styles.linkBtn}>
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className={styles.leftBottom}>
                  {/* Tech Stack */}
                  {stack.length > 0 && (
                    <motion.div variants={itemVariants} custom={5} className={styles.techSection}>
                      <span className={styles.techLabel}>Techstack</span>
                      <div className={styles.techGrid} style={{ gridTemplateColumns: `repeat(${stackCols}, 1fr)` }}>
                        {stack.map((item) => {
                          const icon = icons[item];
                          if (!icon) return null;
                          return (
                            <img
                              key={item}
                              src={icon.src}
                              alt={icon.name}
                              title={icon.name}
                              className={styles.techIcon}
                              style={icon.dark ? { filter: 'invert(1) opacity(0.8)' } : { opacity: 0.8 }}
                            />
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>
            </div>

            {/* Sub-section 2: Center Content */}
            <div className={styles.centerSubSection}>
              <div className={styles.centerInner}>
                
                <motion.div variants={itemVariants} custom={1}>
                  <h1 className={styles.projectTitle}>Presented In</h1>
                </motion.div>

                {eventsArray.filter(Boolean).length > 0 && (
                  <motion.div variants={itemVariants} custom={2}>
                    <RotatingEvents events={eventsArray.filter(Boolean)} />
                  </motion.div>
                )}

                {/* Description Block */}
                <div className={styles.textStack}>
                  {aboutParagraphs && (
                     <motion.div variants={itemVariants} custom={3} className={styles.textColumn}>
                       {aboutParagraphs.map((p, i) => (
                         <p key={i} className={styles.textBody}>{p}</p>
                       ))}
                     </motion.div>
                  )}
                  {engineeringParagraphs && (
                     <motion.div variants={itemVariants} custom={4} className={styles.textColumn}>
                       <span className={styles.textLabel}>Engineering details</span>
                       {engineeringParagraphs.map((p, i) => (
                         <p key={i} className={styles.textBodySub}>{p}</p>
                       ))}
                     </motion.div>
                  )}
                </div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* ── RIGHT NAV CAROUSEL (THUMBNAILS) ── */}
        <div className={styles.rightNavSidebar}>
          <div className={styles.navScrollArea}>
            {projectImages.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(img.id)}
                className={`${styles.thumbnailBtn} ${activeIndex === img.id ? styles.activeThumbnail : ''}`}
                aria-label={img.alt}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className={styles.thumbnailImg} 
                  loading="lazy" 
                  style={{ objectPosition: img.position || 'center' }}
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
