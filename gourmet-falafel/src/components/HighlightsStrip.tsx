"use client"

import Image from 'next/image';

const highlights = [
  'Fully Vegan',
  'Gluten Free',
  'SA Made',
  'Freshly Made Daily',
  'No Preservatives',
  'Family Owned',
  'Market Fresh',
];

function Ball() {
  return (
    <Image
      src="/misc/falafel_ball.png"
      alt=""
      width={22}
      height={22}
      className="rounded-full flex-shrink-0 shadow-sm"
      aria-hidden="true"
    />
  );
}

// One full unit: all highlight items with ball separators + illustration mid-way
function Unit() {
  return (
    <div className="flex items-center flex-shrink-0">
      {highlights.map((text, i) => (
        <div key={i} className="flex items-center flex-shrink-0">
          <span className="text-gray-300 font-semibold text-sm tracking-wide whitespace-nowrap select-none px-5">
            {text}
          </span>
          {
            <Ball />
          }
        </div>
      ))}
    </div>
  );
}

export default function HighlightsStrip() {
  return (
    <div className="bg-[#111] border-y border-gray-800 py-2 overflow-hidden">
      <style>{`
        @keyframes highlights-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .highlights-track {
          animation: highlights-scroll 30s linear infinite;
        }
        .highlights-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      {/* 3 copies — animating -33.33% moves exactly one copy width, loops seamlessly */}
      <div className="highlights-track flex items-center w-max">
        <Unit />
        <Unit />
        <Unit />
      </div>
    </div>
  );
}
