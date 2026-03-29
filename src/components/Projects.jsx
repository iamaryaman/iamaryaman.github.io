import { useState } from 'react';
import styles from './Projects.module.css';
import { AnimatedTabs } from './ui/animated-tabs';
import MagicBento from './ui/MagicBento';
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
  { id: 2, src: soochnaImg,  alt: 'Soochna Sahayk' },
  { id: 3, src: speak4cvImg, alt: 'Speak4CV' },
  { id: 4, src: odrImg,      alt: 'ODR' },
  { id: 5, src: ondcImg,     alt: 'ONDC' },
  { id: 6, src: astraImg,    alt: 'ASTra',   contain: true },
  { id: 7, src: dramasImg,   alt: 'DRAMAS',  contain: true },
  { id: 8, src: formulaImg,  alt: 'Formula Solar' },
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
            style={{ zIndex: 1050 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div 
            className="w-full h-full flex items-center justify-center p-4 md:p-8 z-[1010] relative max-h-screen"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on modal from closing
          >
            <AnimatedTabs 
              tabs={projectImages.map((img) => ({
                id: img.id.toString(),
                label: img.alt,
                content: (
                  <div className="flex flex-col md:flex-row w-full h-full items-center text-left py-2 gap-8 md:gap-12">
                    <div className="w-full md:w-auto max-w-[45%] shrink-0 h-full flex items-center justify-start">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="rounded-xl w-auto h-auto max-h-[70vh] object-contain !m-0 shadow-[0_20px_40px_-15px_rgba(42,75,60,0.3)]"
                      />
                    </div>
                    <div className="flex-1 w-full h-full flex items-center justify-start">
                      <div className="w-full h-[calc(100%-16px)] transform scale-[0.97] origin-left">
                        <MagicBento 
                          enableTilt={false}
                        cards={[
                          // Top-Left Small 1
                          {
                            className: 'col-span-1 row-span-1',
                            color: '#ffffff',
                            title: 'Design',
                            label: 'UI'
                          },
                          // Top-Left Small 2
                          {
                            className: 'col-span-1 row-span-1',
                            color: '#ffffff',
                            title: 'Code',
                            label: 'Stack'
                          },
                          // Top-Right Big (spans R1-R2, C3-C4)
                          {
                            className: 'col-span-2 row-span-2',
                            color: '#ffffff',
                            title: img.alt,
                            description: `${img.alt} driving robust functionality and modern aesthetics seamlessly together.`,
                            label: 'Overview'
                          },
                          // Bottom-Left Big (spans R2-R3, C1-C2)
                          {
                            className: 'col-span-2 row-span-2',
                            color: '#ffffff',
                            title: 'Performance',
                            description: 'Optimized speed and accessibility built on modern edge architecture.',
                            label: 'Outcome'
                          },
                          // Bottom-Right Small 1
                          {
                            className: 'col-span-1 row-span-1',
                            color: '#ffffff',
                            title: 'API',
                            label: 'Node'
                          },
                          // Bottom-Right Small 2
                          {
                            className: 'col-span-1 row-span-1',
                            color: '#ffffff',
                            title: 'Data',
                            label: 'Secure'
                          }
                        ]}
                      />
                      </div>
                    </div>
                  </div>
                )
              }))}
              defaultTab={selectedImage.id.toString()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
