// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});



// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Add hover effect to work cards
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Navbar stays transparent on scroll
const navbar = document.querySelector('.navbar');
// No background changes needed - keeping it transparent

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');

// Project data
const projectData = {
    'mbcl': {
        title: 'Mahila Bachao Chashma Lagao Smart Glasses',
        subtitle: 'MBCL',
        video: 'https://www.youtube.com/embed/YOUR_VIDEO_ID', // Replace with actual video ID
        badge: '🏆 3rd Place - Smart Delhi Ideathon 2025 (5000+ participants)',
        intro: 'Your Safety Matters. We are developing MBCL, a pair of innovative wearable smart glasses designed from the ground up to enhance women\'s safety. This isn\'t just a gadget; it\'s a guardian.',
        sections: [
            {
                title: '⚠️ The Problem We\'re Solving',
                content: 'Women\'s safety, particularly in India, remains a critical challenge due to high rates of crime, including harassment, domestic violence, and trafficking. Existing solutions fall short: CCTV footage can be manipulated or deleted, and safety apps suffer from server issues and unreliability.'
            },
            {
                title: '✓ Our Solution: A Two-Fold Approach',
                items: [
                    'A Fast, Reliable SOS System: Instantly alert pre-saved contacts and authorities.',
                    'An In-Built Evidence Recorder: Simultaneously record audio and video, capturing irrefutable proof.'
                ]
            },
            {
                title: '💡 The Innovation',
                content: 'Seamless integration of safety and evidence-gathering with tamper-proof cloud storage. All recordings are uploaded to secure cloud, rendering them unerasable by any external entity.'
            },
            {
                title: '⚙️ Technology Stack',
                subsections: [
                    {
                        subtitle: 'Hardware Components',
                        items: [
                            'Threefold Camera System: 270-degree view',
                            'High-Sensitivity Microphone: Audio recording & voice activation',
                            'Multi-Gesture Touch Sensor: Intuitive controls',
                            'Voice Recognition Module: User-specific activation',
                            'GPS & SIM Module: Real-time tracking & SOS calls',
                            'Accelerometer: Automatic SOS on sudden jerks',
                            'Haptic Feedback & Speakers',
                            'Rechargeable Battery: All-day use'
                        ]
                    },
                    {
                        subtitle: 'Software & App Ecosystem',
                        items: [
                            'Secure Cloud Pipeline: Instant upload of recordings',
                            'MBCL Mobile App: Control center with false trigger prevention',
                            'Emergency Hub: Call emergency numbers, view location, navigate to police stations',
                            'Media Management: Securely view all recordings',
                            'Device Locator: Find my glasses feature'
                        ]
                    }
                ]
            },
            {
                title: '📊 Viability & Project Status',
                content: 'Presented at Smart Delhi Ideathon 2025 finals at Vigyan Bhawan to Lt. Governor of Delhi and dignitaries. Currently in development with core modules tested successfully.'
            },
            {
                title: '🚀 Future Scope & Vision',
                items: [
                    'AI-Powered Threat Detection: CNN-based facial expression analysis',
                    'Police Database Integration: Criminal record detection',
                    'Live Visual Broadcasting: Real-time feed to contacts'
                ]
            },
            {
                title: '👥 Meet the Inventors',
                items: [
                    'Avani Sehgal',
                    'Agam Dayal',
                    'Rajani Kant Jha',
                    'Aryaman Sharma'
                ]
            }
        ],
        footer: 'A project dedicated to making the world safer for women.',
        status: 'Closed Source Project',
    }
};



// Global Variables State
let stackActiveIndex = 0;
let updateCircularStackGlobal = null;

