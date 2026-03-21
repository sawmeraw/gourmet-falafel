"use client"

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useSwipe } from '@/hooks/useSwipe';

interface GalleryItem {
  src: string;
  alt: string;
  label?: string;
}

// Add new images here — label is optional
const galleryItems: GalleryItem[] = [
  { src: '/gallery/gallery_new_1.jpeg', alt: 'Falafel dish', label: '' },
  { src: '/gallery/gallery2.jpg', alt: 'Falafel dish', label: '' },
  { src: '/gallery/gallery_new_2.jpeg', alt: 'Falafel dish', label: '' },
  { src: '/gallery/gallery_new_3.jpeg', alt: 'Falafel dish', label: '' },
  { src: '/gallery/gallery_new_4.jpeg', alt: 'Falafel dish', label: '' },
  { src: '/gallery/gallery5.jpg', alt: 'Falafel dish', label: '' },
  { src: '/gallery/gallery_new_5.jpeg', alt: 'Falafel dish', label: '' },
];

const AUTO_INTERVAL = 4000;

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const total = galleryItems.length;

  // Responsive visible count
  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Clone first N items at the end for seamless forward looping
  const items = [...galleryItems, ...galleryItems.slice(0, visibleCount)];

  const next = useCallback(() => {
    setAnimate(true);
    setIndex(i => i + 1);
  }, []);

  const prev = useCallback(() => {
    if (index === 0) {
      setAnimate(false);
      setIndex(total - visibleCount);
    } else {
      setAnimate(true);
      setIndex(i => i - 1);
    }
  }, [index, total, visibleCount]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  // Re-enable animation after snap
  useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  // After transition ends, snap back if we're in the cloned zone.
  // Guard against bubbled transitionend events from child elements (e.g. image hover scale).
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (index >= total) {
      setAnimate(false);
      setIndex(0);
    }
  };

  const translateX = -(index * (100 / visibleCount));
  const swipe = useSwipe(next, prev);

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">Gallery</h2>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Take a visual tour of our popular dishes
        </p>

        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={swipe.onTouchStart}
          onTouchEnd={swipe.onTouchEnd}
        >
          {/* Slider strip */}
          <div
            className="flex"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: animate ? 'transform 600ms ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-1"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="relative aspect-square sm:aspect-auto sm:h-72 md:h-96 rounded-xl overflow-hidden group">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.label && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-3">
                      <p className="text-white font-semibold text-sm tracking-wide">{item.label}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Prev button */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors z-10"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors z-10"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {galleryItems.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimate(true); setIndex(i); }}
              className={`rounded-full transition-all duration-300 ${i === index % total ? 'w-5 h-2 bg-gray-700' : 'w-2 h-2 bg-gray-300'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}