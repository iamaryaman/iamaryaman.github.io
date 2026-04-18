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
    events: ['Smart Delhi Ideathon 2025 (3rd Place)', 'Yukti Innovation Challenge 25', 'Microsoft Imagine Cup-26'], eventSize: '10cqi',
    stack: ['arduino','esp32','fusioncad','python','azure','swift','xcode'], stackCols: 4,
    websiteUrl: 'https://mbcl.tech',
    githubUrl: '#',
    youtubeUrl: 'https://drive.google.com/file/d/1tfArax4Hi4BaPogo0uDMmGgHpt5vE9wt/view?usp=sharing',
    clientName: 'Project under Zomakarb',
    aboutText: [
      {
        type: 'intro',
        text: 'MBCL — Mahila Bachao Chashma Lagao, is an initiative to create a safer environment for women. Designed at Zomakarb, it is an IoT powered smart glasses system which acts as an evidence gathering device and emergency SOS.'
      },
      {
        type: 'quote',
        header: 'How to Use',
        text: 'When any woman feels unsafe or is attacked, the user can simply with the press of a button start the recording of the camera inside the MBCL glasses along with the audio recording. This entire feed with the GPS location will be relayed to the police and emergency contacts serving as an emergency dispatch.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'Progress',
            text: 'Currently MBCL smart glasses are functioning in an isolated testing environment and rapid advancements are being made to ship our product. We are open for investments and suggestions.'
          },
          {
            header: 'Engineering details',
            text: 'Data Integrity: All of the data that is collected from the smart glasses will be stored in a database whose contents cannot be deleted, serving as an impenetrable and irrefutable evidence.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://mbcl.tech',
        text: 'checkout mbcl.tech'
      }
    ],
  },
  2: {
    name: 'Soochna Sahayak', nameSize: '25cqi',
    events: ['Bhashini Leap Hackathon 2025'], eventSize: '16cqi',
    stack: ['swift', 'xcode', 'javascript', 'css', 'nodejs', 'bhashini', 'rag', 'ollama'], stackCols: 4,
    websiteUrl: 'https://zomakarb.tech',
    githubUrl: 'https://github.com/AGAMDAYAL2424/Soochna_Sahayak_Public_Repo',
    youtubeUrl: 'https://youtu.be/I6SReh0PSFk',
    clientName: 'Project under Zomakarb for Bhashini',
    aboutText: [
      {
        type: 'intro',
        text: 'Soochna Sahayak (सूचना सहायक — Information Assistant) is a state-of-the-art multi-platform solution designed for Indian law enforcement. It streamlines field documentation through AI-powered transcription, automated FIR generation, and a centralized management dashboard.'
      },
      {
        type: 'quote',
        header: 'The Ecosystem',
        text: 'The platform consists of three integrated components working in harmony: A high-performance iOS app for field officers to record and transcribe FIRs using Bhashini AI, a central web Hub for station heads to manage the evidence vault, and a secure Java Spring Boot backend for authentication.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'Security & Privacy',
            text: 'All evidence stored in the vault is AES-256 encrypted at rest. It adheres to the Digital India platform guidelines and Indian Evidence Act standards, utilizing secure stateless JWT authentication for all interactions.'
          },
          {
            header: 'Engineering details',
            text: 'Built with an API-First architecture, featuring Swift 6 (SwiftUI) for mobile, Vanilla JS with Glassmorphism for the web, Node.js & Express.js deployed on Vercel, and a robust Java Spring Boot backend.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://github.com/AGAMDAYAL2424/Soochna_Sahayak_Public_Repo',
        text: 'checkout repository'
      }
    ],
  },
  3: {
    name: 'Speak For CV', nameSize: '28cqi',
    events: ['Bhashini Startup Velocity 2.0'], eventSize: '16cqi',
    stack: ['swift', 'xcode', 'react', 'bhashini', 'ollama', 'ngrok', 'nodejs'], stackCols: 4,
    websiteUrl: 'https://zomakarb.tech',
    githubUrl: 'https://github.com/AGAMDAYAL2424/S4CV_Public_Repo',
    youtubeUrl: 'https://youtu.be/_nYGOavbnWA',
    clientName: 'Project under Zomakarb for Bhashini',
    aboutText: [
      {
        type: 'intro',
        text: 'S4CV (Speech-for-CV) is a state-of-the-art platform designed to democratize professional opportunities. By combining Conversational AI with Multilingual Speech Recognition, it allows everyone to create high-quality, ATS-optimized resumes just by speaking in their native language.'
      },
      {
        type: 'quote',
        header: 'Conversational Modes',
        text: 'The platform offers two workflows: a guided AI interview tailored for low-literacy users with full audio feedback, and a natural narrative mode where experienced professionals can speak freely in one go to extract their CV entities.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'Multilingual Prowess',
            text: 'Supports over 11 Indian languages including English, Hindi, Tamil, and Telugu. It features an intelligent code-mixed parser to handle "Hinglish" seamlessly.'
          },
          {
            header: 'Engineering details',
            text: 'Hybrid AI Architecture leveraging local LLMs (Qwen2.5) via Ollama on a dedicated Mac server for privacy, combined with Government-backed Bhashini APIs for ASR.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://github.com/AGAMDAYAL2424/S4CV_Public_Repo',
        text: 'checkout repository'
      }
    ],
  },
  4: {
    name: 'Online Dispute Resolution', nameSize: '17cqi',
    events: ['IndiaAI Innovation Challenge 2026', 'Ministry of MSME'], eventSize: '12cqi',
    stack: ['python', 'javascript', 'css', 'html', 'rag', 'bhashini', 'ollama', 'ngrok'], stackCols: 4,
    websiteUrl: 'https://zomakarb.tech',
    githubUrl: 'https://github.com/AGAMDAYAL2424/ODR_MSME',
    youtubeUrl: 'https://youtu.be/24XH75hCnHk',
    clientName: 'Project under Zomakarb for IndiaAI × MSME',
    aboutText: [
      {
        type: 'intro',
        text: 'MSME-25 is an automated dispute resolution platform empowering Micro, Small, and Medium Enterprises to navigate legal filings. It transforms the high-friction process of filing Statements of Claim into a streamlined, AI-guided conversational experience.'
      },
      {
        type: 'quote',
        header: 'AI-Assisted Voice Filing',
        text: 'Experience a Voice-to-Form breakthrough. Users simply speak, and the Autonomous NER Extraction pulls entities like Udyam numbers, PAN, GST, and amounts directly from natural speech in 10+ Indian languages.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'Digital Guided Pathway',
            text: 'A Probability Engine analyzes the strength of claims, providing win/loss probabilities, a fair settlement range based on the MSMED Act, and human-readable executive reasoning.'
          },
          {
            header: 'Engineering details',
            text: 'Powered by a distributed micro-architecture using a Python Flask Main Server, Bhashini Proxy for ASR, and Ollama running Qwen2.5 and LLaVA for local inference and OCR.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://github.com/AGAMDAYAL2424/ODR_MSME',
        text: 'checkout repository'
      }
    ],
  },
  5: {
    name: 'Open Network for Digital Commerce', nameSize: '21cqi',
    events: ['IndiaAI Innovation Challenge 2026', 'Ministry of MSME'], eventSize: '12cqi',
    stack: ['react', 'vite', 'typescript', 'python', 'mongodb', 'rag', 'ollama', 'ngrok'], stackCols: 4,
    websiteUrl: 'https://zomakarb.tech',
    githubUrl: 'https://github.com/AGAMDAYAL2424/ONDC_IndiaAI_Innovation_challenge_2026_OPEN',
    youtubeUrl: 'https://youtu.be/wTQs6rSgGnY',
    clientName: 'Project under Zomakarb for IndiaAI × MSME',
    aboutText: [
      {
        type: 'intro',
        text: 'The ONDC MSE Agent is an onboarding system bridging the digital divide for merchants. It acts as a multi-modal AI agent allowing merchants to join the Open Network for Digital Commerce using their native language.'
      },
      {
        type: 'quote',
        header: 'AI Product Cataloging & Matching',
        text: 'The agent listens to the merchant in 11+ Indic languages and analyzes product images with LLaVA to automatically generate ONDC-compliant catalog schemas while semantically matching them with the right Seller Network Participants.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'The Impact',
            text: 'Minimizes manual errors and significantly speeds up the "Go-to-Market" time for small businesses experiencing technical friction.'
          },
          {
            header: 'Engineering details',
            text: 'A glassmorphic React 18 frontend paired with a FastAPI backend. Utilizes PostgreSQL for structured data, MongoDB for catalogs, and Vector embeddings via Qwen2.5 for intelligent matching.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://github.com/AGAMDAYAL2424/ONDC_IndiaAI_Innovation_challenge_2026_OPEN',
        text: 'checkout repository'
      }
    ],
  },
  6: {
    name: 'ASTra', fullName: 'Automated Speaking Tracker - TH11561', nameSize: '20cqi',
    events: ['Ujjain Mahakumbh Hackathon 2025'], eventSize: '16cqi',
    stack: ['esp32','arduino','python','javascript','ngrok'], stackCols: 3,
    websiteUrl: '#',
    githubUrl: 'https://github.com/iamaryaman/TH11561_ASTra',
    youtubeUrl: 'https://drive.google.com/file/d/1pgxc4m1bT5hHVaIdzYtswByMA9vr4Ukr/view?usp=sharing',
    clientName: 'Ujjain Mahakumbh',
    aboutText: [
      {
        type: 'intro',
        text: 'ASTra is an innovative wearable device designed for the Ujjain Mahakumbh to help lost children, elderly, and disabled individuals navigate to safety through voice-guided GPS directions.'
      },
      {
        type: 'quote',
        header: 'Problem & Solution',
        text: 'During large-scale events, vulnerable individuals often get separated and cellular networks become unreliable. ASTra solves this by providing a comprehensive safety ecosystem featuring voice-guided navigation wearables, an independent 433MHz mesh network communication infrastructure, and real-time tracking.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'Logic & Workflow',
            text: 'Pole devices relay distress messages via the 433MHz network. GPS activates relying on offline maps. Multilingual voice commands ("turn right") from the DFPlayer Mini guide the person, while notifications to guardian apps and centralized dashboards guarantee safety.'
          },
          {
            header: 'Tech Stack & Future',
            text: 'ESP32 Devkit with GP-02 GPS and RF Transceivers built on C++. Using LittleFS for offline maps. Mobile apps in Swift. The future scope includes large-scale implementation and scaling into multilingual voice commands.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://github.com/iamaryaman/TH11561_ASTra',
        text: 'checkout repository'
      }
    ]
  },
  7: {
    name: 'DRAMAS', fullName: 'Driving Risk Assessment and Monitoring Apprehension System', nameSize: '14cqi',
    events: ['Smart India Hackathon 2025'], eventSize: '16cqi',
    stack: ['raspberrypi','python','opencv','mongodb','vercel','supabase','javascript'], stackCols: 4,
    websiteUrl: '#',
    githubUrl: 'https://github.com/AGAMDAYAL2424/SIH25136_DRAMAS',
    youtubeUrl: 'https://drive.google.com/file/d/1fBL06ncjrV5-T2ZlLAbJzp9piaZcDMMu/view?usp=sharing',
    clientName: 'Smart India Hackathon',
    aboutText: [
      {
        type: 'intro',
        text: 'A comprehensive vehicle safety add-on designed to create a safer driving environment by reinforcing the challan system and helping drivers improve. Instead of just warning the driver, DRAMAS takes direct action to prevent violations.'
      },
      {
        type: 'quote',
        header: 'The Problem & Innovation',
        text: 'Human-related road incidents continue to be a major cause of accidents. DRAMAS actively prevents violations through sensor fusion, machine learning, and real-time enforcement, creating a national driver rating system with judicial-grade data.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'Key Features',
            text: 'Features include non-licensed driving prevention via face-matching, drunk driving prevention with MQ-3 sensors, traffic offense detection via YOLO computer vision, crash detection via vibration sensors, and driver behavior analysis tracking eye-closing and yawning.'
          },
          {
            header: 'Tech Stack & Viability',
            text: 'Powered by a Raspberry Pi 5 with an OpenCV vision pipeline and Supabase backend. Mitigates inaccuracy via sensor fusion (ultrasonic, radar, mmWave). Tamper-resistant design requires continuous checks and driver re-authentication.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://github.com/AGAMDAYAL2424/SIH25136_DRAMAS',
        text: 'checkout repository'
      }
    ]
  },
  8: {
    name: 'Formula Solar', nameSize: '24cqi',
    events: ['Bharat Antriksh Hackathon 2025'], eventSize: '16cqi',
    stack: ['python'],
    websiteUrl: '#',
    githubUrl: 'https://github.com/iamaryaman/FORMULA_SOLAR_ISROBAH2025',
    youtubeUrl: '#',
    clientName: 'Bharat Antriksh Hackathon',
    aboutText: [
      {
        type: 'intro',
        text: 'Developing an automated method for detecting Halo Coronal Mass Ejection (CME) events using in-situ solar wind data from the Aditya-L1 mission at the L1 Lagrange point.'
      },
      {
        type: 'quote',
        header: 'The Problem & Innovation',
        text: 'Space weather events like CMEs can severely impact Earth\'s critical infrastructure. Existing methods rely on delayed or remote data. Formula Solar provides real-time, in-situ CME detection using Aditya-L1 mission data with an adaptive, data-driven statistical approach for ~1-hour early warning capabilities.'
      },
      {
        type: 'row',
        columns: [
          {
            header: 'Process Workflow',
            text: 'The pipeline ingests SWIS plasma and MAG files, masking invalid data and analyzing components. It identifies quiet solar wind periods to establish dynamic percentile-based thresholds, flags parameters violating these boundaries, assesses intensity via Bz orientation, and cross-validates via CACTUS.'
          },
          {
            header: 'Features & Stack',
            text: 'A fast, automated framework seamlessly integrated for Indian missions specifically built for SWIS and MAG payloads. Developed using pure scientific Python, pandas, NumPy, scikit-learn, Hugging Face, netCDF4, and NASA spacepy, wrapped inside a React dashboard powered by MongoDB.'
          }
        ]
      },
      {
        type: 'link',
        url: 'https://github.com/iamaryaman/FORMULA_SOLAR_ISROBAH2025',
        text: 'checkout repository'
      }
    ]
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
