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
          <span className="text-gray-700 font-semibold text-sm tracking-wide whitespace-nowrap select-none px-5">
            {text}
          </span>
          {i === 2 ? (
            // Illustration in the middle of each loop
            <Image
              src="/misc/falafel_2d_350w.png"
              alt=""
              width={52}
              height={52}
              className="flex-shrink-0 mx-2"
              aria-hidden="true"
            />
          ) : (
            <Ball />
          )}
        </div>
      ))}
    </div>
  );
}

export default function HighlightsStrip() {
  return (
    <div className="bg-primary border-y border-gray-100 py-2 overflow-hidden">
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
