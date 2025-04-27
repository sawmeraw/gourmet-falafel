"use client"

import Image from 'next/image';
// import { useState } from 'react';

export default function Header() {
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <header className="sticky top-0 bg-primary z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="w-24 h-24 relative">
          <Image 
            src="/logo_no_bg.png"
            alt="Gourmet Falafel Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        {/* <nav className="hidden md:block"> */}
        <nav>
          <ul className="flex space-x-6">
            {/* <li className='hover:'><a href="#menu" className="text-gray-800 text-lg hover:[color:var(--color-primary)] transition-colors">Menu</a></li> */}
            <li><a href="#hours" className="text-gray-800 text-md md:text-lg hover:[color:var(--color-primary)] transition-colors">Opening Hours</a></li>
          </ul>
        </nav>
        {/* <div className="md:hidden relative">
          <button 
            className="text-gray-800 active:scale-110 duration-300" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <IoMenu size={30}/>
          </button> */}
          
          {/* {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <ul className="py-1">
                <li>
                  <a 
                    href="#menu" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:[color:var(--color-primary)]" 
                    onClick={toggleMenu}
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a 
                    href="#hours"
                    className="block px-4 py-2 text-sm text-gray-700 hover:[color:var(--color-primary)]" 
                    onClick={toggleMenu}
                  >
                    Opening Hours
                  </a>
                </li>
              </ul>
            </div>
          )} */}
        </div>
      {/* </div> */}
    </header>
  );
}