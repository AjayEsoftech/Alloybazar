import { Factory, Users, Warehouse } from "lucide-react";
import Reveal from "@/components/Reveal";

const segments = [
  {
    icon: Factory,
    title: "Rolling Mills",
    description:
      "Rolling mills sit at the top of the supply chain, sensing and responding to market demand across diverse grades, sizes and specifications. Alloybazaar.com improves demand visibility, optimises production planning and expands market reach.",
    points: [
      "Improve demand visibility across regions",
      "Optimise production planning with verified buyers",
      "Expand market reach without large field sales teams",
    ],
  },
  {
    icon: Users,
    title: "End Users",
    description:
      "From die and mould manufacturers to forging companies and OEMs, end users rely on consistent quality, precise specifications and dependable supply. Alloybazaar ensures access to the right materials at the right time.",
    points: [
      "Die &amp; mould manufacturers",
      "Industrial tool, forging &amp; machinery makers",
      "Automobile component &amp; OEM manufacturers",
    ],
  },
  {
    icon: Warehouse,
    title: "Suppliers &amp; Stockists",
    description:
      "Suppliers form the backbone of the supply chain — maintaining inventory for last-mile fulfilment and extending credit to end users. Alloybazaar strengthens suppliers with smarter demand and credit management.",
    points: [
      "Improve inventory rotation",
      "Reach new verified customers PAN-India",
      "Smarter credit management with embedded finance",
    ],
  },
];

const WhoWeServe = () => {
  return (
    <section id="who" className="py-16 md:py-24 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <Reveal>
          <div className="space-y-3 max-w-3xl">
            <p className="eyebrow">Who we serve</p>
            <h2 className="heading-display">
              Every critical link in
              <br />
              the alloy steel chain
            </h2>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
              A connected, efficient and resilient ecosystem that benefits every participant in the value chain.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {segments.map(({ icon: Icon, title, description, points }, i) => (
            <Reveal
              key={title}
              delay={i * 120}
              variant="fade-up"
              className="rounded-2xl border border-zinc-200 bg-white p-7 hover:border-amber-brand/40 hover:shadow-lg transition-all h-full"
            >
              <div className="h-12 w-12 rounded-xl bg-zinc-950 text-amber-brand ring-1 ring-zinc-800 flex items-center justify-center">
                <Icon className="h-6 w-6" />
              </div>
              <h3
                className="mt-5 text-lg font-semibold tracking-tight text-zinc-950"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className="mt-2 text-sm text-zinc-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                {points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-amber-brand" />
                    <span dangerouslySetInnerHTML={{ __html: p }} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
