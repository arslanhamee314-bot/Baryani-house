import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Star } from "lucide-react";
import { PageHero, PageLayout, PlaceholderChip } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business, googleReviewsHref } from "@/lib/business";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews | Biryani House Jauharabad" },
      { name: "description", content: `See the ${business.rating} Google rating for Biryani House in Main Bazar, Jauharabad, and read guest feedback.` },
      { property: "og:title", content: "Reviews | Biryani House Jauharabad" },
      { property: "og:description", content: `See the ${business.rating} Google rating for Biryani House in Main Bazar, Jauharabad.` },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Reviews"
        title="Honest feedback from our guests"
        subtitle="We show the Google rating exactly as it appears publicly. Written review cards below are placeholders — replace with approved quotes any time."
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr] items-start">
          <Reveal>
            <div className="card-surface p-8 text-center">
              <div className="text-7xl font-display font-bold text-[color:var(--primary)]">{business.rating}</div>
              <div className="mt-3 flex items-center justify-center gap-0.5">
                {[1,2,3,4].map(i => <Star key={i} className="h-6 w-6 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />)}
                <Star className="h-6 w-6 text-[color:var(--secondary)]" />
              </div>
              <div className="mt-3 text-sm text-[color:var(--muted-foreground)]">Google rating (as visible publicly)</div>
              <a href={googleReviewsHref} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
                View on Google <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-4 text-xs text-[color:var(--muted-foreground)]">
                We link directly to Google so you can read reviews in full without any middleman.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <article className="card-surface p-6 h-full">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(n => <Star key={n} className="h-4 w-4 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />)}
                  </div>
                  <p className="mt-4 italic text-[color:var(--foreground)] leading-relaxed">
                    "[Add a real, approved review quote here — keep it in the guest's own words. Don't fabricate.]"
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[color:var(--secondary)]/15 text-[color:var(--secondary-hover)] grid place-items-center font-display font-bold">
                        [G]
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">[Guest name]</div>
                        <div className="text-xs text-[color:var(--muted-foreground)]">[Date]</div>
                      </div>
                    </div>
                    <PlaceholderChip>Editable</PlaceholderChip>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