// Initialize Circular Stack Logic
document.addEventListener("DOMContentLoaded", () => {
    const circularStack = document.getElementById('circular-stack');
    const projectItems = document.querySelectorAll('.project-item');

    if (circularStack && projectItems.length > 0) {
        const totalItems = projectItems.length;

        // The core update function, exposed globally so the gallery clicks can trigger it
        function updateCircularStack() {
            projectItems.forEach((item, i) => {
                // Remove all state classes first
                item.classList.remove('state-expanded', 'stack-prev', 'stack-next', 'stack-hidden');
                
                // Calculate relative distance from current active index
                let diff = i - stackActiveIndex;
                
                // Handle wrap-around (Modulo logic for infinite scroll)
                if (diff > Math.floor(totalItems / 2)) diff -= totalItems;
                if (diff < -Math.floor(totalItems / 2)) diff += totalItems;

                if (diff === 0) {
                    // ACTIVE item
                    item.classList.add('state-expanded');
                    item.style.zIndex = 10;
                } else if (diff === -1 || (diff === totalItems - 1)) {
                    // PREVIOUS item
                    item.classList.add('stack-prev');
                    item.style.zIndex = 5;
                } else if (diff === 1 || (diff === -(totalItems - 1))) {
                    // NEXT item
                    item.classList.add('stack-next');
                    item.style.zIndex = 5;
                } else {
                    // HIDDEN item
                    item.classList.add('stack-hidden');
                    item.style.zIndex = Math.max(1, 4 - Math.abs(diff));
                }
            });
        }

        // Export the function to global scope
        updateCircularStackGlobal = updateCircularStack;

        // Direct click behavior for navigation pills
        projectItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                // If we clicked the next pill (below)
                if (item.classList.contains('stack-next')) {
                    stackActiveIndex = (stackActiveIndex + 1) % totalItems;
                    updateCircularStack();
                } 
                // If we clicked the prev pill (above)
                else if (item.classList.contains('stack-prev')) {
                    stackActiveIndex = (stackActiveIndex - 1 + totalItems) % totalItems;
                    updateCircularStack();
                }
            });
        });

        // Initialize layout on load
        updateCircularStack();
    }

    // --- View Toggling Logic (Detailed Circular vs Gallery Grid) ---
    const galleryGridView = document.getElementById('gallery-grid-view');
    const closeBtns = document.querySelectorAll('.close-detailed-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Action 1: Close Detailed View -> Open Gallery
    if (closeBtns.length > 0 && galleryGridView && circularStack) {
        closeBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering other card clicks
                
                // Fade out circular stack
                circularStack.classList.add('fade-exit');
                circularStack.classList.remove('fade-enter');
                
                // Wait for fade out, then swap display and fade in gallery
                setTimeout(() => {
                    circularStack.style.display = 'none';
                    galleryGridView.style.display = 'grid'; // Enable grid layout first
                    
                    // Trigger reflow to ensure transition runs
                    void galleryGridView.offsetWidth;
                    
                    galleryGridView.classList.remove('hidden', 'fade-exit');
                    galleryGridView.classList.add('fade-enter');
                }, 300); // 300ms matches transition duration
            });
        });
    }

    // Action 2: Click Gallery Thumbnail -> Open Detailed View
    if (galleryItems.length > 0 && galleryGridView && circularStack) {
        galleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const targetIndex = parseInt(item.getAttribute('data-target'));
                
                // Set global active index to target
                stackActiveIndex = targetIndex;
                
                // Fade out gallery
                galleryGridView.classList.remove('fade-enter');
                galleryGridView.classList.add('fade-exit');
                
                // Wait for fade out, then swap display and fade in stack
                setTimeout(() => {
                    galleryGridView.style.display = 'none';
                    galleryGridView.classList.add('hidden'); // Reset hidden state
                    
                    circularStack.style.display = 'flex';
                    
                    // Re-initialize the stack with correct index before fading in
                    if(updateCircularStackGlobal) {
                        updateCircularStackGlobal();
                    }
                    
                    // Trigger reflow
                    void circularStack.offsetWidth;
                    
                    circularStack.classList.remove('fade-exit');
                    circularStack.classList.add('fade-enter');
                }, 300);
            });
        });
    }
});

// ==========================================
// Signature Scroll Animation
// ==========================================
(function () {
    const path = document.getElementById('autograph-path');
    const container = document.getElementById('signature-container');

    if (!path || !container) return;

    // Measure the total path length after layout
    let totalLength = 0;

    function initSignature() {
        totalLength = path.getTotalLength();

        // Start fully hidden
        path.style.strokeDasharray = totalLength;
        path.style.strokeDashoffset = totalLength;

        // Kickoff the draw state based on current scroll (handles page refresh mid-scroll)
        updateSignature();
    }

    function updateSignature() {
        const containerRect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Animation window:
        // Start drawing when the top of the container is 65% down the screen (Starts later)
        const animStart = viewportHeight * 0.65;
        
        // Finish drawing completely when the top of the container is 25% down the screen (Image 2 reference)
        const animEnd = viewportHeight * 0.25;

        // Current top of container relative to viewport
        const currentTop = containerRect.top;

        // progress: 0 = fully hidden, 1 = fully drawn
        let progress = (animStart - currentTop) / (animStart - animEnd);

        // Clamp to [0, 1]
        progress = Math.min(1, Math.max(0, progress));

        // Map progress to dashoffset (totalLength → 0)
        path.style.strokeDashoffset = totalLength * (1 - progress);
    }

    // Wait for fonts & layout before measuring
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSignature);
    } else {
        // Small rAF delay to ensure layout is stable
        requestAnimationFrame(initSignature);
    }

    // Listen for scroll with passive flag for performance
    window.addEventListener('scroll', updateSignature, { passive: true });

    // Also update on resize in case layout shifts
    window.addEventListener('resize', () => {
        totalLength = path.getTotalLength();
        path.style.strokeDasharray = totalLength;
        updateSignature();
    }, { passive: true });
})();

