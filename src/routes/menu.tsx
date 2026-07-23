import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PageLayout, PageHero } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business, callHref } from "@/lib/business";
import { featuredDishes, menuCategories } from "@/data/menu";
import { MobileDishModal, type DishModalItem } from "@/components/site/MobileDishModal";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: `Menu & Catalog | ${business.name}` },
      { name: "description", content: `Full menu catalog of biryani, samosa, kabab, karahi, and pizzas at ${business.name}, Sarwar Shaheed Chowk, Jauharabad. Order on WhatsApp.` },
      { property: "og:title", content: `Menu & Catalog | ${business.name}` },
      { property: "og:description", content: `Full menu catalog at ${business.name}.` },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [selectedDish, setSelectedDish] = useState<DishModalItem | null>(null);

  return (
    <PageLayout>
      <PageHero
        eyebrow="WhatsApp Catalog & Menu"
        title="Fresh Biryani, Samosa & Fast Food"
        subtitle="Tap any item to view details and place instant WhatsApp order with photo and exact price."
      />

      <section className="container-page py-12 md:py-16">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl text-[color:var(--foreground)]">Featured Catalog Items</h2>
          <p className="mt-1.5 text-sm text-[color:var(--muted-foreground)] max-w-2xl">
            Tap any dish below to view photo and order directly via WhatsApp.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDishes.map((d, i) => {
            const itemWaMessage = encodeURIComponent(
              `Assalam-o-Alaikum Bari's Biryani House!\nI want to order: ${d.name} (${d.price})`
            );
            const itemWaUrl = `https://wa.me/923002797932?text=${itemWaMessage}`;

            return (
              <Reveal key={d.name} delay={i * 0.04}>
                <article
                  onClick={() => setSelectedDish(d)}
                  className="card-surface overflow-hidden h-full flex flex-col group border border-[color:var(--border)] shadow-sm hover:shadow-xl transition-all cursor-pointer"
                >
                  {d.image && (
                    <div className="aspect-[4/3] overflow-hidden bg-black/5 relative">
                      <img src={d.image} alt={d.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-bold shadow">
                        {d.price}
                      </div>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">{d.name}</h3>
                      <p className="mt-1.5 text-xs text-[color:var(--muted-foreground)] leading-relaxed">{d.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[color:var(--border)] flex items-center gap-2">
                      <a
                        href={itemWaUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-whatsapp flex-1 text-xs py-2 px-3 gap-1.5"
                      >
                        <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
                        </svg>
                        WhatsApp Order
                      </a>
                      <a href={callHref} onClick={(e) => e.stopPropagation()} className="btn-primary flex-1 text-xs py-2 px-3 gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> Call
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-24 space-y-16">
        {menuCategories.map((cat, ci) => (
          <Reveal key={cat.title} delay={ci * 0.05}>
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[color:var(--border)] pb-4">
                <div>
                  <h2 className="font-display text-2xl text-[color:var(--foreground)]">{cat.title}</h2>
                  {cat.note && <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{cat.note}</p>}
                </div>
              </div>
              <ul className="mt-6 divide-y divide-[color:var(--border)]">
                {cat.items.map((item, ii) => {
                  const itemWaMessage = encodeURIComponent(
                    `Assalam-o-Alaikum Bari's Biryani House!\nI want to order: ${item.name} (${item.price})`
                  );
                  const itemWaUrl = `https://wa.me/923002797932?text=${itemWaMessage}`;

                  return (
                    <li
                      key={`${cat.title}-${ii}`}
                      onClick={() => setSelectedDish(item)}
                      className="py-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center cursor-pointer hover:bg-[color:var(--surface)] p-3 rounded-2xl transition-colors"
                    >
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-xl border border-[color:var(--border)] shrink-0" />
                      )}
                      <div className="min-w-0">
                        <h3 className="font-display text-base text-[color:var(--foreground)]">{item.name}</h3>
                        <p className="mt-0.5 text-xs text-[color:var(--muted-foreground)] truncate">{item.description}</p>
                      </div>
                      <div className="text-right shrink-0 flex items-center gap-3">
                        <span className="font-display text-base font-bold text-[color:var(--primary)]">{item.price}</span>
                        <a
                          href={itemWaUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-whatsapp p-2 text-xs rounded-full"
                          title="Order on WhatsApp"
                        >
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
                          </svg>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>

      <MobileDishModal item={selectedDish} onClose={() => setSelectedDish(null)} />
    </PageLayout>
  );
}
