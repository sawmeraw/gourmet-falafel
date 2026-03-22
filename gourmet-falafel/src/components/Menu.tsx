"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoSunnyOutline, IoLeafOutline } from 'react-icons/io5';

const menus = [
  { key: 'breakfast', label: 'Breakfast', sublabel: 'Morning menu', src: '/breakfast_menu.jpg', Icon: IoSunnyOutline },
  { key: 'lunch',     label: 'Lunch',     sublabel: 'All-day menu',  src: '/lunch_menu.jpg',    Icon: IoLeafOutline  },
];

const tileStyle = (height: number, radius?: string): React.CSSProperties => ({
  height,
  backgroundImage: 'url(/misc/strip.jpg)',
  backgroundRepeat: 'repeat-x',
  backgroundSize: `auto ${height}px`,
  borderRadius: radius ?? 0,
});

export default function Menu() {
  const [active, setActive] = useState('breakfast');
  const [fading, setFading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentMenu = menus.find(m => m.key === active)!;

  const switchMenu = (key: string) => {
    if (key === active) return;
    setFading(true);
    setTimeout(() => { setActive(key); setFading(false); }, 180);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="menu" className="py-16 bg-primary">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-[color:var(--color-primary)] uppercase mb-2">What we serve</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Menu</h2>
        </div>

        {/* Cover card selectors */}
        <div className="flex gap-3 justify-center mb-8 max-w-xs mx-auto">
          {menus.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => switchMenu(m.key)}
              aria-pressed={active === m.key}
              className={`group relative overflow-hidden flex-1 rounded-xl h-16 transition-all duration-300 cursor-pointer ${
                active === m.key
                  ? 'ring-2 ring-[color:var(--color-primary)] scale-[1.04] shadow-lg shadow-black/40'
                  : 'opacity-50 hover:opacity-70 hover:scale-[1.02]'
              }`}
            >
              <Image
                src={m.src}
                alt={m.label}
                fill
                style={{ objectFit: 'cover' }}
                className="scale-110 blur-sm brightness-[0.15]"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <m.Icon size={15} className="text-[color:var(--color-primary)]" />
                <span className="text-white font-bold text-sm tracking-wide">{m.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Framed menu image */}
        <div className="max-w-4xl mx-auto">
          <div aria-hidden="true" style={tileStyle(12, '12px 12px 0 0')} />
          <div className={`bg-white transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative h-[32rem] md:h-[40rem] lg:h-[48rem] w-full">
              <Image
                src={currentMenu.src}
                alt={currentMenu.label}
                fill
                style={{ objectFit: 'contain' }}
                className="cursor-zoom-in"
                onClick={() => setIsOpen(true)}
                priority
              />
              <button
                onClick={() => setIsOpen(true)}
                aria-label="View full size menu"
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
          <div aria-hidden="true" style={tileStyle(12, '0 0 12px 12px')} />
        </div>

      </div>

      {/* Lightbox */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative w-full h-[90vh] max-w-5xl" onClick={e => e.stopPropagation()}>
          <Image src={currentMenu.src} alt={currentMenu.label} fill style={{ objectFit: 'contain' }} priority />
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </section>
  );
}
