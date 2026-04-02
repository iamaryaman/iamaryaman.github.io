import styles from './ProjectInfoPanel.module.css'

/* ─────────────────────────────────────────────
   ProjectInfoPanel — Iteration 2: Real data wired in.
   Props:
     project  — entry from projectDetails (name, events, stack, websiteUrl/demoUrl)
     img      — entry from projectImages (id, src, alt)
     icons    — the ICONS map for resolving stack tech
     index    — 1-based project index (for the card A numbering)
───────────────────────────────────────────── */
export default function ProjectInfoPanel({ project, img, icons, index }) {
  if (!project || !img) return null;

  const { name, events, stack = [], websiteUrl, demoUrl } = project;
  const link = websiteUrl || demoUrl;
  const linkLabel = websiteUrl ? 'Website' : 'Demo';

  // Events can be a string or an array
  const eventsArray = Array.isArray(events) ? events : [events];
  // First event used as the main "hackathon" label in Card B
  const primaryEvent = eventsArray[0] ?? '';
  const extraEvents = eventsArray.slice(1);

  // Format index as zero-padded two digits
  const indexLabel = String(index).padStart(2, '0');

  return (
    <div className={styles.grid}>

      {/* ── CARD A: Project Name (full-width top) ── */}
      <div className={`${styles.card} ${styles.cardA}`}>
        <div className={styles.cardAInner}>
          <div className={styles.squiggleWrap}>
            <svg className={styles.squiggleSvg} viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor"/>
            </svg>
            <span className={styles.squigglePercent}>{indexLabel}</span>
          </div>
          <p className={styles.cardALabel}>Name of Project</p>
          <h2 className={styles.cardATitle}>{name}</h2>
        </div>
      </div>

      {/* ── CARD B: Events / Hackathon ── */}
      <div className={`${styles.card} ${styles.cardB}`}>
        <div className={styles.circleDecor}>
          <div className={styles.circleOuter} />
          <div className={styles.circleInner} />
          <svg className={styles.fingerprintSvg} viewBox="0 0 212 143" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={styles.fpPath} d="M44.0209 55.3542C43.1945 54.7639 42.6916 54.0272 42.5121 53.1442C42.3327 52.2611 42.5995 51.345 43.3125 50.3958C50.632 40.3611 59.812 32.5694 70.8525 27.0208C81.8931 21.4722 93.668 18.6979 106.177 18.6979C118.691 18.6979 130.497 21.3849 141.594 26.7587C152.691 32.1326 161.958 39.8936 169.396 50.0417C170.222 51.1042 170.489 52.0486 170.196 52.875C169.904 53.7014 169.401 54.4097 168.688 55C167.979 55.5903 167.153 55.8571 166.208 55.8004C165.264 55.7437 164.438 55.2408 163.729 54.2917C157.236 45.0833 148.885 38.0307 138.675 33.1337C128.466 28.2368 117.633 25.786 106.177 25.7812C94.7257 25.7812 83.9827 28.2321 73.948 33.1337C63.9132 38.0354 55.5903 45.0881 48.9792 54.2917C48.2709 55.3542 47.4445 55.9444 46.5 56.0625C45.5556 56.1806 44.7292 55.9444 44.0209 55.3542Z" fill="currentColor"/>
          </svg>
        </div>
        <p className={styles.cardLabel}>
          {eventsArray.length > 1 ? 'Hackathons' : 'Hackathon'}
        </p>
        <div className={styles.eventsBlock}>
          <h3 className={styles.cardTitle}>{primaryEvent}</h3>
          {extraEvents.length > 0 && (
            <ul className={styles.extraEvents}>
              {extraEvents.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── CARD C: Tech count / waveform ── */}
      <div className={`${styles.card} ${styles.cardC}`}>
        <div className={styles.waveWrap}>
          <svg className={styles.waveSvg} viewBox="0 0 386 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 80C3 80 14.3298 57.5 35.1282 52.5C55.9266 47.5 65.9333 46 65.9333 46C65.9333 46 80.699 46 92.1777 46C103.656 46 100.887 30 109.06 30C117.233 30 117.217 55 124.78 55C132.343 55 142.264 41 153.831 44C165.398 47 186.825 55 193.761 55C200.697 55 206.296 30 214.07 30C221.844 30 238.653 56 244.234 55C249.814 54 258.8 24 266.19 24C272.075 24 284.1 52 286.678 52C294.762 52.1 300.192 38 305.423 38C312.323 38 323.377 30 335.553 28C347.729 26 348.218 46 363.639 44C367.875 43.6 372.949 46 376.437 51C379.446 55 381.054 61 382.521 68C383.479 72 382.521 80 382.521 80" fill="url(#waveGrad)"/>
            <path d="M3 78C3 78 15.3041 54 36.0195 48C56.7349 42 66.6632 41 66.6632 41C66.6632 41 80.0327 41 91.4656 41C102.898 41 100.415 25 108.556 25C116.696 25 117.693 55 125.226 55C132.759 55 142.07 41 153.591 44C165.113 47 186.092 55 193 55C199.908 55 205.274 25 213.017 25C220.76 25 237.832 56 243.39 55C248.948 54 257.923 21 265.284 21C271.145 21 283.204 48 285.772 48C293.823 48.1 299.2 34 304.411 34C311.283 34 321.425 27 333.552 25C345.68 23 346.91 43 362.27 41C377.629 39.5 383 67 383 67" stroke="#2A4B3C" strokeWidth="2.5" strokeLinecap="round"/>
            <defs>
              <linearGradient id="waveGrad" x1="3" y1="24" x2="3" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2A4B3C" stopOpacity="0.12"/>
                <stop offset="1" stopColor="#2A4B3C" stopOpacity="0.01"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p className={styles.cardLabel}>Tech Stack</p>
        <h3 className={styles.cardTitle}>{stack.length} Technologies</h3>
      </div>

      {/* ── CARD D: Tech stack icons + mini chart ── */}
      <div className={`${styles.card} ${styles.cardD}`}>
        <div className={styles.cardDLeft}>
          <div className={styles.iconCircle}>
            <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.955 11.955 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>
            </svg>
          </div>
          <div className={styles.cardDText}>
            <h3 className={styles.cardTitle}>Stack</h3>
            <p className={styles.cardDesc}>
              {stack.slice(0, 4).map(k => icons[k]?.name).filter(Boolean).join(' · ')}
              {stack.length > 4 ? ` +${stack.length - 4}` : ''}
            </p>
          </div>
        </div>
        {/* Tech icon grid */}
        <div className={styles.chartPane}>
          <div className={styles.chartDots}><span /><span /><span /></div>
          <div className={styles.techIconGrid}>
            {stack.map((key) => {
              const icon = icons[key];
              if (!icon) return null;
              return (
                <div key={key} className={styles.techIcon} title={icon.name}>
                  <img
                    src={icon.src}
                    alt={icon.name}
                    style={{ filter: icon.dark ? 'brightness(0)' : 'none' }}
                    draggable="false"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CARD E: Link / Demo ── */}
      <div className={`${styles.card} ${styles.cardE}`}>
        <div className={styles.cardELeft}>
          <div className={styles.iconCircle}>
            <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
            </svg>
          </div>
          <div className={styles.cardDText}>
            <h3 className={styles.cardTitle}>View {linkLabel}</h3>
            <p className={styles.cardDesc}>{img.alt}</p>
          </div>
        </div>
        {/* Divider + links */}
        <div className={styles.avatarPane}>
          <div className={styles.avatarDivider} />
          <div className={styles.avatarRows}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.avatarRowRight}
              title={`View ${linkLabel}`}
            >
              <span className={styles.avatarTag}>{linkLabel}</span>
              <div className={styles.avatar} style={{ background: '#D4CAC2' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2A4B3C" strokeWidth="1.8" style={{ width: '55%', height: '55%' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
              </div>
            </a>
            <div className={styles.avatarRowLeft}>
              <div className={styles.avatar} style={{ background: '#e8e4df' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#2A4B3C', width: '60%', height: '60%' }}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <span className={styles.avatarTag}>GitHub</span>
            </div>
            <div className={styles.avatarRowRight}>
              <span className={styles.avatarTag}>Events</span>
              <div className={styles.avatar} style={{ background: '#f4f0ea' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2A4B3C" strokeWidth="1.5" style={{ width: '60%', height: '60%' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
