import styles from './ProjectOverlay.module.css';

/* ─────────────────────────────────────────────────────────────
   ProjectOverlay — Editorial magazine layout
   Matches the image: quote | title+links | techstack on top row,
   about | engineering in bottom columns, footer "built for xyz"

   Props:
     project  – entry from projectDetails
     img      – entry from projectImages
     icons    – the ICONS map
     index    – 1-based project index
   ──────────────────────────────────────────────────────────── */
export default function ProjectOverlay({ project, img, icons }) {
  if (!project || !img) return null;

  const {
    name,
    events,
    stack = [],
    websiteUrl,
    demoUrl,
    githubUrl,
    youtubeUrl,
    aboutText,
    engineeringText,
    clientName,
  } = project;

  const visitLink = websiteUrl || demoUrl || '#';
  const github    = githubUrl   || '#';
  const youtube   = youtubeUrl  || '#';

  // Events → single string for "built for" footer
  const eventsArray = Array.isArray(events) ? events : [events];
  const client = clientName || eventsArray[0] || 'xyz';

  // About & Engineering text – fall back to lorem ipsum
  const aboutParagraphs = aboutText
    ? (Array.isArray(aboutText) ? aboutText : [aboutText])
    : [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      ];

  const engineeringParagraphs = engineeringText
    ? (Array.isArray(engineeringText) ? engineeringText : [engineeringText])
    : [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      ];

  // Quote text
  const quoteText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim';

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayInner}>
        
        {/* ══════════════ LEFT COLUMN ══════════════ */}
        <div className={styles.leftCol}>
          {/* ── Top: block quote ── */}
          <div className={styles.quoteBlock}>
            <div className={styles.vertLine} />
            <p className={styles.quoteText}>{quoteText}</p>
          </div>

          {/* ── Bottom: About Project ── */}
          <div className={styles.aboutBlock}>
            <div className={styles.aboutVertLine} />
            <div className={styles.aboutContent}>
              <h2 className={styles.sectionHeader}>About Project</h2>
              <div className={styles.sectionBody}>
                {aboutParagraphs.map((p, i) => (
                  <p key={i} className={styles.bodyText}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════ CENTER COLUMN ══════════════ */}
        <div className={styles.centerCol}>
          <div className={styles.centerSpacerTop} />

          {/* ── Middle: title + links ── */}
          <div className={styles.titleBlock}>
            <h1 className={styles.projectTitle}>{name}</h1>
            
            <div className={styles.linksRow}>
              <div className={styles.horizontalLine} />
              
              <a href={youtube} target="_blank" rel="noopener noreferrer" className={styles.linkIconWrap} aria-label="Watch on YouTube">
                <svg className={styles.linkSvg} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.8 8.001a2.75 2.75 0 0 0-1.935-1.946C18.174 5.6 12 5.6 12 5.6s-6.174 0-7.865.455A2.75 2.75 0 0 0 2.2 8.001 28.7 28.7 0 0 0 1.75 12a28.7 28.7 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.935 1.946C5.826 18.4 12 18.4 12 18.4s6.174 0 7.865-.455a2.75 2.75 0 0 0 1.935-1.946A28.7 28.7 0 0 0 22.25 12a28.7 28.7 0 0 0-.45-3.999ZM9.75 14.848V9.152L15.5 12l-5.75 2.848Z"/>
                </svg>
              </a>

              <a href={visitLink} target="_blank" rel="noopener noreferrer" className={styles.linkTextWrap}>
                Visit
              </a>

              <a href={github} target="_blank" rel="noopener noreferrer" className={styles.linkIconWrapOutlined} aria-label="View on GitHub">
                <svg className={styles.linkSvg} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              <div className={styles.horizontalLine} />
            </div>
          </div>

          {/* ── Bottom: Footer ── */}
          <div className={styles.footer}>
            <span className={styles.footerText}>built for {client}</span>
          </div>
        </div>

        {/* ══════════════ RIGHT COLUMN ══════════════ */}
        <div className={styles.rightCol}>
          {/* ── Top: Tech stack ── */}
          <div className={styles.techBlock}>
            <span className={styles.techLabel}>techstack</span>
            <div className={styles.techVertLine} />
            <div className={styles.techIconsGrid}>
              {stack.map((key) => {
                const icon = icons[key];
                if (!icon) return null;
                return (
                  <div key={key} className={styles.techIconItem} title={icon.name}>
                    <img
                      src={icon.src}
                      alt={icon.name}
                      style={icon.dark ? { filter: 'brightness(0)' } : undefined}
                      draggable="false"
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.techVertLineLast} />
          </div>

          {/* ── Bottom: Engineering ── */}
          <div className={styles.engineeringBlock}>
            <h2 className={styles.sectionHeader}>Engineering</h2>
            <div className={styles.sectionBody}>
              {engineeringParagraphs.map((p, i) => (
                <p key={i} className={styles.bodyText}>{p}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
