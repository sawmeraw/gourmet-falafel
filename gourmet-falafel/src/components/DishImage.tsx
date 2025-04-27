"use client"

import Image from 'next/image';

type DishItem = {
  id: number;
  name: string;
  image: string;
  description?: string;  // Optional short description
};

export default function FeaturedDishes() {
  // Sample dishes - replace with your actual dishes
  const dishes: DishItem[] = [
    {
      id: 1,
      name: "Classic Falafel Plate",
      image: "/dish/dish1.jpg",
    },
    {
      id: 2,
      name: "Mediterranean Salad",
      image: "/dish/dish2.jpg",
    },
    {
      id: 3,
      name: "Hummus & Pita",
      image: "/dish/dish3.jpg",
    }
  ];

  return (
    <section id="featured-dishes" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">Our Specialties</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Fresh ingredients and authentic recipes for a true taste experience
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <div 
              key={dish.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800">{dish.name}</h3>
                {dish.description && (
                  <p className="text-gray-600 text-sm mt-1">{dish.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}