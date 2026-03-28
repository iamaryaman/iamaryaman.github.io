import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollReveal = ({ text, className }) => {
  const targetRef = useRef(null);

  // Track the scroll progress of this container.
  // "0.2 1" means start animation when top of target hits 20% from bottom of viewport.
  // "0.8 0.4" means end animation when bottom of target hits 40% from top.
  // We'll use "start center" to "end center" for a very predictable reveal as the user scrolls past the center.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"]
  });

  const characters = text.split("");

  return (
    <div ref={targetRef} className={className}>
      {characters.map((char, i) => {
        // Divide the scroll progress (0 to 1) into equal chunks for each character
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Word>
        );
      })}
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  // Map this character's specific progress chunk to opacity 0.1 -> 1
  const opacity = useTransform(progress, range, [0.1, 1]);
  
  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
};

export default ScrollReveal;
