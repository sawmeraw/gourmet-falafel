"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
  const images = [
    { src: '/cafe1.jpg', alt: 'Cafe Interior' },
    { src: '/cafe2.jpg', alt: 'Coffee Being Served' },
    { src: '/cafe3.jpg', alt: 'Delicious Pastry' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="hero" className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">

      {images.map((image, index) => (
        <div
          key={image.alt}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-50' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </div>
      ))}
      
      <div className="absolute inset-0 bg-black bg-opacity-40 -z-10"></div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="p-8 md:p-12 lg:p-16">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Gourmet Falafel</h1>
            <p className="text-xl md:text-2xl mb-8">Delicious food and great coffee</p>
            <a 
              href="#menu"
              className="bg-amber-600 hover:bg-amber-700 transition-colors text-white px-6 py-3 rounded-lg font-semibold inline-block"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>
      
      {/* Image indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-amber-500' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}