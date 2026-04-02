import { useState } from 'react';
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
  },
  {
    id: 2,
    title: "Zomakarb AI\nSolutions",
    bgColor: "#D9D9D9",
    textColor: "#808080",
    imgSrc: logoImg,
    link: "https://zomakarb-ai-solution-website.vercel.app"
  },
  {
    id: 3,
    title: "Published\nWorks",
    bgColor: "#5B8FB9",
    textColor: "#EBEAE6",
    imgSrc: mbclImg,
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardEnter = (idx) => setActiveIndex(idx);
  const handleCardLeave = () => setActiveIndex(null);
  // Toggle on click/tap for mobile
  const handleCardClick = (idx) => {
    setActiveIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className={styles.experienceSection} id="experience">
      
      {/* Top Section: Text Layout */}
      <div className={styles.topContainer}>
        <div className={styles.leftCol}>
          <h2 className={styles.mainTitle}>Experience</h2>
        </div>
        
        <div className={styles.rightCol}>
          <p className={styles.paragraph}>
            these are all the opportuinities that i have gotten to bring out the best of my work, I hope that this section of my website keeps filling with cards.
          </p>
        </div>
      </div>

      {/* Bottom Section: Interactive Stacked Cards */}
      <div className={styles.cardsContainer} onMouseLeave={handleCardLeave}>
        {cardsData.map((card, idx) => {
          const isHovered = activeIndex === idx;
          const isCompressed = activeIndex !== null && !isHovered;
          
          const CardTag = card.link ? 'a' : 'div';
          const cardProps = card.link ? { 
            href: card.link, 
            target: "_blank", 
            rel: "noopener noreferrer" 
          } : {};

          return (
            <CardTag 
              key={card.id}
              className={`${styles.card} ${isHovered ? styles.expanded : ''} ${isCompressed ? styles.compressed : ''}`}
              style={{ backgroundColor: card.bgColor, textDecoration: 'none' }}
              onMouseEnter={() => handleCardEnter(idx)}
              onClick={() => handleCardClick(idx)}
              {...cardProps}
            >
              {/* Image Container */}
              <div className={`${styles.imageWrapper} ${isCompressed ? styles.imageHidden : ''}`}>
                <img 
                  src={card.imgSrc} 
                  alt={card.title.replace('\n', ' ')} 
                  className={`${styles.cardImage} ${card.title.includes('Published') ? styles.whiteLogo : ''}`} 
                />
              </div>
              
              {/* Bottom Title */}
              <div 
                className={`${styles.cardTitle} ${isCompressed ? styles.titleHidden : ''}`}
                style={{ color: card.textColor }}
              >
                {card.title.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </div>

              {/* Vertical / horizontal label for compressed view */}
              <span className={`${styles.verticalText} ${isHovered ? styles.hidden : ''}`}>
                {card.title.replace('\n', ' ')}
              </span>
            </CardTag>
          );
        })}
      </div>
    </section>
  );
}
