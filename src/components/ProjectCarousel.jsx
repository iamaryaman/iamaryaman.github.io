import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './ProjectCarousel.module.css';
import ProjectOverlay from './ProjectOverlay';

/* ─────────────────────────────────────────────────────────────
   ProjectCarousel  —  v3 · True 3D Cylinder
   ─────────────────────────────────────────────────────────────
   Architecture:
   · All N cards live inside a single <div class="cylinder">
   · Each card[i]: rotateY(i × STEP) translateZ(RADIUS)
   · The cylinder div itself rotates: rotateY(currentAngle)
   · backface-visibility: visible → back cards show mirrored face
   · GSAP ticker drives physics loop (velocity + friction inertia)
   · Pure 1:1 drag / scroll → no snap, no pagination
   ──────────────────────────────────────────────────────────── */

const TILT_MAX    = 12;    // max hover-tilt degrees
const FRICTION    = 0.92;  // velocity decay per tick (~60fps)
const DRAG_SENS   = 0.18;  // px of drag → degrees rotation  (halved for slower feel)
const SCROLL_SENS = 0.06;  // trackpad deltaX → degrees of velocity (halved)
const CLICK_DIST  = 6;     // max px movement to still count as a click
const ROT_X_MAX   = 10;    // max vertical-tilt degrees (caps upper/lower cylinder view)
const ROT_X_SENS  = 0.055; // vertical drag px → rotateX degrees

