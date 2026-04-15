import ProjectCarousel from './ProjectCarousel';
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
  vite:         { name: 'Vite',          src: di('vitejs') },
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
  { id: 5, src: ondcImg,     alt: 'ONDC',    position: 'top' },
  { id: 6, src: astraImg,    alt: 'ASTra',   contain: true },
  { id: 7, src: dramasImg,   alt: 'DRAMAS',  contain: true },
  { id: 8, src: formulaImg,  alt: 'Formula Solar', position: 'bottom' },
];

const projectDetails = {
  1: {
    name: 'Mahila Bachao Chashma Lagao', nameSize: '21cqi',
    events: ['Smart Delhi Ideathon 25', 'Yukti Innovation Challenge 25', 'Microsoft Imagine Cup-26'], eventSize: '10cqi',
    stack: ['arduino','esp32','fusioncad','python','azure','swift','xcode'], stackCols: 4,
    websiteUrl: '#',
    githubUrl: '#',
    youtubeUrl: 'https://drive.google.com/file/d/1tfArax4Hi4BaPogo0uDMmGgHpt5vE9wt/view?usp=sharing',
    clientName: 'Project under Zomakarb',
    aboutText: 'A smart spectacle system designed to protect women from harassment using real-time threat detection. The glasses capture environmental cues and alert the user and trusted contacts within seconds.',
    engineeringText: 'Built on ESP32 with custom firmware, paired with an iOS companion app. Azure Cognitive Services powers the ML inference layer while a 3D-printed frame designed in Fusion CAD houses the hardware.',
  },
  2: {
    name: 'Soochna Sahayak', nameSize: '25cqi',
    events: 'Bhashini Leap Hackathon 2025', eventSize: '16cqi',
    stack: ['html','css','javascript','nodejs','bhashini','rag','ollama','ngrok'], stackCols: 4,
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: 'https://youtu.be/I6SReh0PSFk',
    clientName: 'Project under Zomakarb for Bhashini',
    aboutText: 'A voice-first information assistant that allows citizens to access government schemes and public services in their native language — bridging the digital divide for India\'s vernacular-speaking population.',
    engineeringText: 'Powered by Bhashini\'s multilingual APIs on a lightweight Node.js backend, exposed via Ngrok for rapid demo deployment. The entire UI is stateless HTML/CSS for maximum reach on low-end devices.',
  },
  3: {
    name: 'Speak For CV', nameSize: '28cqi',
    events: 'Bhashini Startup Velocity 2.0', eventSize: '16cqi',
    stack: ['html','css','javascript','nodejs','bhashini','rag','ollama','ngrok'], stackCols: 4,
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: 'https://youtu.be/_nYGOavbnWA',
    clientName: 'Project under Zomakarb for Bhashini',
    aboutText: 'An iOS app that lets users narrate their professional experiences verbally — in any Indian language — and generates a polished, ATS-optimised résumé automatically using on-device AI.',
    engineeringText: 'RAG pipeline combines Bhashini speech-to-text with a locally-running Ollama LLM for context-aware extraction. The Swift frontend handles audio capture, streaming transcription, and PDF export natively.',
  },
  4: {
    name: 'Online Dispute Resolution', nameSize: '17cqi',
    events: ['IndiaAI Innovation Challenge 2026', 'Ministry of MSME'], eventSize: '12cqi',
    stack: ['javascript','css','html','rag','bhashini','ollama','ngrok'], stackCols: 4,
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: 'https://youtu.be/24XH75hCnHk',
    clientName: 'Project under Zomakarb for IndiaAI × MSME',
    aboutText: 'A multilingual AI-powered platform that guides small business owners through dispute resolution without the need for legal counsel — making justice accessible and affordable at scale.',
    engineeringText: 'A RAG system grounded on Indian commercial law documents, served via Ollama. Bhashini handles real-time speech translation, while a vanilla JS front-end keeps the tool deployable on low-bandwidth connections.',
  },
  5: {
    name: 'Open Network for Digital Commerce', nameSize: '21cqi',
    events: ['IndiaAI Innovation Challenge 2026', 'Ministry of MSME'], eventSize: '12cqi',
    stack: ['react','vite','typescript','vanillacss','nodejs','rag','ollama','ngrok'], stackCols: 4,
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: 'https://youtu.be/wTQs6rSgGnY',
    clientName: 'Project under Zomakarb for IndiaAI × MSME',
    aboutText: 'An AI seller-assistant layered on top of the ONDC protocol, helping micro-enterprises onboard, list products, and resolve customer queries without requiring any technical expertise.',
    engineeringText: 'React + Vite SPA with a TypeScript-strict codebase. The AI layer runs an Ollama-backed RAG service via Node.js, with Ngrok enabling live ONDC protocol webhook testing during the hackathon.',
  },
  6: {
    name: 'Automated Speaking Tracker', nameSize: '20cqi',
    events: 'Ujjain Mahakumbh Hackathon 2025', eventSize: '16cqi',
    stack: ['esp32','arduino','python','javascript','ngrok'], stackCols: 3,
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: 'https://drive.google.com/file/d/1pgxc4m1bT5hHVaIdzYtswByMA9vr4Ukr/view?usp=sharing',
    clientName: 'Ujjain Mahakumbh',
    aboutText: 'ASTra automatically follows and live-streams speakers at large events using computer-vision-driven pan-tilt tracking — removing the need for dedicated camera operators at public gatherings.',
    engineeringText: 'ESP32 drives the stepper motors for the pan-tilt rig, receiving angular commands from a Python CV pipeline running face-detection. A JavaScript dashboard streams the live feed and exposes manual override controls.',
  },
  7: {
    name: 'DRAMAS', fullName: 'Driving Risk Assessment and Monitoring Apprehension System', nameSize: '14cqi',
    events: 'Smart India Hackathon 2025', eventSize: '16cqi',
    stack: ['raspberrypi','python','opencv','mongodb','vercel','supabase','javascript'], stackCols: 4,
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: 'https://drive.google.com/file/d/1fBL06ncjrV5-T2ZlLAbJzp9piaZcDMMu/view?usp=sharing',
    clientName: 'Smart India Hackathon',
    aboutText: 'DRAMAS continuously analyses dashcam footage to detect drowsiness, distraction, and aggressive driving in real time — generating riskscores and alerting fleet managers before incidents occur.',
    engineeringText: 'OpenCV-based vision pipeline runs on Raspberry Pi, streaming annotated frames to a Supabase real-time database. A JavaScript fleet dashboard deployed on Vercel visualises driver risk scores and sends automated SMS alerts.',
  },
  8: {
    name: 'Formula Solar', nameSize: '24cqi',
    events: 'Bharat Antriksh Hackathon 2025', eventSize: '16cqi',
    stack: ['python'],
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: '#',
    clientName: 'Bharat Antriksh Hackathon',
    aboutText: 'A simulation toolkit that computes optimal solar panel orientations and energy output forecasts for spacecraft, enabling mission planners to maximise payload power budgets.',
    engineeringText: 'Pure Python scientific stack — NumPy for orbital mechanics calculations, Matplotlib for output visualisation, and a configurable parameter system for rapid what-if scenario modelling.',
  },
};

export default function Projects() {
  return (
    <ProjectCarousel
      projectImages={projectImages}
      projectDetails={projectDetails}
      icons={ICONS}
    />
  );
}
