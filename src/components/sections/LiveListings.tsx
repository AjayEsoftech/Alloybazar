import { MapPin, Package, BadgeCheck, Clock, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

type Listing = {
  type: "Buy" | "Sell";
  grade: string;
  spec: string;
  qty: string;
  location: string;
  party: string;
  posted: string;
  verified?: boolean;
};

const listings: Listing[] = [
  {
    type: "Buy",
    grade: "EN24 / 4340",
    spec: "Round bar Ø 60–120 mm, QT condition, MTC 3.1",
    qty: "12 MT",
    location: "Pune, MH",
    party: "Auto-component OEM",
    posted: "Posted 2 hours ago",
    verified: true,
  },
  {
    type: "Sell",
    grade: "H13 Hot Work",
    spec: "Block 200×400×L, ESR, hardness 28–32 HRC",
    qty: "Stock available",
    location: "Vadodara, GJ",
    party: "Tool steel stockist",
    posted: "Listed yesterday",
    verified: true,
  },
  {
    type: "Buy",
    grade: "16MnCr5",
    spec: "Round bar Ø 30–80 mm, normalised, gear-grade",
    qty: "8 MT / month",
    location: "Chennai, TN",
    party: "Forging unit",
    posted: "Posted today",
  },
  {
    type: "Sell",
    grade: "EN31 / 52100",
    spec: "Round bar Ø 25–80 mm, spheroidize annealed",
    qty: "20 MT",
    location: "Ludhiana, PB",
    party: "Mill direct",
    posted: "Listed 5 hours ago",
    verified: true,
  },
  {
    type: "Buy",
    grade: "ASTM A335 P22",
    spec: "Seamless pipe NPS 4″ SCH 80, N+T, hydro tested",
    qty: "1500 m",
    location: "Vizag, AP",
    party: "EPC contractor",
    posted: "Posted 1 day ago",
    verified: true,
  },
  {
    type: "Sell",
    grade: "P20 Mould Steel",
    spec: "Pre-hardened block 150×300×L, polishable",
    qty: "10 MT",
    location: "Mumbai, MH",
    party: "Tooling distributor",
    posted: "Listed 3 days ago",
  },
];

const LiveListings = () => {
  return (
    <section id="live-listings" className="py-16 md:py-24 border-b bg-white relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 space-y-10">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[1.2fr_auto] md:items-end">
            <div className="space-y-3">
              <p className="eyebrow inline-flex items-center gap-2">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-brand pulse-dot" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-brand" />
                </span>
                Live on the platform
              </p>
              <h2 className="heading-display">
                Buy &amp; sell requirements
                <br />
                posted by verified parties
              </h2>
              <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl">
                A snapshot of how requirements and inventory will look on Alloybazaar.com once you join the early
                access programme. Sample data shown for illustration.
              </p>
            </div>
            <a href="#contact" className="btn-pill-amber-lg">
              Post your requirement
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((l, i) => (
            <Reveal
              key={`${l.grade}-${i}`}
              delay={(i % 3) * 90 + Math.floor(i / 3) * 50}
              variant="fade-up"
              className="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-md hover:border-amber-brand/40 transition-all h-full"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                    l.type === "Buy"
                      ? "bg-zinc-950 text-amber-brand"
                      : "bg-amber-brand text-zinc-950"
                  }`}
                >
                  {l.type}
                </span>
                {l.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-amber-brand">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-semibold text-sm text-zinc-950">{l.grade}</h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{l.spec}</p>

              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                <div className="flex items-center gap-1 text-zinc-600">
                  <Package className="h-3 w-3 text-amber-brand" />
                  <span>{l.qty}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-600">
                  <MapPin className="h-3 w-3 text-amber-brand" />
                  <span>{l.location}</span>
                </div>
              </dl>

              <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                <span className="text-zinc-600">{l.party}</span>
                <span className="inline-flex items-center gap-1 text-zinc-500">
                  <Clock className="h-3 w-3" />
                  {l.posted}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-[11px] text-zinc-500 italic">
          Sample listings — for illustration only. Actual postings will appear once early-access partners onboard.
        </p>
      </div>
    </section>
  );
};

export default LiveListings;
