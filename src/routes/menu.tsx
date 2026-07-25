import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business, createWhatsAppUrl } from "@/lib/business";
import { useStoreState } from "@/lib/useStore";
import { MobileDishModal, type DishModalItem } from "@/components/site/MobileDishModal";
import { QuickAddBasket } from "@/components/site/QuickAddBasket";
import { HeroCarousel, type SlideItem } from "@/components/site/HeroCarousel";

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
  const { activeMenu, activeCategories, featuredMenu } = useStoreState();
  const [selectedDish, setSelectedDish] = useState<DishModalItem | null>(null);

  const displayFeatured = featuredMenu.length > 0 ? featuredMenu : activeMenu.slice(0, 6);

  const menuSlides: SlideItem[] = displayFeatured.map((d) => ({
    id: d.id,
    title: d.name,
    subtitle: d.description,
    price: d.price,
    image: d.image || "",
    badge: "🔥 One-by-One Menu Showcase · باری کا خاص مینو",
    dishData: {
      name: d.name,
      price: d.price,
      image: d.image || "",
    },
  }));

  return (
    <PageLayout>
      {/* Dynamic One-by-One Menu Product Carousel */}
      <section className="container-page pt-4 pb-4">
        <HeroCarousel slides={menuSlides} heightClass="h-[340px] sm:h-[460px] md:h-[540px]" />
      </section>

      <section className="container-page py-8 md:py-16">
        <Reveal>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-[color:var(--foreground)]">Featured Catalog Items</h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[color:var(--muted-foreground)] max-w-2xl">
            Tap any dish below to view details or click the corner basket icon to add directly to your order!
          </p>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayFeatured.map((d, i) => {
            const itemWaUrl = createWhatsAppUrl(
              business.whatsapp,
              `Assalam-o-Alaikum Bari's Biryani House! I want to order: ${d.name} (${d.price})`
            );

            return (
              <Reveal key={d.id} delay={i * 0.04}>
                <article
                  onClick={() => setSelectedDish({ name: d.name, price: d.price, description: d.description, image: d.image })}
                  className="card-surface overflow-hidden h-full flex flex-col group border border-[color:var(--border)] shadow-sm hover:shadow-xl transition-all cursor-pointer"
                >
                  {d.image && (
                    <div className="aspect-[4/3] overflow-hidden bg-black/5 relative">
                      <QuickAddBasket dish={{ name: d.name, price: d.price, description: d.description, image: d.image }} variant="floating" />
                      <img src={d.image} alt={d.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-bold shadow">
                        {d.price}
                      </div>
                    </div>
                  )}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base sm:text-lg text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">
                        {d.name} {d.nameUrdu ? <span className="font-normal text-xs text-stone-500">({d.nameUrdu})</span> : ""}
                      </h3>
                      <p className="mt-1.5 text-xs text-[color:var(--muted-foreground)] leading-relaxed">{d.description}</p>
                    </div>
                    {/* 50/50 Full-Width Buttons, 48px Tall, 8px Gap */}
                    <div className="mt-4 pt-3 border-t border-[color:var(--border)] flex items-center gap-2">
                      <QuickAddBasket dish={{ name: d.name, price: d.price, description: d.description, image: d.image }} variant="button" className="flex-1 h-[48px] min-h-[48px]" />
                      <a
                        href={itemWaUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-whatsapp flex-1 text-xs py-2 px-3 gap-1.5 justify-center h-[48px] min-h-[48px]"
                        aria-label={`Order ${d.name} on WhatsApp`}
                      >
                        <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-24 space-y-12">
        {activeCategories.map((cat, ci) => {
          const categoryItems = activeMenu.filter((m) => m.categoryTitle === cat.title);
          if (categoryItems.length === 0) return null;

          return (
            <Reveal key={cat.id} delay={ci * 0.05}>
              <div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[color:var(--border)] pb-3">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl text-[color:var(--foreground)]">{cat.title}</h2>
                    {cat.note && <p className="mt-1 text-xs sm:text-sm text-[color:var(--muted-foreground)]">{cat.note}</p>}
                  </div>
                </div>
                <ul className="mt-4 divide-y divide-[color:var(--border)]">
                  {categoryItems.map((item) => {
                    const itemWaUrl = createWhatsAppUrl(
                      business.whatsapp,
                      `Assalam-o-Alaikum Bari's Biryani House! I want to order: ${item.name} (${item.price})`
                    );

                    return (
                      <li
                        key={item.id}
                        onClick={() => setSelectedDish({ name: item.name, price: item.price, description: item.description, image: item.image })}
                        className="py-3.5 grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-4 items-center cursor-pointer hover:bg-[color:var(--surface)] p-2 sm:p-3 rounded-2xl transition-colors min-h-[64px]"
                      >
                        {item.image && (
                          <img src={item.image} alt={item.name} className="h-14 w-14 sm:h-16 sm:w-16 object-cover rounded-xl border border-[color:var(--border)] shrink-0" />
                        )}
                        <div className="min-w-0">
                          <h3 className="font-display text-xs sm:text-base text-[color:var(--foreground)]">
                            {item.name} {item.nameUrdu ? <span className="font-normal text-xs text-stone-500">({item.nameUrdu})</span> : ""}
                          </h3>
                          <p className="mt-0.5 text-[11px] sm:text-xs text-[color:var(--muted-foreground)] truncate">{item.description}</p>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-2">
                          <span className="font-display text-xs sm:text-base font-bold text-[color:var(--primary)] mr-1">{item.price}</span>
                          <QuickAddBasket dish={{ name: item.name, price: item.price, description: item.description, image: item.image }} variant="floating" className="!relative !top-0 !left-0 inline-flex" />
                          <a
                            href={itemWaUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="btn-whatsapp p-2 text-xs rounded-full min-h-[44px] min-w-[44px] justify-center"
                            aria-label={`Order ${item.name} on WhatsApp`}
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
          );
        })}
      </section>

      <MobileDishModal item={selectedDish} onClose={() => setSelectedDish(null)} />
    </PageLayout>
  );
}
