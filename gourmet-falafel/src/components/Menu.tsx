"use client"

import { useState } from 'react';
import Image from 'next/image';

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState('breakfast');

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Menu</h2>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeMenu === 'breakfast'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveMenu('breakfast')}
            >
              Breakfast
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeMenu === 'lunch'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveMenu('lunch')}
            >
              Lunch
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {activeMenu === 'breakfast' ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                <Image 
                  src="/breakfast_menu.jpg" 
                  alt="Breakfast Menu" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                <Image 
                  src="/lunch_menu.jpg" 
                  alt="Lunch Menu" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}