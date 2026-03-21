"use client"

import { IoLeafOutline, IoShieldCheckmarkOutline, IoStarOutline, IoHeartOutline, IoStorefrontOutline, IoFlowerOutline } from 'react-icons/io5';

const highlights = [
  { icon: IoLeafOutline,            text: '100% Vegan Options' },
  { icon: IoShieldCheckmarkOutline, text: 'Gluten Free' },
  { icon: IoStarOutline,            text: 'SA Made' },
  { icon: IoFlowerOutline,          text: 'Freshly Made Daily' },
  { icon: IoLeafOutline,            text: 'No Preservatives' },
  { icon: IoHeartOutline,           text: 'Family Owned' },
  { icon: IoStorefrontOutline,      text: 'Market Fresh' },
];

// Duplicate for seamless infinite scroll
const items = [...highlights, ...highlights];

export default function HighlightsStrip() {
  return (
    <div className="bg-primary border-y border-gray-200 py-4 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 24s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track flex items-center gap-6 w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6 flex-shrink-0">
            <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-5 py-2 shadow-sm select-none">
              <item.icon size={15} className="text-[color:var(--color-primary)] flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{item.text}</span>
            </div>
            <span className="text-gray-300 select-none">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}