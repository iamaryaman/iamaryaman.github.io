import { useState } from 'react';
import styles from './Projects.module.css';

import mbclImg from '../../media/MBCL.png';
import soochnaImg from '../../media/SOOCHNA.png';
import speak4cvImg from '../../media/SPEAK4CV.png';
import odrImg from '../../media/ODR.png';
import ondcImg from '../../media/ONDC.png';
import astraImg from '../../media/ASTRA.png';
import dramasImg from '../../media/DRAMAS.png';
import formulaImg from '../../media/FORMULA.png';

const projectImages = [
  { id: 1, src: mbclImg,     alt: 'MBCL' },
  { id: 2, src: soochnaImg,  alt: 'Soochna' },
  { id: 3, src: speak4cvImg, alt: 'Speak4CV' },
  { id: 4, src: odrImg,      alt: 'ODR' },
  { id: 5, src: ondcImg,     alt: 'ONDC' },
  { id: 6, src: astraImg,    alt: 'ASTra',   contain: true },
  { id: 7, src: dramasImg,   alt: 'DRAMAS',  contain: true },
  { id: 8, src: formulaImg,  alt: 'Formula' },
];

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openOverlay = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is open
  };

  const closeOverlay = () => {
    setSelectedImage(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  return (
    <section className={styles.projectsSection} id="projects">
      <h2 className={styles.sectionHeading}>Projects</h2>
      
      <div className={styles.gridContainer}>
        {projectImages.map((img) => (
          <div 
            key={img.id} 
            className={styles.gridItem}
            onClick={() => openOverlay(img)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className={img.contain ? styles.gridImageContain : styles.gridImage}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Full-screen Overlay */}
      {selectedImage && (
        <div className={styles.overlay} onClick={closeOverlay}>
          <button 
            className={styles.closeBtn} 
            onClick={closeOverlay}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div 
            className={styles.overlayContent}
            onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing
          >
            <img src={selectedImage.src} alt={selectedImage.alt} className={styles.overlayImage} />
          </div>
        </div>
      )}
    </section>
  );
}
