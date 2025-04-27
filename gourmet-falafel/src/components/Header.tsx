"use client"

import Image from 'next/image';
import { useState } from 'react';
import { IoMenu } from "react-icons/io5";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="w-24 h-24 relative">
          <Image 
            src="/logo.jpg" 
            alt="Gourmet Falafel Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="#hero" className="text-gray-800 hover:text-amber-600 transition-colors">Home</a></li>
            <li><a href="#menu" className="text-gray-800 hover:text-amber-600 transition-colors">Menu</a></li>
            <li><a href="#hours" className="text-gray-800 hover:text-amber-600 transition-colors">Opening Hours</a></li>
          </ul>
        </nav>
        <div className="md:hidden relative">
          <button 
            className="text-gray-800 active:scale-110 duration-300" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <IoMenu size={30}/>
          </button>
          
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <ul className="py-1">
                <li>
                  <a 
                    href="#hero" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500 hover:text-white" 
                    onClick={toggleMenu}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#menu" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500 hover:text-white" 
                    onClick={toggleMenu}
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a 
                    href="#hours"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-500 hover:text-white" 
                    onClick={toggleMenu}
                  >
                    Opening Hours
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}