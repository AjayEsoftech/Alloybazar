import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const services = [
  {
    eyebrow: "Sourcing",
    title: "Source from verified mills",
    body: "Tap a network of verified rolling mills, stockists and importers across India. Post once, get matched with parties who can supply your exact grade, size and condition.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=70",
    cta: { label: "Browse categories", href: "#categories" },
  },
  {
    eyebrow: "Verify",
    title: "Specs, MTC & inspection",
    body: "Every counterparty is KYC and GST verified. Listings carry standardised grade, size, condition and MTC requirements so RFQs flow without misalignment.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=70",
    cta: { label: "How it works", href: "#how-it-works" },
  },
  {
    eyebrow: "Finance",
    title: "Embedded credit & terms",
    body: "Invoice discounting and structured credit options ease working capital pressure for buyers, while suppliers get paid on time with traceable fund flows.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=70",
    cta: { label: "Talk to us", href: "#contact" },
  },
];

const CoreServices = () => {
  return (
    <section id="solutions" className="relative bg-white text-zinc-900 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 space-y-12">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <Reveal variant="slide-right" className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-brand">
              Alloybazaar
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-zinc-950">
              End-to-end alloy
              <br />
              steel solutions
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              Our platform consolidates fragmented sourcing into one transparent flow — from grade discovery and
              counterparty verification to pricing, payments and credit. Whether you&apos;re a rolling mill, a
              stockist or an OEM, the entire value chain runs on a single trusted layer. From standard EN/AISI
              grades to specialised tool, mould and high-speed steels — Alloybazaar.com powers the way India buys
              alloy steel.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.eyebrow} delay={i * 120} variant="fade-up">
              <article className="group h-full overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-zinc-900 hover:ring-amber-brand/40 transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-brand">
                    {s.eyebrow}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                  <a
                    href={s.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-brand text-zinc-950 px-4 py-2 text-xs font-bold shadow hover:bg-amber-300 transition-colors"
                  >
                    {s.cta.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
