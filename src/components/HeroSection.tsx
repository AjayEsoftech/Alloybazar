import { ArrowUpRight, BadgeCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="top" className="relative bg-white text-zinc-900 overflow-hidden">
      {/* Subtle radial warm tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_30%,hsla(34,92%,60%,0.10),transparent_60%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.1fr_1fr] items-center py-10 md:py-14 lg:py-16">
          {/* Left: typography */}
          <div className="relative z-20 space-y-5 md:space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-brand/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-brand" />
              Alloybazaar.com — early access
            </span>

            <h1 className="font-semibold tracking-tight leading-[0.95] text-zinc-950 text-[36px] sm:text-5xl md:text-6xl lg:text-[64px]">
              <span className="block">Source,</span>
              <span className="block text-amber-brand">verify</span>
              <span className="block">&amp; finance.</span>
            </h1>

            <p className="max-w-md text-sm md:text-base text-zinc-600 leading-relaxed">
              India&apos;s first end-to-end digital marketplace for alloy steel. Connect verified rolling mills,
              suppliers and end-users — with transparent pricing, embedded credit and PAN-India delivery.
            </p>

            <div className="flex items-center gap-4 pt-1">
              <a href="#contact" className="btn-pill-amber-lg">
                Get Early Access
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#live-listings"
                className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 hover:text-zinc-950"
              >
                See live listings
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: alloy bars hero image */}
          <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
            <div className="absolute inset-0 flex items-center justify-end pr-2 md:pr-4">
              <div className="relative h-full flex items-center">
                <img
                  src="/hero_image.png"
                  alt="Stacked polished alloy steel round bars — EN24 / 4340 grade with machined end-caps"
                  className="h-full w-auto max-w-full object-contain drop-shadow-[0_25px_40px_rgba(20,20,30,0.22)] -rotate-2"
                  loading="eager"
                />
                {/* Verified tag pinned to image */}
                <div className="absolute bottom-3 left-2 md:bottom-5 md:left-3 rounded-md bg-zinc-950 px-2.5 py-1.5 text-white shadow-xl">
                  <div className="flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] text-amber-brand">
                    <BadgeCheck className="h-3 w-3" />
                    Verified mill
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold">EN24 / 4340 — Q&amp;T</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent strip */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-amber-brand to-transparent" />
    </section>
  );
};

export default HeroSection;
