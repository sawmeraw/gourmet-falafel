"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useSwipe } from '@/hooks/useSwipe';

const images = [
  { src: '/cafe1.jpg', alt: 'ACM Shop' },
  { src: '/shop_acm.jpg', alt: 'ACM Shop' },
  { src: '/dish_platter.jpg', alt: 'Dish Platter' },
];

const AUTO_INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const total = images.length;
  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total]);

  const swipe = useSwipe(next, prev);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      id="hero"
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={swipe.onTouchStart}
      onTouchEnd={swipe.onTouchEnd}
    >
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(-2deg); }
        }
        .hero-float { animation: hero-float 4s ease-in-out infinite; }
      `}</style>

      {/* Mobile video background — plays once, then hands off to slider */}
      {!videoEnded && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50 md:hidden"
          src="/media/trailer_mobile.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
        />
      )}

      {/* Slides — always on desktop, on mobile only after video ends */}
      {images.map((image, i) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            videoEnded ? '' : 'hidden md:block'
          } ${i === current ? 'opacity-50' : 'opacity-0'}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: 'cover' }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 -z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="p-8 md:p-12 lg:p-16">
          <div className="max-w-xl text-white">
            <h1 className="logo-font text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Gourmet Falafel</h1>
            <p className="text-xl md:text-2xl mb-8">A Bite of Tradition, A Dash of Magic</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#menu"
                className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-full text-sm hover:bg-gray-100 transition-colors"
              >
                View Menu
              </a>
              <a
                href="https://www.ubereats.com/au/store/gourmet-falafel-rundle-mall/vTZ-NAi8V2meSPyayeQqiw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[color:var(--color-primary)] text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Order Online
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating falafel bowl — desktop only */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block z-10 pointer-events-none">
        <div className="hero-float">
          <div className="bg-white rounded-3xl p-4 shadow-2xl">
            <Image
              src="/misc/bowl_animated.png"
              alt="Falafel Bowl"
              width={160}
              height={160}
              className="block"
            />
          </div>
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 ${videoEnded ? 'flex' : 'hidden md:flex'} items-center justify-center transition-colors z-10`}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={next}
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 ${videoEnded ? 'flex' : 'hidden md:flex'} items-center justify-center transition-colors z-10`}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className={`absolute bottom-6 right-6 ${videoEnded ? 'flex' : 'hidden md:flex'} items-center gap-2`}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
