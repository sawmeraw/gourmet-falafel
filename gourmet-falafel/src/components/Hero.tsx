"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

export default function Hero() {
  const images = [
    { src: "/cafe1.jpg", id: 1, alt: "Cafe Interior" },
    { src: "/cafe2.jpg", id: 2, alt: "Coffee Being Served" },
    { src: "/cafe3.jpg", id: 3, alt: "Delicious Pastry" },
  ];
  return (
    <section
      id="hero"
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
    >
      <Swiper
        className="hero-swiper h-full w-full"
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        slidesPerView={1}
        spaceBetween={0}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id}>
            {/* This <div> wrapper is important.
                It gives the <Image> component with "fill" a relative parent
                that is guaranteed to be 100% height of the slide.
              */}
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* These overlays will now render *on top* of the Swiper,
          because they are 'absolute' and the <section> is 'relative'.
          This is the correct stacking order.
        */}

      {/* Black overlay for text readability */}
      {/*<div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>*/}

      {/* Your original text content and CTA */}
      <div className="absolute inset-0 flex flex-col justify-end z-20">
        <div className="p-8 md:p-12 lg:p-16">
          <div className="max-w-xl text-white">
            <h1 className="logo-font text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Gourmet Falafel
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              A Bite of Tradition, A Dash of Magic
            </p>
            <a
              href="#menu"
              className="button-primary transition-colors text-white text-lg px-6 py-3 rounded-md font-semibold inline-block"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <section
//       id="hero"
//       className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
//     >
//       {images.map((image, index) => (
//         <>
//           <div
//             key={image.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//               index === currentIndex ? "opacity-50" : "opacity-0"
//             }`}
//           >
//             <Image
//               src={image.src}
//               alt={image.alt}
//               fill
//               style={{ objectFit: "cover" }}
//               priority={index === 0}
//             />
//           </div>
//         </>
//       ))}

//       <div className="absolute inset-0 bg-black bg-opacity-40 -z-10"></div>
//       <div className="absolute inset-0 flex flex-col justify-end">
//         <div className="p-8 md:p-12 lg:p-16">
//           <div className="max-w-xl text-white">
//             <h1 className="logo-font text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//               Gourmet Falafel
//             </h1>
//             <p className="text-xl md:text-2xl mb-8">
//               A Bite of Tradition, A Dash of Magic
//             </p>
//             <a
//               href="#menu"
//               className="button-primary transition-colors text-white text-lg px-6 py-3 rounded-md font-semibold inline-block"
//             >
//               View Menu
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 right-6 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === currentIndex
//                 ? "button-primary"
//                 : "bg-white bg-opacity-50"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
