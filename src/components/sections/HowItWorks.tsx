import { UserPlus, FileEdit, Cpu, Handshake, BarChart3, Star } from "lucide-react";
import Reveal from "@/components/Reveal";

const steps = [
  {
    icon: UserPlus,
    title: "Subscribe to the Platform",
    body: "Create an account and gain secure access to verified manufacturers, suppliers and end users.",
  },
  {
    icon: FileEdit,
    title: "Post Your Requirement",
    body: "Share your requirement with grade, size, quantity, delivery location and application of material (optional).",
  },
  {
    icon: Cpu,
    title: "Needs Analysis",
    body: "Our AI-enabled algorithm matches you with verified, relevant counterparties across the network.",
  },
  {
    icon: Handshake,
    title: "Compare & Collaborate",
    body: "Review quotations, chat directly, finalise terms and manage the transaction securely through the platform.",
  },
  {
    icon: BarChart3,
    title: "Track Progress in Real Time",
    body: "Monitor deliverables, timelines and results through an integrated analytics dashboard.",
  },
  {
    icon: Star,
    title: "Rate & Reconnect",
    body: "Evaluate your experience, build long-term relationships and re-engage trusted partners for future projects.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 border-b bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div className="space-y-3">
              <p className="eyebrow">How it works</p>
              <h2 className="heading-display">
                Requirement to delivery,
                <br />
                in six steps
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              A guided journey that takes you from sign-up through specification, matching, collaboration and
              long-term partnerships — with verified counterparties at every step.
            </p>
          </div>
        </Reveal>

        <div role="list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, idx) => (
            <Reveal key={title} delay={idx * 80} variant="fade-up">
              <div role="listitem" className="relative rounded-2xl border border-zinc-200 bg-white p-6 hover:border-amber-brand/40 hover:shadow-md transition-all h-full">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-zinc-950 text-amber-brand ring-1 ring-zinc-800 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-brand">
                      Step {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-zinc-950">{title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{body}</p>
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

export default HowItWorks;
