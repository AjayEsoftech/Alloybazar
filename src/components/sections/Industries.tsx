import Reveal from "@/components/Reveal";

const industries = [
  {
    name: "Automotive & Auto Components",
    img: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=70",
    grades: ["EN8", "EN19", "16MnCr5", "20MnCr5", "SAE 8620"],
    use: "Crankshafts, gears, axles, drivetrain forgings.",
  },
  {
    name: "Forging Units",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=70",
    grades: ["EN24", "42CrMo4", "C45", "34CrNiMo6"],
    use: "Open / closed die forging billets &amp; rounds.",
  },
  {
    name: "Die & Mould Manufacturers",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=70",
    grades: ["H13", "P20", "D2", "S7"],
    use: "Hot work, cold work and plastic mould tooling.",
  },
  {
    name: "Bearings & Precision Components",
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=70",
    grades: ["EN31", "52100", "100Cr6"],
    use: "Bearing rings, rollers, precision wear parts.",
  },
  {
    name: "Power, Boilers & Pressure Equipment",
    img: "https://images.unsplash.com/photo-1581091215367-59ab6b3b8b1b?auto=format&fit=crop&w=900&q=70",
    grades: ["A335 P11", "A335 P22", "A335 P91", "A387"],
    use: "High temperature pipes, plates, headers.",
  },
  {
    name: "Machinery & Industrial Tooling",
    img: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=70",
    grades: ["M2", "M35", "T1", "EN9"],
    use: "Cutting tools, machine spares, fixtures.",
  },
];

const Industries = () => {
  return (
    <section id="industries" className="py-16 md:py-24 border-b bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div className="space-y-3">
              <p className="eyebrow">Industries we serve</p>
              <h2 className="heading-display">
                Built around how India
                <br />
                actually buys steel
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              From auto-component clusters in Pune &amp; Chennai to forging hubs in Punjab, Gujarat and Tamil Nadu —
              the grades, sizes and supply conditions buyers ask for every day.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 100 + Math.floor(i / 3) * 60} variant="fade-up">
              <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:border-amber-brand/40 hover:shadow-lg transition-all h-full">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                  <img
                    src={ind.img}
                    alt={ind.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-semibold text-base text-zinc-950">{ind.name}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: ind.use }} />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ind.grades.map((g) => (
                      <span
                        key={g}
                        className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold text-zinc-700"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
