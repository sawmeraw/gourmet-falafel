"use client"

import Image from 'next/image';

const dishes = [
  {
    src: '/dish/dish1.jpg',
    name: 'Falafel Plate',
    description: 'Our signature crispy falafels served with creamy hummus, fresh tabbouleh and warm pita — the full Gourmet experience on one plate.',
    tag: 'Fan Favourite',
  },
  {
    src: '/dish/dish2.jpg',
    name: 'Falafel Wrap',
    description: 'House-made falafels rolled in a soft pita with tahini, pickles, tomato and fresh greens. Simple, satisfying, and absolutely packed.',
    tag: 'Most Ordered',
  },
  {
    src: '/dish/dish3.jpg',
    name: 'Mixed Bowl',
    description: 'A generous bowl with falafel, grilled veg, fresh salad and your choice of sauces — fully vegan, fully loaded, fully delicious.',
    tag: 'Vegan & GF',
  },
];

export default function FeaturedDishes() {
  return (
    <section className="bg-[#111] py-20 px-4">
      <div className="container mx-auto">

        <div className="text-center mb-14">
          <span className="text-[color:var(--color-primary)] text-sm font-semibold tracking-widest uppercase">Fresh Every Day</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Our Most Popular Dishes</h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto font-secondary">
            Made from scratch with 100% South Australian ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <div key={dish.name} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-default">
              {/* Image */}
              <Image
                src={dish.src}
                alt={dish.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 ease-in-out group-hover:scale-110"
              />

              {/* Always-visible dark gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Tag badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[color:var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  {dish.tag}
                </span>
              </div>

              {/* Text — always visible */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-bold text-white">{dish.name}</h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed font-secondary">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}