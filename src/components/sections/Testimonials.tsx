import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

const testimonials = [
  {
    quote:
      "Sourcing EN24 in QT condition with a proper MTC used to take us 4-5 calls and a week of follow-ups. With Alloybazaar, we share the spec once and shortlist verified mills the same day.",
    name: "Rajesh Patil",
    role: "Procurement Head",
    company: "Auto-component manufacturer, Pune",
  },
  {
    quote:
      "We supply tool steel blocks PAN-India. The platform helps us get in front of OEMs and forging units who actually need H13 and P20 — instead of cold-calling them one by one.",
    name: "Sandeep Mehta",
    role: "Director",
    company: "Tooling distributor, Mumbai",
  },
  {
    quote:
      "Aggregating our smaller buyers into one mill order is a huge win for working capital. We finally get genuine mill prices without committing to MOQs we cannot consume in one shot.",
    name: "Anand Reddy",
    role: "Plant Head",
    company: "Forging unit, Hyderabad",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div className="space-y-3">
              <p className="eyebrow">What partners say</p>
              <h2 className="heading-display">
                Voices from rolling mills,
                <br />
                suppliers &amp; end-users
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              Early conversations from buyers, stockists and OEMs who&apos;ve shaped how Alloybazaar is being built.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 110}
              variant="fade-up"
              className="rounded-2xl border border-zinc-200 bg-white p-6 hover:border-amber-brand/40 hover:shadow-md transition-all flex flex-col h-full"
            >
              <Quote className="h-6 w-6 text-amber-brand" />
              <blockquote className="mt-3 text-sm text-zinc-800 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-950 text-amber-brand font-bold flex items-center justify-center text-sm ring-1 ring-zinc-800">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-950">{t.name}</div>
                    <div className="text-[11px] text-zinc-500">
                      {t.role} • {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
