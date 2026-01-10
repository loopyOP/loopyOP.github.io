import { useEffect, useMemo, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type ProjectGalleryProps = {
  images: string[];
  altBase: string;
};

export default function ProjectGallery({ images, altBase }: ProjectGalleryProps) {
  const reduceMotion = useReducedMotion();
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [safeImages.join('|')]);

  if (!safeImages.length) {
    return (
      <div className="gallery">
        <div className="subtle">No images available for this project.</div>
      </div>
    );
  }

  const current = safeImages[index] ?? safeImages[0]!;

  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <div className="gallery-controls" aria-hidden="false">
          <button type="button" className="gallery-btn" onClick={prev} aria-label="Previous image">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="gallery-btn" onClick={next} aria-label="Next image">
            <ChevronRight size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.995 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Zoom classDialog="custom-zoom">
              <img src={current} alt={`${altBase} ${index + 1}`} draggable={false} decoding="async" />
            </Zoom>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="gallery-footer">
        <div className="gallery-counter">
          {index + 1} / {safeImages.length} • Click image to zoom
        </div>
      </div>

      <div className="thumbs" role="tablist" aria-label="Project screenshots">
        {safeImages.map((src, i) => (
          <button
            type="button"
            key={src}
            className={clsx('thumb', i === index && 'thumb--active')}
            onClick={() => setIndex(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`View image ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
