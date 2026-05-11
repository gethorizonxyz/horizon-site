import { Footer } from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { PricingSection } from "./components/PricingSection";
import { ProductSection } from "./components/ProductSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductSection />
        <PricingSection />
        {/* White seam — fills Pricing's rounded bottom cutaways with Footer's bg color */}
        <div
          aria-hidden="true"
          className="relative z-[1] -mt-8 h-8 bg-white"
        />
        <Footer />
      </main>
    </>
  );
}
