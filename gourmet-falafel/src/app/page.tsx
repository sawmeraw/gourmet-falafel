import FeaturedDishes from "@/components/FeaturedDishes";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HighlightsStrip from "@/components/HighlightsStrip";
import Menu from "@/components/Menu";
import OpeningHours from "@/components/OpeningHours";
import OurStory from "@/components/OurStory";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HighlightsStrip />
        <Menu />
        <FeaturedDishes />
        <OurStory />
        <Testimonials />
        <Gallery />
        <OpeningHours />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}