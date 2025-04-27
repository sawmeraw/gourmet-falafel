import FeaturedDishes from "@/components/DishImage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import Menu from "@/components/Menu";


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <FeaturedDishes/>        
        <Location />
      </main>
      <Footer />
      
    </>
  );
}
