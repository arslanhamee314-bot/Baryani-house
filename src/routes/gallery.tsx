import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Facebook, Play } from "lucide-react";
import { PageHero, PageLayout } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { gallery, type GalleryItem } from "@/data/gallery";
import { business } from "@/lib/business";

const CATEGORIES = ["All", "Food", "Interior", "Videos", "Facebook"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Gallery | ${business.name}` },
      { name: "description", content: `Photos & videos of biryani, karahi, pizzas and daily service at ${business.name} in Sarwar Shaheed Chowk, Jauharabad.` },
      { property: "og:title", content: `Gallery | ${business.name}` },
      { property: "og:description", content: `Photos and videos from ${business.name} official Facebook page.` },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const items = useMemo<GalleryItem[]>(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <PageLayout>
      <PageHero
        eyebrow="Official Gallery & Videos"
        title="Food photos, reels and kitchen service"
        subtitle={`Real photos and videos imported from ${business.name} official Facebook page.`}
      />

      <section className="container-page py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  filter === c
                    ? "bg-[color:var(--primary)] text-white border-[color:var(--primary)]"
                    : "bg-[color:var(--surface)] text-[color:var(--foreground)] border-[color:var(--border)] hover:border-[color:var(--primary)]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <Facebook className="h-4 w-4" /> View full Facebook Gallery <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((it, i) => (
            <Reveal key={it.src + i} delay={(i % 6) * 0.04}>
              <a
                href={it.fbUrl || business.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className={`group relative overflow-hidden rounded-2xl border border-[color:var(--border)] block ${
                  i % 5 === 0 ? "md:row-span-2 md:aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Video Overlay Badge */}
                {it.isVideo && (
                  <div className="absolute inset-0 grid place-items-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-[color:var(--primary)] text-white grid place-items-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                <figcaption className="absolute inset-x-0 bottom-0 p-3.5 text-xs text-white font-medium bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between gap-2">
                  <span className="truncate">{it.alt}</span>
                  <span className="shrink-0 bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
                    {it.isVideo ? "Video" : it.category}
                  </span>
                </figcaption>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
