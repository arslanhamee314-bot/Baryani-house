import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Star } from "lucide-react";
import { PageLayout, PlaceholderChip } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business, googleReviewsHref } from "@/lib/business";
import { HeroCarousel, type SlideItem } from "@/components/site/HeroCarousel";
import heroImg from "@/assets/hero-biryani.jpg";
import interiorImg from "@/assets/gallery-interior-1.jpg";
import servingImg from "@/assets/gallery-serving.jpg";

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
  const reviewSlides: SlideItem[] = [
    {
      id: "rev-1",
      title: `${business.rating} ★ Google Customer Rating`,
      titleUrdu: "عوام کی بھرپور پسند",
      subtitle: `Verified guest reviews from local food lovers in Sarwar Shaheed Chowk, Jauharabad!`,
      image: heroImg,
      badge: "⭐ Verified Google Reviews",
      actionText: "Read Public Reviews on Google",
      actionHref: googleReviewsHref,
    },
    {
      id: "rev-2",
      title: "Authentic Dum Biryani & Hospitality",
      titleUrdu: "ذائقہ دار بریانی اور بہترین سروس",
      subtitle: "Freshly prepared every day with whole spices, served hot for dining in or takeaway.",
      image: servingImg,
      badge: "💬 Customer Feedback",
      actionText: "Read Google Reviews",
      actionHref: googleReviewsHref,
    },
    {
      id: "rev-3",
      title: "Family Friendly & Clean Dining",
      titleUrdu: "خاندانی ماحول",
      subtitle: "Comfortable seating arrangement with attentive staff in Main Bazar Road.",
      image: interiorImg,
      badge: "🌟 Dine-in Experience",
      actionText: "View Google Rating",
      actionHref: googleReviewsHref,
    },
  ];

  return (
    <PageLayout>
      {/* Dynamic One-by-One Reviews Slideshow */}
      <section className="container-page pt-6 pb-4">
        <HeroCarousel slides={reviewSlides} heightClass="h-[460px] md:h-[540px]" />
      </section>

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
            {[
              { name: "Mian Hamza", date: "2 weeks ago", comment: "Jauharabad mein sab se behtareen dum biryani! Chawal aur boti ka zaika zabardast hai.", stars: 5 },
              { name: "Tariq Malik", date: "1 month ago", comment: "Finger fish aur samosay buhat crisp hotay hain. Service is super fast and hot delivery.", stars: 5 },
              { name: "Muhammad Awais", date: "1 month ago", comment: "Family ke saath dine-in kiya, mahool aur khana dono shandar thay. Highly recommended!", stars: 5 },
              { name: "Usman Ali", date: "2 months ago", comment: "Bari ki biryani ka taste Sarwar Shaheed Chowk mein famous hai. Very fresh food every time.", stars: 5 },
              { name: "Sheikh Zeeshan", date: "2 months ago", comment: "Fast WhatsApp order processing. Food arrived hot and neatly packed in Jauharabad.", stars: 5 },
              { name: "Rana Shahid", date: "3 months ago", comment: "Authentic spice blend and high quality chicken. Will order again!", stars: 5 },
            ].map((r, i) => (
              <Reveal key={r.name} delay={i * 0.05}>
                <article className="card-surface p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(r.stars)].map((_, n) => (
                        <Star key={n} className="h-4 w-4 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />
                      ))}
                    </div>
                    <p className="mt-4 italic text-sm text-[color:var(--foreground)] leading-relaxed">
                      "{r.comment}"
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[color:var(--secondary)]/15 text-[color:var(--secondary-hover)] grid place-items-center font-display font-bold">
                        {r.name.charAt(0)}
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">{r.name}</div>
                        <div className="text-xs text-[color:var(--muted-foreground)]">{r.date}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-500/20">Verified</span>
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
