"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <section id="hero" className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.alt}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
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
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Our Cafe</h1>
          <p className="text-xl md:text-2xl mb-8">Delicious food and great coffee</p>
          <a 
            href="#menu" 
            className="bg-amber-600 hover:bg-amber-700 transition-colors text-white px-6 py-3 rounded-lg font-semibold"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
}