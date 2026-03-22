"use client"

import Image from 'next/image';
import Link from 'next/link';

const tileStrip: React.CSSProperties = {
  backgroundImage: 'url(/misc/strip.jpg)',
  backgroundRepeat: 'repeat-x',
  backgroundSize: 'auto 100%',
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-md">

      {/* Tile accent — top */}
      <div aria-hidden="true" style={{ height: 8, ...tileStrip, backgroundSize: 'auto 8px' }} />

      {/* Nav bar */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/" className="w-18 h-18 relative block">
            <Image
              src="/logo_no_bg.png"
              alt="Gourmet Falafel Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>
          <nav>
            <ul className="flex items-center gap-4 md:gap-6">
              <li className="hidden sm:block"><a href="#menu" className="text-gray-700 text-sm md:text-base font-medium hover:[color:var(--color-primary)] transition-colors">Menu</a></li>
              <li className="hidden sm:block"><a href="#gallery" className="text-gray-700 text-sm md:text-base font-medium hover:[color:var(--color-primary)] transition-colors">Gallery</a></li>
              <li className="hidden sm:block">
                <a href="tel:+610416120204" className="button-primary text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hidden md:inline">Call Us</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Tile accent — bottom */}
      <div aria-hidden="true" style={{ height: 8, ...tileStrip, backgroundSize: 'auto 8px' }} />

    </header>
  );
}
