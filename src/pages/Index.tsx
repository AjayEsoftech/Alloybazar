import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import CategorySection from "@/components/CategorySection";
import { categories } from "@/data/categories";
import BulletIcon from "@/components/icons/BulletIcon";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Hero */}
      <HeroSection />

      <main className="flex-1 bg-background">
        {/* About section */}
        <section id="about" className="py-16 border-b">
          <div className="max-w-5xl mx-auto px-4 space-y-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What is Alloybazaar?</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Alloybazaar is a B2B marketplace built for alloy steel sourcing and supply. We help rolling mills,
                stockists, distributors, and end-users find the right grade faster, share specifications clearly, and
                move from enquiry to quotation with fewer back-and-forths.
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                This is an early-access launch to validate demand and onboard partners. If you buy, sell, stock, or
                distribute alloy steel, register your interest and we&apos;ll reach out with next steps.
              </p>
            </div>
          </div>
        </section>

        {/* User types section */}
        <section id="who" className="py-16 border-b bg-muted/40">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Built for every link in the chain</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Alloybazaar is designed for the complete alloy steel value chain, with tailored benefits for each user
                type.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-sm">
              {[
                {
                  title: "Rolling mills",
                  points: [
                    "Showcase grades, capacities & certifications",
                    "Surface visibility into upcoming production",
                    "Capture structured enquiries from buyers",
                  ],
                },
                {
                  title: "Stockists",
                  points: [
                    "Display live or indicative inventory",
                    "Reach verified trade buyers faster",
                    "Reduce idle and ageing stock",
                  ],
                },
                {
                  title: "Distributors",
                  points: [
                    "Digitise your demand funnel",
                    "Standardise quote & enquiry workflows",
                    "Track conversion across regions",
                  ],
                },
                {
                  title: "End-users",
                  points: [
                    "Search by grade, spec & application",
                    "Compare supply options in one view",
                    "Engage with trusted ecosystem partners",
                  ],
                },
              ].map((segment) => (
                <div key={segment.title} className="rounded-xl border bg-background p-4 space-y-3">
                  <h3 className="font-semibold text-base">{segment.title}</h3>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {segment.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-primary/70" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key benefits */}
        <section id="benefits" className="py-16 border-b">
          <div className="max-w-6xl mx-auto px-4 space-y-10">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Designed for B2B steel buying</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                The marketplace is being built around how buyers actually specify requirements and how suppliers respond:
                grade/standard mapping, size ranges, supply condition, MTC requirements, delivery, and inspection.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold text-base">Platform benefits</h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>Requirement-first navigation: grade, standard, form, size and supply condition.</li>
                  <li>Catalogues that support multi-grade, multi-spec listings (bars, plates, pipes, forgings).</li>
                  <li>Clear documentation expectations: MTC, inspection, UT/PMI where applicable.</li>
                  <li>Built to scale into a full marketplace with admin oversight and reporting.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-base">This landing page delivers</h3>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>A clear view of the product scope and categories.</li>
                  <li>Lead capture for buyers and suppliers to join early access.</li>
                  <li>SEO + analytics foundations to measure traction.</li>
                  <li>A mobile-first experience that evolves into the full marketplace.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Product catalogue preview */}
        <section id="catalogue" className="py-16 border-b">
          <div className="max-w-7xl mx-auto px-4 space-y-6">
            <div id="categories" className="sr-only" />
            <div id="products" className="sr-only" />
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Browse categories</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                A snapshot of the catalogue we&apos;re building. Each listing includes typical specifications,
                applications, and documentation expectations used in industrial procurement.
              </p>
            </div>
          </div>

          <div className="bg-background">
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

        {/* Lead capture */}
        <section id="lead" className="py-16 bg-muted/40">
          <div className="max-w-5xl mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Share your details</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Fill in the form and our team will connect with you as we ramp up Alloybazaar&apos;s early access
                program. We&apos;ll use this data only to share platform updates and relevant communication.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <BulletIcon className="mt-1" />
                  <span>Ideal for rolling mills, stockists, distributors, and end-users of alloy steel.</span>
                </li>
                <li className="flex gap-2">
                  <BulletIcon className="mt-1" />
                  <span>Helps us sequence rollout based on segment and geography.</span>
                </li>
                <li className="flex gap-2">
                  <BulletIcon className="mt-1" />
                  <span>No spam – only product and launch-related communication.</span>
                </li>
              </ul>
            </div>

            {/* Lead form component */}
            <LeadForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
