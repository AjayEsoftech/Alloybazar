import { Factory, ShieldCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="top" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-sky-300 ring-1 ring-white/10">
              India&apos;s technology-driven alloy steel marketplace
            </p>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                One focused hub for alloy steel sourcing and supply.
              </h1>
              <p className="text-sm md:text-base text-slate-200/80 max-w-xl">
                Alloybazaar.com connects rolling mills, stockists, distributors, and end-users with clear specs,
                verified demand, and a calmer path from enquiry to quote.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs md:text-sm text-slate-200/80">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Factory className="h-4 w-4 text-sky-300" />
                <span>Mill and stock visibility in one place</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>Standardised specs, testing &amp; docs</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#lead"
                className="inline-flex items-center justify-center rounded-md bg-white text-slate-900 px-5 py-2.5 text-sm font-semibold shadow hover:bg-slate-100 transition-colors"
              >
                Register early access
              </a>
              <a
                href="#catalogue"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                Browse categories
              </a>
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-2xl bg-white/95 text-slate-900 shadow-2xl shadow-slate-900/40 p-6 md:p-8 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100">
                <img
                  src="https://images.pexels.com/photos/8067882/pexels-photo-8067882.jpeg?cs=srgb&dl=pexels-alena-shekhovtcova-8067882.jpg&fm=jpg"
                  alt="Professional women collaborating in a modern office meeting"
                  className="h-56 w-full object-cover md:h-64"
                  loading="lazy"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200/70 bg-white px-4 py-3">
                  <div className="text-xs font-semibold text-slate-600">Trusted for procurement</div>
                  <p className="mt-2 text-xs text-slate-500">
                    Capture demand, verify specs, and share documentation in one flow.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white px-4 py-3">
                  <div className="text-xs font-semibold text-slate-600">Built for teams</div>
                  <p className="mt-2 text-xs text-slate-500">
                    Coordinate buyers and suppliers across mills, stockists, and distributors.
                  </p>
                </div>
              </div>

              <a
                href="#lead"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-xs md:text-sm font-semibold text-white shadow hover:bg-slate-800 transition-colors w-full"
              >
                Go to lead form
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
