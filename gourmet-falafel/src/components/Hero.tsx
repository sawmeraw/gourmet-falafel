"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useSwipe } from '@/hooks/useSwipe';
import OpenNowBadge from './OpenNowBadge';
import { FalafelBall, MintLeaf, SesameSeed, Steam } from './FalafelDecor';

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
      className="relative h-[560px] md:h-[600px] lg:h-[700px] overflow-hidden"
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

        @keyframes hero-rise {
          0%   { opacity: 0; transform: translate3d(0, 28px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .hero-rise { opacity: 0; animation: hero-rise 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .hero-delay-1 { animation-delay: 200ms; }
        .hero-delay-2 { animation-delay: 400ms; }
        .hero-delay-3 { animation-delay: 600ms; }
        .hero-delay-4 { animation-delay: 800ms; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise { opacity: 1; animation: none; }
          .decor-bob, .decor-drift, .decor-spin { animation: none !important; }
        }

        @keyframes decor-bob {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50%      { transform: translateY(-10px) rotate(var(--rot, 0deg)); }
        }
        @keyframes decor-drift {
          0%, 100% { transform: translate(0,0) rotate(var(--rot, 0deg)); }
          50%      { transform: translate(6px,-8px) rotate(calc(var(--rot, 0deg) + 6deg)); }
        }
        @keyframes decor-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .decor-bob { animation: decor-bob 5s ease-in-out infinite; }
        .decor-drift { animation: decor-drift 6s ease-in-out infinite; }

        @keyframes scroll-hint {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(6px); opacity: 1; }
        }
        .scroll-hint { animation: scroll-hint 1.8s ease-in-out infinite; }

        @keyframes tagline-rotate {
          0%, 22%   { opacity: 1; transform: translateY(0); }
          28%, 95%  { opacity: 0; transform: translateY(-8px); }
          100%      { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Mobile video background — plays once, then hands off to slider */}
      {!videoEnded && (
        <video
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          src="/media/trailer_mobile.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
        />
      )}

      {/* Slides */}
      {images.map((image, i) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            videoEnded ? '' : 'hidden md:block'
          } ${i === current ? 'opacity-100' : 'opacity-0'}`}
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

      {/* Subtle gradient — only at top + bottom for text legibility, no greyish wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/50 pointer-events-none" />

      {/* === Decorative SVGs (mobile + desktop) === */}
      <FalafelBall
        size={56}
        className="absolute top-[18%] left-[8%] decor-bob pointer-events-none drop-shadow-lg"
        style={{ ['--rot' as string]: '-12deg' } as React.CSSProperties}
      />
      <FalafelBall
        size={36}
        className="absolute top-[55%] left-[14%] decor-bob pointer-events-none drop-shadow-md hidden sm:block"
        style={{ ['--rot' as string]: '8deg', animationDelay: '0.8s' } as React.CSSProperties}
      />
      <MintLeaf
        size={48}
        className="absolute bottom-[30%] right-[10%] decor-drift pointer-events-none drop-shadow-lg"
        style={{ ['--rot' as string]: '20deg' } as React.CSSProperties}
      />
      <MintLeaf
        size={34}
        className="absolute top-[25%] right-[25%] decor-drift pointer-events-none drop-shadow-md hidden sm:block"
        style={{ ['--rot' as string]: '-30deg', animationDelay: '1.2s' } as React.CSSProperties}
      />
      {/* Sesame scatter */}
      {[
        { top: '32%', left: '42%', size: 8, rot: 30 },
        { top: '48%', left: '70%', size: 10, rot: -20 },
        { top: '22%', left: '60%', size: 7, rot: 50 },
        { top: '62%', left: '32%', size: 9, rot: 10 },
        { top: '70%', left: '58%', size: 8, rot: -45 },
      ].map((s, i) => (
        <SesameSeed
          key={i}
          size={s.size}
          className="absolute decor-bob pointer-events-none opacity-80"
          style={{
            top: s.top,
            left: s.left,
            transform: `rotate(${s.rot}deg)`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* === Content === */}
      {/* Mobile: top-aligned. Desktop: bottom-aligned. */}
      <div className="absolute inset-0 flex flex-col md:justify-end">

        {/* MOBILE content */}
        <div className="md:hidden flex flex-col h-full pt-20 px-6 pb-8">
          <div className="text-white">
            <h1 className="logo-font text-5xl font-bold leading-[0.95] mb-4 hero-rise hero-delay-1 drop-shadow-2xl">
              Gourmet<br />Falafel
            </h1>
            <div className="hero-rise hero-delay-2">
              <OpenNowBadge size="sm" />
            </div>
          </div>

          <div className="mt-auto hero-rise hero-delay-3">
            <div className="flex gap-2">
              <a
                href="#menu"
                className="flex-1 text-center px-4 py-3 bg-white text-gray-800 font-semibold rounded-full text-sm shadow-lg active:scale-95 transition-transform"
              >
                View Menu
              </a>
              <a
                href="#order-online"
                className="flex-[1.3] text-center px-4 py-3 button-primary text-white font-semibold rounded-full text-sm shadow-lg active:scale-95 transition-transform"
              >
                Order Online
              </a>
            </div>
            <div className="flex justify-center mt-3 scroll-hint text-white/80">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* DESKTOP content */}
        <div className="hidden md:block p-8 md:p-12 lg:p-16">
          <div className="max-w-xl text-white">
            <h1 className="logo-font text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-rise hero-delay-1">Gourmet Falafel</h1>
            <p className="text-xl md:text-2xl mb-6 hero-rise hero-delay-2">A Bite of Tradition, A Dash of Magic</p>
            <div className="mb-6 hero-rise hero-delay-3">
              <OpenNowBadge />
            </div>
            <div className="flex flex-wrap gap-3 hero-rise hero-delay-4">
              <a
                href="#menu"
                className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-full text-sm hover:bg-gray-100 transition-colors"
              >
                View Menu
              </a>
              <a
                href="#order-online"
                className="px-6 py-3 bg-[color:var(--color-primary)] text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Order Online
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop floating bowl */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block z-10 pointer-events-none">
        <div className="relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <Steam size={70} />
          </div>
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
      </div>

      {/* Prev / Next / Dots — desktop only (mobile is busy enough) */}
      <button
        onClick={prev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 hidden md:flex items-center justify-center transition-colors z-10`}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 hidden md:flex items-center justify-center transition-colors z-10`}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className={`absolute bottom-6 right-6 hidden md:flex items-center gap-2`}>
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
