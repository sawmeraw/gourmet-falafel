"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

const menus = [
  { key: 'breakfast', label: 'Breakfast Menu', src: '/breakfast_menu.jpg' },
  { key: 'lunch',     label: 'Lunch Menu',     src: '/lunch_menu.jpg'     },
];

export default function Menu() {
  const [active, setActive] = useState('breakfast');
  const [isOpen, setIsOpen] = useState(false);

  const currentMenu = menus.find(m => m.key === active)!;

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="menu" className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">Our Menu</h2>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-md overflow-hidden">
            {menus.map((m, i) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setActive(m.key)}
                className={`px-6 py-3 text-base font-medium transition-colors ${
                  active === m.key
                    ? 'button-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${i === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu image */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
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
      </div>

      {/* Lightbox — always in DOM, fades in/out */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="relative w-full h-[90vh] max-w-5xl"
          onClick={e => e.stopPropagation()}
        >
          <Image
            src={currentMenu.src}
            alt={currentMenu.label}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Close button */}
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