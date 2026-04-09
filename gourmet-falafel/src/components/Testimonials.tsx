"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: 'Diane M.',
    text: 'Excellent falafel. Really enjoyed the food and the team. The restaurant has changed its name so give it some love as Gourmet Falafel.',
    stars: 5,
    source: 'Google Review',
  },
  {
    name: 'Faizz F.',
    text: 'Surrender and the team are just sensational. Great advice, and excellent service along with some delicious falafel. 🥙 I highly recommend you try this place out. 🙌',
    stars: 5,
    source: 'Google Review',
  },
  {
    name: 'Jon H.',
    text: 'Absolutely awesome breakfast, came here 3 yrs ago and I think was better again. Falafels, hummus, labneh, halloumi and salads are all so fresh. Our favourite Breakfast in the Adelaide Central Market. We’ll be back',
    stars: 5,
    source: 'Google Review',
  },
  {
    name: 'SK',
    text: 'Best falafel ever. I am visiting here from USA. I had many falafels in my life (including in middle east). This falafels were very good, soft inside/ bit crunch outside/excellent flavor. Everyone here are very friendly and genuinely care about their food. Must eat if you visit central market in Adelaide.',
    stars: 5,
    source: 'Google Review',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const pausedRef = useRef(false);

  // autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
    pausedRef.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };

  const onTouchEnd = () => {
    if (Math.abs(deltaX.current) > 50) {
      if (deltaX.current < 0) setIndex((i) => (i + 1) % reviews.length);
      else setIndex((i) => (i - 1 + reviews.length) % reviews.length);
    }
    startX.current = null;
    deltaX.current = 0;
    setTimeout(() => (pausedRef.current = false), 4000);
  };

  return (
    <section className="bg-primary py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-[color:var(--color-primary)] text-sm font-semibold tracking-widest uppercase">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Loved by Adelaide</h2>
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden max-w-md mx-auto">
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.name} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-4 h-[340px]">
                    <Stars count={review.stars} />
                    <p className="text-gray-600 font-secondary text-sm leading-relaxed flex-1 overflow-y-auto">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                        <p className="text-xs text-gray-400 font-secondary">{review.source}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === index ? "w-6 h-2 bg-gray-800" : "w-2 h-2 bg-gray-400/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Stars count={review.stars} />
              <p className="text-gray-600 font-secondary text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                  <p className="text-xs text-gray-400 font-secondary">{review.source}</p>
                </div>
                <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
