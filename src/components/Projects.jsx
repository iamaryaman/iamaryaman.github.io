import { useState, useEffect } from 'react';
import styles from './Projects.module.css';
import { AnimatedTabs } from './ui/animated-tabs';
import ProjectInfoPanel from './ProjectInfoPanel';
import mbclImg from '../../media/MBCL.png';
import soochnaImg from '../../media/SOOCHNA.png';
import speak4cvImg from '../../media/SPEAK4CV.png';
import odrImg from '../../media/ODR.png';
import ondcImg from '../../media/ONDC.png';
import astraImg from '../../media/ASTRA.png';
import dramasImg from '../../media/DRAMAS.png';
import formulaImg from '../../media/FORMULA.png';
import esp32Svg from '../assets/esp32.svg';
import bhashiniSvg from '../assets/bhashini.svg';
import ragSvg from '../assets/rag.svg';
import fusionSvg from '../assets/fusioncad.svg';

// CDN helpers
const di = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
const si = (slug) => `https://cdn.simpleicons.org/${slug}`;

const ICONS = {
  arduino:      { name: 'Arduino',        src: di('arduino') },
  esp32:        { name: 'ESP32',          src: esp32Svg },
  fusioncad:    { name: 'Fusion CAD',     src: fusionSvg },
  python:       { name: 'Python',         src: di('python') },
  azure:        { name: 'Microsoft Azure',src: di('azure') },
  swift:        { name: 'Swift',          src: di('swift') },
  xcode:        { name: 'Xcode',          src: di('xcode') },
  bhashini:     { name: 'Bhashini',       src: bhashiniSvg },
  rag:          { name: 'RAG',            src: ragSvg },
  ollama:       { name: 'Ollama',         src: si('ollama'), dark: true },
  ngrok:        { name: 'Ngrok',          src: si('ngrok'), dark: true },
  javascript:   { name: 'JavaScript',     src: di('javascript') },
  css:          { name: 'CSS',            src: di('css3') },
  html:         { name: 'HTML',           src: di('html5') },
  react:        { name: 'React',          src: di('react') },
  vite:         { name: 'Vite',           src: di('vitejs') },
  typescript:   { name: 'TypeScript',     src: di('typescript') },
  vanillacss:   { name: 'Vanilla CSS',    src: di('css3') },
  nodejs:       { name: 'Node.js',        src: di('nodejs') },
  raspberrypi:  { name: 'Raspberry Pi',   src: si('raspberrypi') },
  opencv:       { name: 'OpenCV',         src: di('opencv') },
  mongodb:      { name: 'MongoDB',        src: di('mongodb') },
  vercel:       { name: 'Vercel',         src: si('vercel/000000'), dark: true },
  supabase:     { name: 'Supabase',       src: di('supabase') },
};

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
    events: ['Smart Delhi Ideathon 25', 'Yukti Innovation Challenge 25', 'Microsoft Imagine Cup-26'], eventSize: '10cqi',
    stack: ['arduino','esp32','fusioncad','python','azure','swift','xcode'],
    websiteUrl: '#'
  },
  2: { 
    name: 'Soochna Sahayak', nameSize: '25cqi', 
    events: 'Bhashini Leap Hackathon 2025', eventSize: '16cqi',
    stack: ['bhashini','rag','swift','ollama','ngrok','javascript'],
    demoUrl: '#'
  },
  3: { 
    name: 'Speak For CV', nameSize: '28cqi', 
    events: 'Bhashini Startup Velocity 2.0', eventSize: '16cqi',
    stack: ['bhashini','rag','swift','ollama','ngrok','javascript'],
    demoUrl: '#'
  },
  4: { 
    name: 'Online Dispute Resolution', nameSize: '17cqi', 
    events: 'IndiaAI Innovation Challenge 2026, in collaboration with Ministry of Small and Medium Enterprises', eventSize: '12cqi',
    stack: ['javascript','css','html','rag','bhashini','ollama','ngrok'],
    demoUrl: '#'
  },
  5: { 
    name: 'Open Network for Digital Commerce', nameSize: '21cqi', 
    events: 'IndiaAI Innovation Challenge 2026, in collaboration with Ministry of Small and Medium Enterprises', eventSize: '12cqi',
    stack: ['react','vite','typescript','vanillacss','nodejs','rag','ollama','ngrok'],
    demoUrl: '#'
  },
  6: { 
    name: 'Automated Speaking Tracker', nameSize: '20cqi', 
    events: 'Ujjain Mahakumbh Hackathon 2025', eventSize: '16cqi',
    stack: ['esp32','arduino','python','javascript','ngrok'],
    demoUrl: '#'
  },
  7: { 
    name: 'Driving Risk Assessment and Monitoring Apprehension System', nameSize: '14cqi', 
    events: 'Smart India Hackathon 2025', eventSize: '16cqi',
    stack: ['raspberrypi','python','opencv','mongodb','vercel','supabase','javascript'],
    demoUrl: '#'
  },
  8: { 
    name: 'Formula Solar', nameSize: '24cqi', 
    events: 'Bharat Antriksh Hackathon 2025', eventSize: '16cqi',
    stack: ['python'],
    demoUrl: '#'
  }
};

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const openOverlay = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
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

          {isMobile ? (
            /* ─── Mobile overlay: simple image + info ─── */
            <div
              className={styles.mobileOverlayContent}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className={styles.mobileOverlayImage}
              />
              <div className={styles.mobileOverlayInfo}>
                <p className={styles.mobileOverlayLabel}>PROJECT</p>
                <h3 className={styles.mobileOverlayTitle}>
                  {projectDetails[selectedImage.id]?.name}
                </h3>
                <p className={styles.mobileOverlayEvents}>
                  {Array.isArray(projectDetails[selectedImage.id]?.events)
                    ? projectDetails[selectedImage.id].events.join(' · ')
                    : projectDetails[selectedImage.id]?.events}
                </p>
                {/* Tech stack icons */}
                <div className={styles.mobileStackIcons}>
                  {projectDetails[selectedImage.id]?.stack?.map((key) => {
                    const icon = ICONS[key];
                    if (!icon) return null;
                    return (
                      <div key={key} className={styles.mobileStackIcon} title={icon.name}>
                        <img src={icon.src} alt={icon.name} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* ─── Desktop overlay: full bento panel ─── */
            <div 
              className="w-full h-full flex items-center justify-center p-4 md:p-8 z-[1010] relative max-h-screen"
              onClick={(e) => e.stopPropagation()}
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
                            <ProjectInfoPanel
                              project={projectDetails[img.id]}
                              img={img}
                              icons={ICONS}
                              index={img.id}
                            />
                          </div>
                        </div>
                    </div>
                  )
                }))}
                defaultTab={selectedImage.id.toString()}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