export default function ProjectCarousel({ projectImages = [], projectDetails = {}, icons = {} }) {
  const N    = projectImages.length;
  const STEP = 360 / N;   // angular gap between cards

  /* ── Computed cylinder radius so cards don't overlap visually ──
     Circumference ≈ N × (cardWidth + gap); R = circum / (2π)      */
  const CARD_W  = 280;    // roughly match CSS .card width plus padding
  const GAP     = 140;    // increased gap between cards
  const RADIUS  = Math.round((N * (CARD_W + GAP)) / (2 * Math.PI));

  /* ── Refs — all physics is imperative, zero React re-renders ── */
  const cylinderRef  = useRef(null);
  const stageRef     = useRef(null);
  const rotRef       = useRef(0);    // current Y rotation in degrees (continuous float)
  const velRef       = useRef(0);    // Y-axis degrees per ticker-frame
  const rotXRef      = useRef(0);    // current X tilt (vertical drag, lerps back to 0)
  const isDragging        = useRef(false);
  const lastX             = useRef(0);
  const lastY             = useRef(0);
  const dragDist          = useRef(0);
  const tickerRef         = useRef(null);
  const pointerDownTarget = useRef(null); // card element pressed on pointerdown

  /* ── Modal state (only thing that needs React) ── */
  const [selectedImg, setSelectedImg] = useState(null);

  /* ───────────────────── GSAP Physics Ticker ───────────────────── */
  useEffect(() => {
    const tick = () => {
      if (!isDragging.current) {
        // Y-axis inertia decay
        velRef.current *= FRICTION;
        if (Math.abs(velRef.current) < 0.0005) velRef.current = 0;
        rotRef.current += velRef.current;
        // X-axis slowly lerps back to 0 when not dragging
        rotXRef.current += (0 - rotXRef.current) * 0.045;
        if (Math.abs(rotXRef.current) < 0.01) rotXRef.current = 0;
      }
      if (cylinderRef.current) {
        cylinderRef.current.style.transform =
          `rotateY(${rotRef.current}deg) rotateX(${rotXRef.current}deg)`;
      }
    };
    gsap.ticker.add(tick);
    tickerRef.current = tick;
    return () => gsap.ticker.remove(tick);
  }, []);

  /* ─────────────────────── Pointer drag ─────────────────────── */
  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    lastX.current  = e.clientX;
    lastY.current  = e.clientY;
    dragDist.current  = 0;
    velRef.current = 0;           // kill inertia immediately
    // Record the card element under the cursor so we can open it on pointerup
    pointerDownTarget.current = e.target.closest('[data-card-id]');
    stageRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    dragDist.current += Math.abs(dx) + Math.abs(dy);

    // ── Horizontal drag → Y-axis cylinder spin (positive dx = rotate right) ──
    rotRef.current += dx * DRAG_SENS;
    velRef.current  = dx * DRAG_SENS;   // carry into inertia on release

    // ── Vertical drag → X-axis tilt (capped at ±ROT_X_MAX) ──
    // Drag down (dy > 0) = tilt top toward viewer (see bottom rim)
    // Drag up   (dy < 0) = tilt bottom toward viewer (see top rim)
    rotXRef.current = Math.max(
      -ROT_X_MAX,
      Math.min(ROT_X_MAX, rotXRef.current + dy * ROT_X_SENS)
    );

    lastX.current = e.clientX;
    lastY.current = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    // velRef is already set to the last frame's delta — inertia takes over
    // If this was a clean tap (not a drag), open the corresponding overlay
    if (dragDist.current < CLICK_DIST && pointerDownTarget.current) {
      const cardId = pointerDownTarget.current.dataset.cardId;
      const img = projectImages.find(img => String(img.id) === cardId);
      if (img) openModal(img);
    }
    pointerDownTarget.current = null;
  }, [projectImages]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─────────────────────── Horizontal trackpad scroll ───────────────────── */
  /* Only deltaX (horizontal swipe) rotates the cylinder.                     */
  /* Vertical scroll is NOT consumed — the page scrolls normally.              */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; // vertical scroll → ignore
      e.preventDefault();
      velRef.current -= e.deltaX * SCROLL_SENS;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  /* ─────────────────────── Modal helpers ─────────────────────── */
  const openModal  = (img) => { setSelectedImg(img); document.body.style.overflow = 'hidden'; };
  const closeModal = ()    => { setSelectedImg(null); document.body.style.overflow = ''; };

  /* ─────────────────────── Render ─────────────────────── */
  return (
    <section className={styles.section} id="projects" aria-label="Project showcase carousel">

      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>Selected Work</span>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.headerRule} />
      </div>

      <div className={styles.hint}>
        <span className={styles.hintText}>drag · scroll to rotate</span>
        <div className={styles.hintLine} />
      </div>

      {/* ══════════════ 3D STAGE ══════════════ */}
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        role="region"
        aria-label="3D project cylinder — drag or scroll to rotate"
      >
        {/* perspective wrapper (only sets vanishing point, no 3D transform) */}
        <div className={styles.perspective}>
          {/* THE CYLINDER — one div that rotates as a unit */}
          <div
            ref={cylinderRef}
            className={styles.cylinder}
            style={{ transform: 'rotateY(0deg)' }}
          >
            {projectImages.map((img, i) => {
              const angle   = i * STEP;   // static — never changes
              const detail  = projectDetails[img.id] || {};

              return (
                <TiltCard
                  key={img.id}
                  img={img}
                  detail={detail}
                  angle={angle}
                  radius={RADIUS}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Drag hint ── */}
      <p className={styles.dragHint}>Drag the photos to view and select to expand</p>

      {/* ══════════════ DETAIL MODAL ══════════════ */}
      <AnimatePresence>
        {selectedImg && (
          <>
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeModal}
            />
            <motion.div
              className={styles.modalPanel}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.modalClose}
                onClick={closeModal}
                aria-label="Go back"
                id="modal-close-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Go back</span>
              </button>
              <div className={styles.modalContent}>
                <ProjectOverlay
                  projectImages={projectImages}
                  projectDetails={projectDetails}
                  icons={icons}
                  initialIndex={selectedImg.id}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TiltCard
   · Positioned statically on the cylinder via angle + radius
   · Mouse hover drives a 3D tilt with GSAP-ticker-based lerp
   · backface-visibility: visible on the outer card div means
     the "back" side is visible when the card faces away
   ══════════════════════════════════════════════════════════════ */
function TiltCard({ img, detail, angle, radius }) {
  const cardRef  = useRef(null);
  const innerRef = useRef(null);  // tiltable image wrapper
  const targetT  = useRef({ x: 0, y: 0 });
  const currentT = useRef({ x: 0, y: 0 });
  const tiltTick = useRef(null);

  /* ── Lerp loop (imperative, zero React re-renders) ── */
  const ensureLerping = () => {
    if (tiltTick.current) return;
    const step = () => {
      const cx = currentT.current.x, cy = currentT.current.y;
      const tx = targetT.current.x,  ty = targetT.current.y;
      const nx = cx + (tx - cx) * 0.1;
      const ny = cy + (ty - cy) * 0.1;
      currentT.current = { x: nx, y: ny };
      if (innerRef.current) {
        // No scale3d — scaling a GPU-promoted layer causes blur
        innerRef.current.style.transform =
          `perspective(800px) rotateX(${ny}deg) rotateY(${nx}deg)`;
      }
      if (Math.abs(nx - tx) > 0.02 || Math.abs(ny - ty) > 0.02) {
        tiltTick.current = requestAnimationFrame(step);
      } else {
        tiltTick.current = null;
        if (innerRef.current) {
          innerRef.current.style.transform =
            `perspective(800px) rotateX(${ty}deg) rotateY(${tx}deg)`;
        }
      }
    };
    tiltTick.current = requestAnimationFrame(step);
  };

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
    const y = ((e.clientY - r.top)   / r.height - 0.5) * 2;
    targetT.current = { x: x * TILT_MAX, y: -y * TILT_MAX };
    ensureLerping();
  };

  const onMouseLeave = () => {
    targetT.current = { x: 0, y: 0 };
    ensureLerping();
  };

  useEffect(() => () => {
    if (tiltTick.current) cancelAnimationFrame(tiltTick.current);
  }, []);

  /* static card position on cylinder — angle never changes */
  const cardPlacement = {
    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={cardPlacement}
      data-card-id={String(img.id)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={detail.name || img.alt}
    >
      {/* tiltable image wrapper */}
      <div
        ref={innerRef}
        className={styles.cardInner}
      >
        <img
          src={img.src}
          alt={img.alt}
          className={img.contain ? styles.imgContain : styles.imgCover}
          draggable="false"
          loading="lazy"
        />
        <div className={styles.cardGradient} />
      </div>

      {/* label — outside the tilt wrapper so it stays flat */}
      <div className={styles.cardLabel}>
        <span className={styles.cardIndex}>{String(img.id).padStart(2, '0')}</span>
        <span className={styles.cardName}>{detail.name || img.alt}</span>
      </div>
    </div>
  );
}
