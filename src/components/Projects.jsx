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

const projectDetails = {
  1: { 
    name: 'Mahila Bachao Chashma Lagao', nameSize: '21cqi', 
    events: ['Smart Delhi Ideathon 25', 'Yukti Innovation Challenge 25', 'Microsoft Imagine Cup-26'], eventSize: '10cqi' 
  },
  2: { 
    name: 'Soochna Sahayak', nameSize: '25cqi', 
    events: 'Bhashini Leap Hackathon 2025', eventSize: '16cqi' 
  },
  3: { 
    name: 'Speak For CV', nameSize: '28cqi', 
    events: 'Bhashini Startup Velocity 2.0', eventSize: '16cqi' 
  },
  4: { 
    name: 'Online Dispute Resolution', nameSize: '17cqi', 
    events: 'IndiaAI Innovation Challenge 2026, in collaboration with Ministry of Small and Medium Enterprises', eventSize: '12cqi' 
  },
  5: { 
    name: 'Open Network for Digital Commerce', nameSize: '21cqi', 
    events: 'IndiaAI Innovation Challenge 2026, in collaboration with Ministry of Small and Medium Enterprises', eventSize: '12cqi' 
  },
  6: { 
    name: 'Automated Speaking Tracker', nameSize: '20cqi', 
    events: 'Ujjain Mahakumbh Hackathon 2025', eventSize: '16cqi' 
  },
  7: { 
    name: 'Driving Risk Assessment and Monitoring Apprehension System', nameSize: '14cqi', 
    events: 'Smart India Hackathon 2025', eventSize: '16cqi' 
  },
  8: { 
    name: 'Formula Solar', nameSize: '24cqi', 
    events: 'Bharat Antriksh Hackathon 2025', eventSize: '16cqi' 
  }
};

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
                        className="rounded-none w-auto h-auto max-h-[70vh] object-contain !m-0 shadow-[0_20px_40px_-15px_rgba(42,75,60,0.3)]"
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
                            customContent: (
                              <div className="w-full h-full flex flex-col" style={{ containerType: 'inline-size' }}>
                                <div className="magic-bento-card__header !mb-1 shrink-0">
                                  <div className="magic-bento-card__label" style={{ opacity: 0.5, fontSize: '0.65rem' }}>Name of Project</div>
                                </div>
                                <div className="flex-1 flex flex-col justify-start w-full h-full overflow-hidden">
                                  <h2 className="magic-bento-card__title text-left w-full flex items-start" 
                                      style={{ fontSize: projectDetails[img.id]?.nameSize, lineHeight: '0.92', wordWrap: 'break-word', letterSpacing: '-0.04em' }}>
                                    {projectDetails[img.id]?.name}
                                  </h2>
                                </div>
                              </div>
                            )
                          },
                          // Top-Left Small 2
                          {
                            className: 'col-span-1 row-span-1',
                            color: '#ffffff',
                            customContent: (
                              <div className="w-full h-full flex flex-col" style={{ containerType: 'inline-size' }}>
                                <div className="magic-bento-card__header !mb-1 shrink-0">
                                  <div className="magic-bento-card__label" style={{ opacity: 0.5, fontSize: '0.65rem' }}>Presented in</div>
                                </div>
                                <div className="flex-1 flex flex-col justify-start w-full h-full overflow-hidden">
                                  {Array.isArray(projectDetails[img.id]?.events) ? (
                                    <ul className="magic-bento-card__title list-disc pl-[1em] text-left w-full flex flex-col justify-start m-0 gap-1"
                                        style={{ fontSize: projectDetails[img.id]?.eventSize, lineHeight: '1', wordWrap: 'break-word', letterSpacing: '-0.02em', fontWeight: '500' }}>
                                      {projectDetails[img.id]?.events.map((e, i) => (
                                        <li key={i} className="pl-1">{e}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <h2 className="magic-bento-card__title text-left w-full flex items-start" 
                                        style={{ fontSize: projectDetails[img.id]?.eventSize, lineHeight: '0.92', wordWrap: 'break-word', letterSpacing: '-0.04em', fontWeight: '600' }}>
                                      {projectDetails[img.id]?.events}
                                    </h2>
                                  )}
                                </div>
                              </div>
                            )
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
