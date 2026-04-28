import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "What is Alloybazaar.com?",
    a: "Alloybazaar.com is an alloy steel marketplace that connects all stakeholders in the supply chain — rolling mills, end users, suppliers and stockists — on a single technology-driven platform.",
  },
  {
    q: "Who can use Alloybazaar.com?",
    a: "The platform is open to all. Anyone with alloy steel needs — buyers, suppliers, distributors or rolling mills — can use Alloybazaar.com to fulfil their requirements.",
  },
  {
    q: "How do I join the platform?",
    a: "Register with your business details, verify your documents through our automated verification channels, choose a subscription plan and start receiving leads or material requirements.",
  },
  {
    q: "Does Alloybazaar.com guarantee clients?",
    a: "Alloybazaar.com helps increase visibility and connections across the alloy steel ecosystem, but does not guarantee specific clients or transactions.",
  },
  {
    q: "Are payments secure?",
    a: "Yes. All transactions on Alloybazaar.com are routed through secure payment gateways with traceable fund flows, reducing counterparty risk for both sides.",
  },
  {
    q: "What products can be listed?",
    a: "Parties can list their products by grade and size — from die &amp; tool steels and high-speed steels to a wide range of alloy steel grades, plates, bars, pipes and forgings.",
  },
  {
    q: "How does Alloybazaar.com verify parties?",
    a: "Verification is performed through KYC, past work portfolios, references and document checks before parties are activated on the platform.",
  },
  {
    q: "How do I pay the subscription fee?",
    a: "Visit the Subscriptions page and choose from various plans that suit your requirements. Payment is handled via secure online channels.",
  },
  {
    q: "Are customised plans available?",
    a: "Yes. Alloybazaar.com offers customised plans for users based on their requirements — please reach out via the contact form for a tailored proposal.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 border-b bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-10">
        <Reveal>
          <div className="space-y-3">
            <p className="eyebrow">FAQs</p>
            <h2 className="heading-display">Frequently asked questions</h2>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
              Quick answers to the questions we hear most often from rolling mills, suppliers and end users.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} variant="fade-up">
          <Accordion type="single" collapsible className="rounded-2xl border border-zinc-200 bg-white divide-y divide-zinc-100">
            {faqs.map((item, idx) => (
              <AccordionItem key={item.q} value={`faq-${idx}`} className="border-0 px-5">
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-zinc-950 hover:no-underline hover:text-amber-brand transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-600 leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: item.a }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
