import Reveal from "@/components/Reveal";

const stats = [
  { kpi: "1st", label: "Tech-driven alloy steel marketplace in India" },
  { kpi: "PAN-India", label: "Sourcing &amp; distribution coverage" },
  { kpi: "100%", label: "Verified manufacturers, suppliers &amp; users" },
  { kpi: "End-to-end", label: "Sourcing, pricing, payments &amp; credit" },
];

const AboutUs = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-start">
        <Reveal variant="slide-right" className="space-y-5">
          <p className="eyebrow">About Us</p>
          <h2 className="heading-display">
            Powering India&apos;s
            <br />
            alloy steel supply chain
          </h2>
          <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
            Alloybazaar.com is India&apos;s first technology-driven digital marketplace dedicated to alloy steel. We
            connect rolling mills, suppliers, stockists and end users on a transparent, real-time platform that
            simplifies sourcing, pricing and transactions.
          </p>
          <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
            Through intelligent demand aggregation, competitive bidding, secure payments and embedded credit
            solutions, we eliminate traditional inefficiencies such as high MOQs, opaque pricing and limited market
            access.
          </p>
          <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
            From standard grades to specialised and imported alloys, we make alloy steel sourcing smarter, faster and
            more accessible across India.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} variant="fade-up">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-amber-brand/50 hover:shadow-md transition-all h-full">
                <div className="text-2xl md:text-3xl font-semibold text-amber-brand">{s.kpi}</div>
                <p
                  className="mt-2 text-sm text-zinc-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.label }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
