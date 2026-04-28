import { EyeOff, Boxes, PackageX, LineChart, CreditCard, Globe2 } from "lucide-react";
import Reveal from "@/components/Reveal";

const challenges = [
  {
    icon: EyeOff,
    title: "Limited Market Visibility",
    body: "Buyers struggle to identify and source specific grades, sizes and specifications from rolling mills, leading to delays and missed opportunities.",
  },
  {
    icon: Boxes,
    title: "High Minimum Order Quantities",
    body: "Large MOQs restrict access for small and mid-sized buyers, creating entry barriers and limiting operational flexibility.",
  },
  {
    icon: PackageX,
    title: "Raw Material Scarcity",
    body: "Frequent supply shortages disrupt production cycles and prevent businesses from fulfilling demand commitments.",
  },
  {
    icon: LineChart,
    title: "Price Volatility",
    body: "Daily fluctuations in alloy steel prices create uncertainty, complicating procurement planning and cost management.",
  },
  {
    icon: CreditCard,
    title: "Restricted Access to Credit",
    body: "High-value inventory combined with limited financing options strains working capital and impacts business growth.",
  },
  {
    icon: Globe2,
    title: "No Access to Imported Material",
    body: "Top European, Chinese and American producers work with select partners — leaving rare grades out of reach for many buyers.",
  },
];

const ChallengesSolutions = () => {
  return (
    <section id="challenges" className="py-16 md:py-24 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div className="space-y-3">
              <p className="eyebrow">Industry challenges</p>
              <h2 className="heading-display">
                The inefficiencies
                <br />
                we&apos;re solving
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              India&apos;s alloy steel ecosystem has long faced critical obstacles that delay production, strain
              working capital and limit market access — across every link in the chain. Alloybazaar is built to
              address each of these systematically.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map(({ icon: Icon, title, body }, idx) => (
            <Reveal key={title} delay={(idx % 3) * 80 + Math.floor(idx / 3) * 50} variant="fade-up">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-amber-brand/40 hover:shadow-md transition-all h-full">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-brand/10 text-amber-brand ring-1 ring-amber-brand/30 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.22em] text-zinc-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-zinc-950">{title}</h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSolutions;
