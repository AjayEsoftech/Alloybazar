import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import CategorySection from "@/components/CategorySection";
import { categories } from "@/data/categories";
import AboutUs from "@/components/sections/AboutUs";
import ChallengesSolutions from "@/components/sections/ChallengesSolutions";
import HowItWorks from "@/components/sections/HowItWorks";
import WhoWeServe from "@/components/sections/WhoWeServe";
import WhyChoose from "@/components/sections/WhyChoose";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import MarketTicker from "@/components/sections/MarketTicker";
import TrustedBy from "@/components/sections/TrustedBy";
import Stats from "@/components/sections/Stats";
import Industries from "@/components/sections/Industries";
import LiveListings from "@/components/sections/LiveListings";
import Testimonials from "@/components/sections/Testimonials";
import CoreServices from "@/components/sections/CoreServices";
import Reveal from "@/components/Reveal";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MarketTicker />
      <Header />

      <HeroSection />

      <main className="flex-1 bg-background">
        <CoreServices />

        <TrustedBy />

        <Stats />

        <AboutUs />

        <ChallengesSolutions />

        <HowItWorks />

        <Industries />

        <LiveListings />

        <WhoWeServe />

        <WhyChoose />

        {/* Product catalogue preview */}
        <section id="catalogue" className="py-16 md:py-24 border-b bg-white">
          <Reveal>
            <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-3">
              <div id="categories" className="sr-only" />
              <div id="products" className="sr-only" />
              <p className="eyebrow">Product Categories</p>
              <h2 className="heading-display">
                From standard grades
                <br />
                to specialised alloys
              </h2>
              <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
                A snapshot of the catalogue we&apos;re building. Each listing includes typical specifications, applications
                and documentation expectations used in industrial procurement.
              </p>
            </div>
          </Reveal>

          <div className="bg-background mt-6">
            {categories.map((cat) => (
              <CategorySection
                key={cat.title}
                slug={cat.slug}
                title={cat.title}
                sideLinks={cat.sideLinks}
                products={cat.products}
              />
            ))}
          </div>
        </section>

        <Testimonials />

        <FAQ />

        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
