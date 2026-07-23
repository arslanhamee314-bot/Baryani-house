import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PageHero, PageLayout } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business, callHref } from "@/lib/business";
import { faqs } from "@/data/faqs";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Biryani House Jauharabad" },
      { name: "description", content: "Answers to common questions about Biryani House in Main Bazar, Jauharabad — hours, location, dine-in, takeaway, ordering and directions." },
      { property: "og:title", content: "FAQ | Biryani House Jauharabad" },
      { property: "og:description", content: "Answers about hours, location, dine-in, takeaway and ordering." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="FAQ" title="Everything you might want to know" subtitle="Can't find your answer? Give us a quick call — we're happy to help." />

      <section className="container-page py-14 md:py-20 max-w-3xl">
        <Reveal>
          <div className="divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
            {faqs.map((f, i) => (
              <details key={i} className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5">
                  <span className="font-semibold text-[color:var(--foreground)] text-base md:text-lg">{f.q}</span>
                  <span className="h-8 w-8 rounded-full border border-[color:var(--border)] grid place-items-center text-[color:var(--primary)] transition-transform duration-300 group-open:rotate-45 shrink-0">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[color:var(--muted-foreground)] leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl bg-[color:var(--primary)] text-white p-8 text-center">
            <h2 className="font-display text-white">Still have a question?</h2>
            <p className="mt-2 text-white/85">Call the kitchen and we'll answer right away.</p>
            <a href={callHref} className="inline-flex mt-5 items-center gap-2 rounded-full bg-white text-[color:var(--primary)] px-6 py-3 font-semibold hover:bg-white/90 transition">
              <Phone className="h-4 w-4" /> Call {business.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}
