const partners = [
  "Apex Forge Industries",
  "Rana Steel & Alloys",
  "Pune Engineering Works",
  "Kohinoor Tooling",
  "Shakti Rolling Mills",
  "Bharat Components",
  "Vidarbha Auto Parts",
  "Saraswati Heat Treatment",
];

const TrustedBy = () => {
  return (
    <section aria-label="Trusted by industry partners" className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="md:w-56 shrink-0">
            <p className="eyebrow">Onboarding partners</p>
            <p className="mt-1 text-xs text-zinc-600">
              Rolling mills, OEMs, forging units &amp; stockists across India
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {partners.map((p) => (
              <div
                key={p}
                className="flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-2.5 text-[11px] font-bold text-zinc-700 tracking-wide text-center hover:border-amber-brand/40 hover:text-zinc-950 transition-colors"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
