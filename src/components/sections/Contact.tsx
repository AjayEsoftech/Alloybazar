import { Mail, Phone, MapPin } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-start">
        <Reveal variant="slide-right" className="space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Get in touch</p>
            <h2 className="heading-display">Let&apos;s get started</h2>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              Whether you&apos;re a rolling mill, supplier or end user — we&apos;re here to help you succeed. Drop us a
              message or schedule a demo and our team will get back to you.
            </p>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
              <Mail className="h-4 w-4 mt-0.5 text-amber-brand" />
              <div>
                <div className="font-semibold text-zinc-950">Email</div>
                <a href="mailto:hello@alloybazaar.com" className="text-zinc-600 hover:text-amber-brand">
                  hello@alloybazaar.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
              <Phone className="h-4 w-4 mt-0.5 text-amber-brand" />
              <div>
                <div className="font-semibold text-zinc-950">Phone</div>
                <a href="tel:+919000000000" className="text-zinc-600 hover:text-amber-brand">
                  +91 90000 00000
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
              <MapPin className="h-4 w-4 mt-0.5 text-amber-brand" />
              <div>
                <div className="font-semibold text-zinc-950">Coverage</div>
                <p className="text-zinc-600">PAN-India sourcing &amp; delivery network</p>
              </div>
            </li>
          </ul>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600 space-y-1.5">
            <p className="font-semibold text-zinc-950 text-sm">What we&apos;ll cover in the demo</p>
            <p>How order aggregation, smart matching and embedded credit can fit into your procurement workflow.</p>
          </div>
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <div id="lead">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
