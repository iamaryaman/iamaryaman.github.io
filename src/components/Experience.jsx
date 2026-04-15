import { useState, useRef, useCallback } from 'react';
import styles from './Experience.module.css';

import logoImg from '../../media/logo.png';
import mbclImg from '../../media/mbcl_logo.png';

const cardsData = [
  {
    id: 1,
    title: "Alcontcitic",
    bgColor: "#EBEAE6",
    textColor: "#999999",
    imgSrc: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2000&auto=format&fit=crop",
    description: [
      "Designed and launched two company websites, collaborating with Retrovolition for hosting and maintenance to ensure a reliable online presence.",
      "Applied data cleaning, manipulation, and web scraping to extract financial data, and advised leadership on IT strategy and technology investments through collaboration with industry professionals."
    ],
    role: "Information Technology Lead",
    period: "Nov 2023 - May 2025",
    buttons: [
      { label: "Visit Website", url: "https://www.alcontcitic.com" }
    ]
  },
  {
    id: 2,
    title: "Zomakarb AI\nSolutions",
    bgColor: "#D9D9D9",
    textColor: "#808080",
    imgSrc: logoImg,
    link: "https://zomakarb-ai-solution-website.vercel.app",
    description: [
      "Founded the startup to architect and scale AI platforms, currently engineering real-time ASR and NER transcription systems using Bhashini APIs with secure backend infrastructures for web and mobile systems, leveraging Azure tunneling to facilitate scalable, multilingual speech processing.",
      "Collaborated with DIBD(Digital India Bhashini Division), NCRB(National Crime Records Bureau) and My Bharat Portal presenting in Bhashini Hackathons where are in the Top 5 Finalist Positions in two hackathons."
    ],
    role: "Co-Founder",
    period: "October 2025 - Present",
    buttons: [
      { label: "Visit Website", url: "https://zomakarb.tech" },
      { label: "Contact Us", url: "#" }
    ]
  },
  {
    id: 3,
    title: "Published\nWorks",
    bgColor: "#5B8FB9",
    textColor: "#EBEAE6",
    imgSrc: mbclImg,
    description: "Developed a patent for MBCL smart glasses under EnobleIP, currently under review by patent-jury. (i will come back to this section later)",
    role: "Researcher & Author",
    period: "2021 – Present",
    buttons: [
      { label: "View Journal", url: "#" }
    ]
  }
];

export default function Experience() {
  // Phase 1: card is open (logo centered, name visible) — set immediately on hover
  const [expandedIndex, setExpandedIndex] = useState(null);
  // Phase 2: info is revealed (logo moves to corner, description slides in) — after 1s
  const [infoIndex, setInfoIndex] = useState(null);

  const infoTimerRef   = useRef(null);
  const hoveredIdxRef  = useRef(null); // tracks which card the timer is for

  const clearInfoTimer = () => {
    if (infoTimerRef.current) {
      clearTimeout(infoTimerRef.current);
      infoTimerRef.current = null;
    }
  };

  const handleCardEnter = useCallback((idx) => {
    // If this card is already expanded and timer is running — don't reset
    if (hoveredIdxRef.current === idx) return;
    hoveredIdxRef.current = idx;
    clearInfoTimer();
    setExpandedIndex(idx);
    setInfoIndex(null);
    // 1 second → reveal info
    infoTimerRef.current = setTimeout(() => {
      setInfoIndex(idx);
    }, 1000);
  }, []);

  const handleCardLeave = useCallback(() => {
    hoveredIdxRef.current = null;
    clearInfoTimer();
    setExpandedIndex(null);
    setInfoIndex(null);
  }, []);

  // Mobile tap: toggle phases
  const handleCardClick = useCallback((idx) => {
    if (hoveredIdxRef.current !== idx) {
      hoveredIdxRef.current = idx;
      clearInfoTimer();
      setExpandedIndex(idx);
      setInfoIndex(null);
      infoTimerRef.current = setTimeout(() => setInfoIndex(idx), 1000);
    } else {
      hoveredIdxRef.current = null;
      clearInfoTimer();
      setExpandedIndex(null);
      setInfoIndex(null);
    }
  }, []);

  return (
    <section className={styles.experienceSection} id="experience">

      {/* Top Section */}
      <div className={styles.topContainer}>
        <div className={styles.leftCol}>
          <h2 className={styles.mainTitle}>Experience</h2>
        </div>
        <div className={styles.rightCol}>
          <p className={styles.paragraph}>
            these are all the opportunities that i have gotten to bring out the best of my work,
            I hope that this section of my website keeps filling with cards.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div
        className={styles.cardsContainer}
        onMouseLeave={handleCardLeave}
      >
        {cardsData.map((card, idx) => {
          const isExpanded   = expandedIndex === idx;
          const isInfoPhase  = infoIndex === idx;
          const isCompressed = expandedIndex !== null && !isExpanded;

          const CardTag   = card.link ? 'a' : 'div';
          const cardProps = card.link
            ? { href: card.link, target: '_blank', rel: 'noopener noreferrer' }
            : {};

          return (
            <CardTag
              key={card.id}
              className={[
                styles.card,
                isExpanded   ? styles.expanded   : '',
                isCompressed ? styles.compressed : '',
              ].join(' ')}
              style={{ backgroundColor: card.bgColor, textDecoration: 'none' }}
              onMouseEnter={() => handleCardEnter(idx)}
              onClick={() => handleCardClick(idx)}
              {...cardProps}
            >
              {/* ── IMAGE ── */}
              {/* Phase 1: centered. Phase 2: corner. Compressed: hidden. */}
              <div
                className={[
                  styles.imageWrapper,
                  isInfoPhase  ? styles.imageCorner : '',
                  isCompressed ? styles.imageHidden : '',
                ].join(' ')}
              >
                <img
                  src={card.imgSrc}
                  alt={card.title.replace('\n', ' ')}
                  className={`${styles.cardImage} ${card.title.includes('Published') ? styles.whiteLogo : ''}`}
                />
              </div>

              {/* ── PROJECT NAME (phase 1: center-bottom, phase 2: fades out) ── */}
              <div
                className={[
                  styles.cardTitle,
                  isCompressed ? styles.titleHidden : '',
                  isInfoPhase  ? styles.titleHidden : '',
                  isExpanded   ? styles.titleExpanded : '',
                ].join(' ')}
                style={{ color: card.textColor }}
              >
                {card.title.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </div>

              {/* ── DESCRIPTION PANEL (phase 2 only) ── */}
              <div className={[
                styles.descriptionPanel,
                isInfoPhase ? styles.descriptionVisible : '',
              ].join(' ')}>
                <div className={styles.descMeta}>
                  <h3 className={styles.descRole}>{card.role}</h3>
                  <span className={styles.descPeriod}>{card.period}</span>
                </div>
                {Array.isArray(card.description) ? (
                  <ul className={styles.descList}>
                    {card.description.map((item, i) => (
                      <li key={i} className={styles.descListItem}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.descText}>{card.description}</p>
                )}
                {card.buttons && card.buttons.length > 0 && (
                  <div className={styles.descButtons}>
                    {card.buttons.map((btn, i) => (
                      <a 
                        key={i} 
                        href={btn.url} 
                        className={styles.button}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent card collapse action if on mobile
                      >
                        {btn.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Compressed vertical label ── */}
              <span className={`${styles.verticalText} ${isExpanded ? styles.hidden : ''}`}>
                {card.title.replace('\n', ' ')}
              </span>
            </CardTag>
          );
        })}
      </div>
    </section>
  );
}