// ==========================================
// Header Logo SVG Animation
// ==========================================
(function() {
    const headerPath = document.getElementById('header-autograph-path');
    if (!headerPath) return;

    let length = 0;

    const playAnimation = () => {
        if (!length) {
            length = headerPath.getTotalLength();
            headerPath.style.strokeDasharray = length;
        }
        
        // Reset state instantly
        headerPath.style.transition = 'none';
        headerPath.style.strokeDashoffset = length;
        
        // Force browser to recalculate styles so the transition fires
        void headerPath.getBoundingClientRect();
        
        // Apply drawing transition (2s smooth draw)
        headerPath.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.25, 1, 0.5, 1)';
        headerPath.style.strokeDashoffset = '0';
    };

    // Initial play after a slight delay
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(playAnimation, 500));
    } else {
        setTimeout(playAnimation, 500);
    }

    // Repeat every 15 seconds
    setInterval(playAnimation, 15000);
})();


// ==========================================
// Interactive About Section (Accordion)
// ==========================================
(function () {
    const aboutData = [
        {
            title: 'Who I Am',
            desc: 'I build things that matter — from award-winning smart-glasses to AI-powered systems. Creative Developer · Designer · Hackathon Winner. I believe great software is invisible; it just works.',
            img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200'
        },
        {
            title: 'Hackathon Wins',
            desc: '3× National Hackathon Winner. Presented at Smart Delhi Ideathon (Vigyan Bhawan), Bhashini Top 5, and ISRO Hackathon finals. Building under pressure is where I thrive.',
            img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200'
        },
        {
            title: 'University',
            desc: 'Currently pursuing B.Tech in Computer Science & Engineering at Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi.',
            img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200'
        },
        {
            title: 'Projects Built',
            desc: '10+ projects shipped — spanning IoT hardware, AI pipelines, full-stack web apps, and legal-tech platforms. Quality over quantity, always.',
            img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200'
        },
        {
            title: 'Years Coding',
            desc: '4 years of continuous coding — from my first Python script to building ESP32 wearable hardware, cloud-integrated systems, and multi-modal AI pipelines.',
            img: 'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=1200'
        }
    ];

    const accordionItems = document.querySelectorAll('.about-accordion-item');
    const bgImage = document.getElementById('about-bg-image');
    const arrowUp = document.getElementById('about-arrow-up');
    const arrowDown = document.getElementById('about-arrow-down');

    if (!accordionItems.length || !bgImage) return;

    let currentIndex = 0;

    function setActive(newIndex) {
        if (newIndex === currentIndex && bgImage.src) return;

        // Reset all items
        accordionItems.forEach((item, idx) => {
            item.classList.remove('active');
            const btn = item.querySelector('.about-pill-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Set active item
        const activeItem = accordionItems[newIndex];
        activeItem.classList.add('active');
        const activeBtn = activeItem.querySelector('.about-pill-btn');
        if (activeBtn) activeBtn.setAttribute('aria-expanded', 'true');

        currentIndex = newIndex;

        // Crossfade background image
        bgImage.style.opacity = '0';
        setTimeout(() => {
            bgImage.src = aboutData[newIndex].img;
            bgImage.onload = () => { bgImage.style.opacity = '1'; };
            if (bgImage.complete) bgImage.style.opacity = '1';
        }, 250);
    }

    // Initialize descriptions and first item
    function init() {
        accordionItems.forEach((item, idx) => {
            const p = item.querySelector('.about-accordion-desc p');
            if (p && aboutData[idx]) {
                p.textContent = aboutData[idx].desc;
            }
            
            // Click listener for the pill button
            const btn = item.querySelector('.about-pill-btn');
            if (btn) {
                btn.addEventListener('click', () => setActive(idx));
            }
        });

        // Set initial state
        bgImage.src = aboutData[0].img;
        bgImage.style.opacity = '1';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Arrow navigation
    if (arrowUp) {
        arrowUp.addEventListener('click', () => {
            const prev = (currentIndex - 1 + aboutData.length) % aboutData.length;
            setActive(prev);
        });
    }

    if (arrowDown) {
        arrowDown.addEventListener('click', () => {
            const next = (currentIndex + 1) % aboutData.length;
            setActive(next);
        });
    }
})();

