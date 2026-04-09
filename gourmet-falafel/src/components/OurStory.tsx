"use client"

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Counter from './Counter';

const images = [
  // { src: '/cafe-shop.jpg',      alt: 'Gourmet Falafel kitchen' },
  { src: '/opening-hours.jpg',  alt: 'Gourmet Falafel store' },
];

export default function OurStory() {
  const [current, setCurrent] = useState(0);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setCurrent(i => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = imageWrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 (above) to 1 (below) progress through viewport
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const offset = Math.max(-40, Math.min(40, -progress * 40));
      inner.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Auto-swiper image */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div ref={imageWrapRef} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <div ref={innerRef} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.15)' }}>
              {images.map((img, i) => (
                <div
                  key={img.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    i === current ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority={i === 0}
                  />
                </div>
              ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-[color:var(--color-primary)] text-sm font-semibold tracking-widest uppercase">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Our Story</h2>

            <div className="space-y-4 font-secondary text-gray-600 text-lg leading-relaxed">
              <p>
                Gourmet Falafel was born out of a simple belief that real food, made with real ingredients, should be available to everyone. Our falafels are crafted fresh every single day using a recipe passed down through generations, brought to the heart of Adelaide.
              </p>
              <p>
                We set up at the Adelaide Central Market and Adelaide Central Plaza because we wanted to be where the community is, where locals shop, where families gather, and where great food finds its people.
              </p>
              <p>
                Every bite is 100% South Australian made. No preservatives. No shortcuts. Just honest, flavourful food you can feel good about.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
              <div className="text-center">
                <Counter to={100} suffix="%" className="text-4xl font-bold text-[color:var(--color-primary)]" />
                <p className="text-sm text-gray-500 mt-1 font-secondary">SA Made</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <Counter to={2} className="text-4xl font-bold text-[color:var(--color-primary)]" />
                <p className="text-sm text-gray-500 mt-1 font-secondary">Locations</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-4xl font-bold text-[color:var(--color-primary)]">Daily</p>
                <p className="text-sm text-gray-500 mt-1 font-secondary">Fresh Made</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}