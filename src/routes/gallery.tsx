import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Play } from "lucide-react";
import { PageLayout } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business } from "@/lib/business";
import { useStoreState } from "@/lib/useStore";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Photo & Video Gallery | ${business.name}` },
      { name: "description", content: `Browse authentic photos of biryani, karahi, pizzas, and dining environment at ${business.name}, Jauharabad.` },
      { property: "og:title", content: `Gallery | ${business.name}` },
      { property: "og:description", content: `Food and interior gallery of ${business.name}.` },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const CATEGORIES = ["All", "Food", "Interior", "Videos", "Facebook"] as const;

function GalleryPage() {
  const { activeGallery } = useStoreState();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems = activeGallery.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <PageLayout>
      <section className="container-page py-8 md:py-14">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--primary)]">
              Food & Atmosphere
            </span>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-[color:var(--foreground)] mt-1">
              Photo & Video Gallery
            </h1>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
              Real photos and preparation videos straight from our kitchen and dining hall in Sarwar Shaheed Chowk, Jauharabad.
            </p>
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[44px] ${
                activeCategory === cat
                  ? "bg-[color:var(--primary)] text-white shadow-md scale-105"
                  : "bg-[color:var(--surface)] text-[color:var(--foreground)] border border-[color:var(--border)] hover:border-[color:var(--primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.03}>
              <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 border border-[color:var(--border)] shadow-xs hover:shadow-xl transition-all">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {item.isVideo && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/90 text-[color:var(--primary)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Hover Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-end">
                  <p className="text-white text-xs sm:text-sm font-semibold line-clamp-2 leading-tight">
                    {item.alt}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-amber-300 bg-black/50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    {item.fbUrl && (
                      <a
                        href={item.fbUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-amber-300 transition-colors p-1"
                        title="View on Facebook"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
