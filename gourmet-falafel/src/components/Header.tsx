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
            </ul>
          </nav>
        </div>
      </div>

      {/* Tile accent — bottom */}
      <div aria-hidden="true" style={{ height: 8, ...tileStrip, backgroundSize: 'auto 8px' }} />

    </header>
  );
}
