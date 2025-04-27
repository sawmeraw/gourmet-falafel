"use client"

import Image from 'next/image';

export default function OpeningHours() {
  const hours = [
    { day: 'Monday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Tuesday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '7:00 AM - 9:00 PM' },
    { day: 'Friday', hours: '7:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 10:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 6:00 PM' },
  ];

  return (
    <section id="hours" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative h-96 lg:h-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/cafe-shop.jpg"
                alt="Cafe"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
          

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 relative">
              <div className="absolute top-8 right-8 w-24 h-24 button-primary rounded-bl-full rounded-tr-lg -mt-8 -mr-8 flex items-center justify-center transform">
                <span className="text-white font-bold text-lg transform rotate-12">Open</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Hours of Operation</h2>
              <p className="text-gray-900 mb-8 text-lg font-secondary">Visit us at your convenience. We're open every day of the week!</p>
              
              <div className="space-y-4 font-secondary font-semibold">
                {hours.map((item) => (
                  <div key={item.day} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-800">{item.day}</span>
                    <span className="text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-4 rounded-lg border-l-4 bg-primary">
                <p className="text-black font-medium">
                  <span className="font-bold">Holiday Hours:</span> Hours may vary on holidays and special occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}