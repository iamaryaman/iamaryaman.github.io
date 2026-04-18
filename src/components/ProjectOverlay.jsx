import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubLogo, Globe, YoutubeLogo } from '@phosphor-icons/react';
import logoImg from '../../media/logo.png';
import mbclImg from '../../media/mbcl_logo.png';
import styles from './ProjectOverlay.module.css';

const TypewriterText = ({ texts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        // next tick will start typing
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }, 30);
      }
    } else {
      if (displayText === currentText) {
        if (texts.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
        }
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, 70);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  return (
    <span>{displayText}<span className={styles.cursor}></span></span>
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

/* ── Mobile detection hook ── */
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(`(max-width:${bp}px)`).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width:${bp}px)`);
    const cb = (e) => setMobile(e.matches);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  }, [bp]);
  return mobile;
}

export default function ProjectOverlay({ projectImages = [], projectDetails = {}, icons = {}, initialIndex, onClose }) {
  if (!projectImages.length) return null;

  const isMobile = useIsMobile();
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
  
  if (visitLink && visitLink !== '#') {
    let label = 'View Website';
    if (activeIndex === 1) label = 'View MBCL';
    else if ([2, 3, 4, 5].includes(activeIndex)) label = 'View Zomakarb';
    if (![6,7,8].includes(activeIndex)) {
      links.push({ label, url: visitLink });
    }
  }

  if (githubUrl && githubUrl !== '#') {
    let label = 'Source Code';
    if ([2, 3, 4, 5].includes(activeIndex)) label = 'Learn More';
    else if ([6, 7, 8].includes(activeIndex)) label = 'Github Repository';
    
    links.push({ label, url: githubUrl });
  }

  // Wheel traversal logic (desktop only — mobile scrolls content)
  const handleWheel = (e) => {
    if (isMobile) return; // let content scroll naturally on mobile
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
                      {links.map((link, idx) => {
                        let Icon = null;
                        let CustomImg = null;
                        if (link.label === 'Github Repository' || link.label === 'Source Code' || link.label === 'Learn More') Icon = GithubLogo;
                        else if (link.label === 'View Zomakarb') CustomImg = logoImg;
                        else if (link.label === 'View MBCL') CustomImg = mbclImg;
                        else if (link.label === 'View Website') Icon = Globe;
                        else if (link.label === 'View Demo') Icon = YoutubeLogo;

                        return (
                          <a key={idx} href={link.url} target="_blank" rel="noreferrer" className={idx === 0 ? styles.primaryLinkBtn : styles.linkBtn}>
                            {CustomImg ? (
                              <img src={CustomImg} alt="Zomakarb logo" style={{ width: 28, height: 28, objectFit: 'contain', filter: idx === 0 ? 'brightness(0)' : 'brightness(0) invert(1)' }} />
                            ) : (
                              Icon && <Icon size={20} weight="fill" />
                            )}
                            {link.label}
                          </a>
                        );
                      })}
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
                
                {eventsArray.filter(Boolean).length > 0 && (
                  <motion.div variants={itemVariants} custom={1} className={styles.presentedInContainer}>
                    <h2 className={styles.presentedInText}>
                      Presented in <TypewriterText texts={eventsArray.filter(Boolean)} />
                    </h2>
                    <hr className={styles.eventSeparator} />
                  </motion.div>
                )}

                {/* Description Block */}
                <div className={styles.textStack}>
                  {aboutParagraphs && (
                     <motion.div variants={itemVariants} custom={3} className={styles.textColumn}>
                       {aboutParagraphs.map((p, i) => {
                         if (typeof p === 'string') {
                           return <p key={i} className={styles.textBody}>{p}</p>;
                         }
                         if (p.type === 'intro') {
                           return <p key={i} className={`${styles.textBody} ${styles.introText}`}>{p.text}</p>;
                         }
                         if (p.type === 'quote') {
                           return (
                             <div key={i} className={styles.quoteBlock}>
                               {p.header && <span className={styles.textLabel}>{p.header}</span>}
                               <div className={styles.quoteText}>
                                 <div className={styles.quoteBar}></div>
                                 <p className={styles.textBody}>{p.text}</p>
                               </div>
                             </div>
                           );
                         }
                         if (p.type === 'row') {
                           return (
                             <div key={i} className={styles.textRow}>
                               {p.columns.map((col, colIdx) => (
                                 <div key={colIdx} className={styles.textColumnWrap}>
                                   {col.header && <span className={styles.textLabel}>{col.header}</span>}
                                   <p className={styles.textBodySub}>{col.text}</p>
                                 </div>
                               ))}
                             </div>
                           );
                         }
                         if (p.type === 'gallery') {
                           return (
                             <div key={i} className={styles.galleryWrapper}>
                               <div className={styles.galleryInner}>
                                 {/* Tripled for infinite scroll effect */}
                                 {[...p.images, ...p.images, ...p.images].map((imgUrl, idx) => (
                                   <div key={idx} className={styles.galleryItem}>
                                      <img src={imgUrl} alt="Gallery item" loading="lazy" />
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )
                         }
                         if (p.type === 'link') {
                           return (
                             <a key={i} href={p.url} target="_blank" rel="noreferrer" className={styles.inlineLinkBlock}>
                               <span className={styles.inlineLine} />
                               <span className={styles.textLink}>{p.text}</span>
                               <span className={styles.inlineLine} />
                             </a>
                           );
                         }
                         return null;
                       })}
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
