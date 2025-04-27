import FeaturedDishes from "@/components/DishImage";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import LocationBanner from "@/components/LocationBanner";
import Menu from "@/components/Menu";
import OpeningHours from "@/components/OpeningHours";



export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LocationBanner/>
        <Menu />
        <FeaturedDishes/>
        <Gallery/>
        <OpeningHours/>
      </main>
      <Footer />
      
    </>
  );
}
