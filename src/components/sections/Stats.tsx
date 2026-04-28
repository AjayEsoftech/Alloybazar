import Reveal from "@/components/Reveal";

const stats = [
  { value: "120+", label: "Alloy steel grades", sub: "Tool steel, HSS, Cr-Mo, Cr-Ni-Mo & more" },
  { value: "50+", label: "Indian & global standards", sub: "AISI/SAE, EN, DIN, JIS, ASTM, ASME" },
  { value: "PAN-India", label: "Sourcing & delivery", sub: "From Mumbai, Pune, Ahmedabad, Chennai, Kolkata" },
  { value: "24x7", label: "Enquiry desk", sub: "Verified counterparties only" },
];

const Stats = () => {
  return (
    <section className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-px overflow-hidden rounded-2xl ring-1 ring-zinc-200 bg-zinc-200 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} variant="fade-up">
              <div className="bg-white p-6 h-full">
                <div className="text-3xl md:text-4xl font-semibold text-zinc-950 tracking-tight">{s.value}</div>
                <div className="mt-2 text-sm font-semibold text-zinc-900">{s.label}</div>
                <div className="mt-1 text-[11px] text-zinc-500 leading-relaxed">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
