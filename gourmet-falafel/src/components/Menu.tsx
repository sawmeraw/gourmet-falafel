"use client"

import { useState } from 'react';
import Image from 'next/image';

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState('breakfast');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section id="menu" className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">Our Menu</h2>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-md">
            <button
              type="button"
              className={`px-6 py-3 text-lg font-medium rounded-l-lg transition-colors ${
                activeMenu === 'breakfast'
                  ? 'button-primary text-white'
                  : 'bg-white text-gray-700 cursor-pointer hover:bg-gray-50'
              }`}
              onClick={() => setActiveMenu('breakfast')}
            >
              Breakfast Menu
            </button>
            <button
              type="button"
              className={`px-6 py-3 text-lg font-medium rounded-r-lg transition-colors ${
                activeMenu === 'lunch'
                  ? 'button-primary text-white'
                  : 'bg-white text-gray-700 cursor-pointer hover:bg-gray-50'
              }`}
              onClick={() => setActiveMenu('lunch')}
            >
              Lunch Menu
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeMenu === 'breakfast' ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[32rem] md:h-[40rem] lg:h-[48rem] w-full">
                <Image 
                  src="/breakfast_menu.jpg" 
                  alt="Breakfast Menu" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="cursor-pointer"
                  onClick={toggleFullscreen}
                  priority
                />
                <button 
                  className="absolute bottom-4 right-4 button-primary text-white p-2 rounded-full shadow-md hover:bg-amber-700 transition-colors"
                  onClick={toggleFullscreen}
                  aria-label="View larger menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[32rem] md:h-[40rem] lg:h-[48rem] w-full">
                <Image 
                  src="/lunch_menu.jpg" 
                  alt="Lunch Menu" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="cursor-pointer"
                  onClick={toggleFullscreen}
                  priority
                />
                <button 
                  className="absolute bottom-4 right-4 button-primary text-white p-2 rounded-full shadow-md transition-colors"
                  onClick={toggleFullscreen}
                  aria-label="View larger menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={toggleFullscreen}
        >
          <div className="relative w-full h-[90vh] max-w-6xl">
            <button 
              className="absolute top-4 right-4 button-primary text-black p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              aria-label="Close fullscreen view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={activeMenu === 'breakfast' ? '/breakfast_menu.jpg' : '/lunch_menu.jpg'}
              alt={activeMenu === 'breakfast' ? 'Breakfast Menu' : 'Lunch Menu'}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}