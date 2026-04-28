import { BadgeCheck, Gavel, Lock, Headphones, MapPin, Compass } from "lucide-react";
import Reveal from "@/components/Reveal";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Verified Network",
    body: "Every manufacturer, supplier and end user undergoes verification — ensuring credibility, authenticity and peace of mind in every transaction.",
  },
  {
    icon: Gavel,
    title: "Competitive Market-Driven Pricing",
    body: "A structured bidding model fosters transparent price discovery — buyers secure competitive rates and suppliers access genuine demand.",
  },
  {
    icon: Lock,
    title: "Secure &amp; Protected Payments",
    body: "All transactions route through the platform, reducing counterparty risk and ensuring secure, trackable fund flows.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support &amp; Dispute Resolution",
    body: "Our team provides active assistance and neutral mediation — resolving issues efficiently while keeping business relationships intact.",
  },
  {
    icon: MapPin,
    title: "PAN-India Reach",
    body: "A strong supply and distribution network across India enables seamless sourcing and delivery nationwide.",
  },
  {
    icon: Compass,
    title: "Built for the Indian Market",
    body: "Flexible, reliable and localised — designed for the unique dynamics of India's alloy steel trade.",
  },
];

const WhyChoose = () => {
  return (
    <section id="why" className="py-16 md:py-24 bg-zinc-950 text-white border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div className="space-y-3">
              <p className="eyebrow">Why Alloybazaar</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
                Trusted infrastructure
                <br />
                for alloy steel
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Purpose-built to modernise India&apos;s alloy steel ecosystem with transparency, efficiency and trust
              at its core. Verified counterparties, structured price discovery and secure transactions in one place.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 90 + Math.floor(i / 3) * 50}
              variant="fade-up"
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-amber-brand/40 hover:bg-zinc-900 transition-all h-full"
            >
              <div className="h-11 w-11 rounded-lg bg-amber-brand/10 text-amber-brand ring-1 ring-amber-brand/30 flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3
                className="mt-4 font-semibold text-base text-white"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="mt-2 text-sm text-zinc-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
