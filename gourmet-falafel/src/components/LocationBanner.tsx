"use client"

import Image from 'next/image';
import { IoLocationSharp } from "react-icons/io5";

export default function LocationBanner() {
  return (
    <section className="bg-primary py-12 shadow-md border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full md:w-3/5">
            <div className="flex items-center">
              <div className="mr-5">
              <IoLocationSharp  size={40} className='text-color-primary'/>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-700">We are located at</h3>
                <p className="text-3xl font-bold text-color-primary">Adelaide Central Market</p>
                <p className="text-gray-600 mt-2">Stall 47-48, Adelaide SA 5000</p>
              </div>
            </div>
            
            {/* ACM Logo */}
            <div className="relative w-32 h-32 mt-4 md:mt-0">
              <Image
                src="/acm_logo.png" 
                alt="Adelaide Central Market Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}