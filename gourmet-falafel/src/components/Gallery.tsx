"use client"

import Image from 'next/image';
import { useState } from 'react';

export default function Gallery() {
  // Gallery items with better mobile-first layout
  const galleryItems = [
    { 
      id: 1, 
      src: '/gallery/gallery1.jpg', 
      alt: 'Gallery Image 1', 
      colSpan: 'col-span-2 sm:col-span-2', 
      height: 'h-48 sm:h-64 md:h-72'
    },
    { 
      id: 2, 
      src: '/gallery/gallery2.jpg', 
      alt: 'Gallery Image 2', 
      colSpan: 'col-span-1 sm:col-span-1', 
      height: 'h-48 sm:h-64 md:h-72'
    },
    { 
      id: 3, 
      src: '/gallery/gallery3.webp', 
      alt: 'Gallery Image 3', 
      colSpan: 'col-span-1 sm:col-span-1', 
      height: 'h-48 sm:h-64 md:h-72'
    },
    { 
      id: 4, 
      src: '/gallery/gallery4.jpg', 
      alt: 'Gallery Image 4', 
      colSpan: 'col-span-2 sm:col-span-1', 
      height: 'h-48 sm:h-64 md:h-80'
    },
    { 
      id: 5, 
      src: '/gallery/gallery5.jpg', 
      alt: 'Gallery Image 5', 
      colSpan: 'col-span-1 sm:col-span-1', 
      height: 'h-48 sm:h-64 md:h-80'
    },
    { 
      id: 6, 
      src: '/gallery/gallery6.jpg', 
      alt: 'Gallery Image 6', 
      colSpan: 'col-span-1 sm:col-span-2', 
      height: 'h-48 sm:h-64 md:h-72'
    },
    
  ];

  // For lightbox functionality
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-black">Gallery</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Take a visual tour of our cafe and our popular dishes
        </p>

        {/* 3-column grid on mobile, 3-column on tablet, 4-column on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className={`${item.colSpan} overflow-hidden rounded-lg shadow-md`}
              onClick={() => setSelectedImage(item.id)}
            >
              <div className={`relative w-full ${item.height} transition-transform duration-300 hover:scale-105 cursor-pointer`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-[80vh]">
            {/* <button 
              className="absolute -top-10 right-0.5 px-2 py-2 text-xl bg-white bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <IoIosCloseCircleOutline size={45} fill='red' />
            </button> */}
            <button 
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close fullscreen view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={galleryItems.find(item => item.id === selectedImage)?.src || ''}
                alt={galleryItems.find(item => item.id === selectedImage)?.alt || ''}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}