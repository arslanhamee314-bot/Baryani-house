import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MobileDishModal, type DishModalItem } from "@/components/site/MobileDishModal";
import { QuickAddBasket } from "@/components/site/QuickAddBasket";
import {
  ArrowRight,
  Clock,
  Accessibility,
  MapPin,
  Phone,
  Star,
  Utensils,
  Flame,
} from "lucide-react";
import heroImg from "@/assets/hero-biryani.jpg";
import heroInsetBadge from "@/assets/hero-inset-badge.jpg";
import aboutStoreMain from "@/assets/about-store-main.jpg";
import aboutStoreInset from "@/assets/about-store-inset.jpg";
import interiorImg from "@/assets/gallery-interior-1.jpg";
import servingImg from "@/assets/gallery-serving.jpg";
import spicesImg from "@/assets/gallery-spices.jpg";
import thaliImg from "@/assets/gallery-thali.jpg";
import logoMark from "@/assets/logo-mark.png";
import dishFingerFish from "@/assets/dish-finger-fish.jpg";
import dishChickenSamosi from "@/assets/dish-chicken-samosi.jpg";
import dishChickenRoll from "@/assets/dish-chicken-roll.jpg";
import dishSamosaCat from "@/assets/dish-samosa-cat.jpg";
import dishShamiCat from "@/assets/dish-shami-cat.jpg";
import dishBiryaniFullParcel from "@/assets/dish-biryani-full-parcel.jpg";
import dishBiryaniFullService from "@/assets/dish-biryani-full-service.jpg";
import dishBiryaniHalfParcel from "@/assets/dish-biryani-half-parcel.jpg";
import dishBiryaniHalfService from "@/assets/dish-biryani-half-service.jpg";
import { business, callHref, directionsHref, googleReviewsHref, mapEmbedSrc, whatsappHref } from "@/lib/business";
import { PageLayout, PlaceholderChip, SectionHeader } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { featuredDishes } from "@/data/menu";
import { faqs } from "@/data/faqs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${business.name} | Biryani & Fast Food in Jauharabad` },
      { name: "description", content: `Fresh, flavorful biryani and fast food in Sarwar Shaheed Chowk, Jauharabad. Dine-in and takeaway daily 8am–11pm. Call ${business.phone} to order or get directions.` },
      { property: "og:title", content: `${business.name} | Biryani & Fast Food in Jauharabad` },
      { property: "og:description", content: "Fresh, flavorful biryani & pizza in Sarwar Shaheed Chowk, Jauharabad. Dine-in and takeaway daily 8am–11pm." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <SpecialOffersShowcase />
      <TrustStrip />
      <SignatureMenu />
      <WhyUs />
      <AboutPreview />
      <GalleryPreview />
      <ReviewsPreview />
      <FaqPreview />
      <ContactMap />
    </PageLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color:var(--background)] via-[color:var(--surface)] to-[#F1E7DA]" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--primary)]/8 blur-3xl -z-10" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--secondary)]/10 blur-3xl -z-10" />

      {/* Logo Watermark Background */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 h-[540px] w-[540px] object-contain opacity-[0.16] pointer-events-none select-none -z-10"
      />

      <div className="container-page pt-10 pb-16 md:pt-16 md:pb-24 grid gap-10 lg:grid-cols-[1.05fr_1fr] items-center relative z-10">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--secondary)]" />
            Biryani · Karahi · Dine-in & Takeaway
          </div>

          <h1 className="mt-4 font-display text-[color:var(--foreground)]">
            Fresh, Flavorful{" "}
            <span className="text-[color:var(--primary)]">Biryani</span> in the Heart of{" "}
            <span className="italic text-[color:var(--secondary-hover)]">Jauharabad</span>
          </h1>

          <p className="mt-5 text-lg text-[color:var(--muted-foreground)] leading-relaxed max-w-xl">
            Slow-cooked biryani, warm hospitality and honest local flavour on Main Bazar Road. Call to order for pickup, or drop in for dine-in — open daily from 8am to 11pm.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
              title="Order on WhatsApp Catalog"
            >
              <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
              </svg>
              WhatsApp Order
            </a>
            <a href={callHref} className="btn-primary">
              <Phone className="h-4 w-4" /> Call to Order
            </a>
            <a href={directionsHref} target="_blank" rel="noreferrer" className="btn-ghost">
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[color:var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />
              <strong className="text-[color:var(--foreground)]">{business.rating}</strong> Google rating
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[color:var(--accent)]" />
              Open now · 8am–11pm
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[color:var(--primary)]/20 to-[color:var(--secondary)]/20 blur-2xl -z-10" />
          <div className="relative rounded-[1.75rem] overflow-hidden border border-[color:var(--border)] shadow-[0_40px_80px_-40px_rgba(140,29,24,0.4)]">
            <img
              src={heroImg}
              alt="Steaming chicken biryani in a copper handi at Biryani House, Jauharabad"
              className="w-full h-[420px] md:h-[520px] object-cover"
              fetchPriority="high"
              decoding="async"
              width={1600}
              height={1200}
            />
          </div>
          {/* Right Bottom Floating Inset Overlay Badge Photo */}
          <div className="absolute -bottom-6 -right-3 md:-right-6 w-36 h-28 sm:w-44 sm:h-32 md:w-52 md:h-36 rounded-2xl overflow-hidden border-3 border-white dark:border-zinc-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] z-20 hover:scale-105 transition-transform duration-300">
            <img
              src={heroInsetBadge}
              alt="Bari's Biryani & Pizza Store View"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialOffersShowcase() {
  const [selectedDish, setSelectedDish] = useState<DishModalItem | null>(null);

  const specials: DishModalItem[] = [
    {
      name: "Full biryani parcel",
      nameUrdu: "فل بریانی پارسل",
      price: "PKR 420",
      unit: "Packing charges incl.",
      image: dishBiryaniFullParcel,
      description: "Full portion dum chicken biryani packed hot with raita & salan.",
    },
    {
      name: "Full biryani service",
      nameUrdu: "فل بریانی سروس",
      price: "PKR 400",
      unit: "Dine-in / Service",
      image: dishBiryaniFullService,
      description: "Full portion dum chicken biryani served fresh on table.",
    },
    {
      name: "Half biryani parcel",
      nameUrdu: "ہاف بریانی پارسل",
      price: "PKR 310",
      unit: "Packing charges incl.",
      image: dishBiryaniHalfParcel,
      description: "Single portion dum chicken biryani packed hot.",
    },
    {
      name: "half biryani service",
      nameUrdu: "ہاف بریانی سروس",
      price: "PKR 300",
      unit: "Dine-in / Service",
      image: dishBiryaniHalfService,
      description: "Single portion dum chicken biryani served fresh.",
    },
    {
      name: "Chicken samosa",
      nameUrdu: "چکن سموسہ",
      price: "PKR 50",
      unit: "per piece",
      image: dishSamosaCat,
      description: "Golden crispy fried samosa filled with minced chicken.",
    },
    {
      name: "Shami kabab",
      nameUrdu: "شامی کباب",
      price: "PKR 60",
      unit: "per piece",
      image: dishShamiCat,
      description: "Traditional daal-chicken shami kabab fried to perfection.",
    },
    {
      name: "Crispy Finger Fish",
      nameUrdu: "فنگر فِش",
      price: "Rs. 1900/-",
      unit: "per kg (کلو)",
      image: dishFingerFish,
      description: "Crispy golden fried fish fingers prepared fresh to order.",
    },
    {
      name: "Chicken Samosi",
      nameUrdu: "چکن سموسی",
      price: "Rs. 30/-",
      unit: "per piece",
      image: dishChickenSamosi,
      description: "Golden fried crispy samosi filled with spiced minced chicken.",
    },
    {
      name: "Chicken Vegetable Roll",
      nameUrdu: "چکن ویجیٹیبل رول",
      price: "Rs. 60/-",
      unit: "per piece",
      image: dishChickenRoll,
      description: "Crispy spring rolls stuffed with chicken and fresh vegetables.",
    },
  ];

  return (
    <section id="specials" className="relative overflow-hidden bg-[color:var(--surface)] py-16 md:py-24 border-b border-[color:var(--border)]">
      {/* Logo Watermark Background */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] object-contain opacity-[0.16] pointer-events-none select-none -z-10"
      />

      <div className="container-page relative z-10">
        <Reveal>
          <SectionHeader
            center
            eyebrow="WhatsApp Menu Catalog · باری کے خاص پکوان"
            title={<>Featured Menu Catalog & <span className="text-[color:var(--primary)]">Special Delights</span></>}
            subtitle="Tap any item to view full photo & place 1-tap WhatsApp order with automatic image & price details."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specials.map((s, i) => {
            const itemWaMessage = encodeURIComponent(
              `Assalam-o-Alaikum Bari's Biryani House!\nI want to order: ${s.name} (${s.price})`
            );
            const itemWaUrl = `https://wa.me/923002797932?text=${itemWaMessage}`;

            return (
              <Reveal key={s.name} delay={(i % 3) * 0.06}>
                <div
                  onClick={() => setSelectedDish(s)}
                  className="card-surface overflow-hidden h-full flex flex-col group border border-[color:var(--border)] shadow-md hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                    <QuickAddBasket dish={s} variant="floating" />
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {s.nameUrdu && (
                      <div className="absolute top-3 right-3 bg-[color:var(--primary)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        {s.nameUrdu}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur text-white px-3.5 py-1.5 rounded-xl font-display font-bold text-base shadow-lg border border-white/10">
                      {s.price} {s.unit && <span className="text-xs font-normal text-white/80">· {s.unit}</span>}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-display text-lg text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">
                        {s.name}
                      </h3>
                      {s.description && (
                        <p className="mt-1.5 text-xs text-[color:var(--muted-foreground)] leading-relaxed">
                          {s.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[color:var(--border)] flex items-center gap-2">
                      <QuickAddBasket dish={s} variant="button" className="flex-1" />
                      <a
                        href={itemWaUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-whatsapp flex-1 text-xs py-2 px-3 gap-1.5 justify-center"
                      >
                        <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <MobileDishModal item={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Star, label: `${business.rating} Google rating`, sub: "Publicly visible", href: googleReviewsHref },
    { icon: Clock, label: "Open daily", sub: "8:00 AM – 11:00 PM" },
    { icon: MapPin, label: "Sarwar Shaheed Chowk", sub: "Main Bazar, Jauharabad", href: directionsHref },
    { icon: Accessibility, label: "Accessible seating", sub: "Wheelchair-friendly indoor area" },
  ];
  return (
    <section className="border-y border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="container-page py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => {
          const content = (
            <div className="flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-full bg-[color:var(--primary)]/8 text-[color:var(--primary)] grid place-items-center shrink-0 group-hover:scale-110 transition-transform">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[color:var(--foreground)] truncate group-hover:text-[color:var(--primary)] transition-colors">{it.label}</div>
                <div className="text-xs text-[color:var(--muted-foreground)] truncate">{it.sub}</div>
              </div>
            </div>
          );
          return it.href ? (
            <a key={it.label} href={it.href} target="_blank" rel="noreferrer" title={`Open ${it.label} in new tab`}>
              {content}
            </a>
          ) : (
            <div key={it.label}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}

function SignatureMenu() {
  return (
    <section className="relative overflow-hidden container-page py-20 md:py-28">
      {/* Logo Watermark Background */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] object-contain opacity-[0.15] pointer-events-none select-none -z-10"
      />
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <SectionHeader
            eyebrow="The Menu"
            title={<>Signature dishes from <span className="text-[color:var(--primary)]">our handi</span></>}
            subtitle="A short taste of what we cook. Prices shown are editable placeholders — update in one place from the menu file."
          />
          <Link to="/menu" className="btn-ghost self-start md:self-end">
            View full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {featuredDishes.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.05}>
            <article className="card-surface overflow-hidden h-full flex flex-col">
              {d.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl text-[color:var(--foreground)]">{d.name}</h3>
                  <span className="text-[color:var(--primary)] font-semibold whitespace-nowrap">{d.price}</span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--muted-foreground)] leading-relaxed">{d.description}</p>
                {d.editable && <div className="mt-3"><PlaceholderChip>Editable price</PlaceholderChip></div>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { icon: Utensils, title: "Dine-in or takeaway", body: "Eat in our warm dining area or grab it to go — whichever fits your day." },
    { icon: Phone, title: "Order direct by phone", body: "One quick call, no apps, no middlemen. We prep it fresh for pickup." },
    { icon: MapPin, title: "Right on Main Bazar", body: "Easy to find in Jauharabad's Main Bazar — open every day of the week." },
    { icon: Flame, title: "Cooked on dum, daily", body: "Slow, layered biryani with whole spices — the way it's meant to be." },
  ];
  return (
    <section className="relative overflow-hidden bg-[color:var(--surface)] border-y border-[color:var(--border)]">
      {/* Logo Watermark Background */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 right-10 -translate-y-1/2 h-96 w-96 object-contain opacity-[0.15] pointer-events-none select-none -z-10"
      />
      <div className="container-page py-20 md:py-24 relative z-10">
        <Reveal>
          <SectionHeader
            center
            eyebrow="Why Biryani House"
            title={<>A local kitchen, done well</>}
            subtitle="Nothing fancy — just honest biryani, warm service and a place that's easy to visit or call."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="card-surface p-6 h-full">
                <div className="h-11 w-11 rounded-xl bg-[color:var(--primary)]/8 text-[color:var(--primary)] grid place-items-center">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--muted-foreground)] leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative">
            <img
              src={aboutStoreMain}
              alt="Bari's Biryani & Pizza Storefront in Main Bazar Jauharabad"
              loading="lazy"
              className="rounded-2xl object-cover w-full h-[420px] md:h-[480px] border border-[color:var(--border)] shadow-xl"
            />
            {/* Right Bottom Floating Inset Overlay Badge Photo */}
            <div className="hidden sm:block absolute -bottom-6 -right-4 md:-right-6 w-36 h-28 sm:w-44 sm:h-32 md:w-52 md:h-36 rounded-2xl overflow-hidden border-3 border-white dark:border-zinc-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] z-20 hover:scale-105 transition-transform duration-300">
              <img
                src={aboutStoreInset}
                alt="Bari's Biryani & Pizza Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow">Our Story</div>
          <h2 className="mt-3 font-display">A neighbourhood biryani spot in Main Bazar</h2>
          <p className="mt-4 text-[color:var(--muted-foreground)] leading-relaxed">
            Biryani House is a local dine-in and takeaway kitchen serving Jauharabad. We keep the menu focused on what we do best — slow-cooked biryani, hearty karahi and fresh sides — and we cook it every day for people who live and work around Main Bazar.
          </p>
          <div className="mt-4 rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-4">
            <div className="flex items-center gap-2"><PlaceholderChip>Owner story</PlaceholderChip></div>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
              [Add a short, verified sentence from the owner about how the restaurant started and what makes the recipe theirs. Keep it warm, local and honest.]
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/about" className="btn-ghost">More about us <ArrowRight className="h-4 w-4" /></Link>
            <a href={callHref} className="btn-primary"><Phone className="h-4 w-4" /> Call the kitchen</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const items = [thaliImg, servingImg, spicesImg, interiorImg];
  return (
    <section className="bg-[color:var(--surface)] border-y border-[color:var(--border)]">
      <div className="container-page py-20 md:py-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Gallery"
              title="A look at the food and the room"
              subtitle="Real dishes and interior photography. Placeholder images shown — replace with your own approved shots any time."
            />
            <Link to="/gallery" className="btn-ghost self-start md:self-end">
              Open gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[color:var(--border)] group">
                <img src={src} alt="Biryani House Jauharabad — food and interior" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsPreview() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
        <Reveal>
          <div className="card-surface p-8 text-center">
            <div className="text-6xl font-display font-bold text-[color:var(--primary)]">{business.rating}</div>
            <div className="mt-2 flex items-center justify-center gap-0.5">
              {[1,2,3,4].map(i => <Star key={i} className="h-5 w-5 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />)}
              <Star className="h-5 w-5 text-[color:var(--secondary)]" />
            </div>
            <div className="mt-3 text-sm text-[color:var(--muted-foreground)]">Google rating (publicly visible)</div>
            <a href={googleReviewsHref} target="_blank" rel="noreferrer" className="btn-secondary mt-6 w-full">
              View on Google
            </a>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeader
              eyebrow="What guests say"
              title="Real feedback, honestly shown"
              subtitle="Rating shown as visible on Google. Written review cards below are editable placeholders — replace with approved reviews any time."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[1,2,3].map((n) => (
              <Reveal key={n} delay={n * 0.05}>
                <div className="card-surface p-5 h-full">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />)}
                  </div>
                  <p className="mt-3 text-sm text-[color:var(--foreground)] italic">
                    "[Add a short, approved review quote here. Keep it in the guest's own words.]"
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[color:var(--foreground)]">[Guest name]</span>
                    <PlaceholderChip>Editable</PlaceholderChip>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="bg-[color:var(--surface)] border-y border-[color:var(--border)]">
      <div className="container-page py-20 md:py-24">
        <Reveal>
          <SectionHeader
            center
            eyebrow="Good to know"
            title="Frequently asked"
          />
        </Reveal>
        <div className="mt-10 max-w-3xl mx-auto">
          <FaqList items={faqs.slice(0, 5)} />
          <div className="mt-6 text-center">
            <Link to="/faq" className="btn-ghost">All questions <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactMap() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-start">
        <Reveal>
          <SectionHeader eyebrow="Visit us" title="Come by, or call ahead" />
          <ul className="mt-6 space-y-4 text-[color:var(--foreground)]">
            <li className="flex items-start gap-3">
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 group"
                title="Open location on Google Maps"
              >
                <div className="h-10 w-10 rounded-full bg-[color:var(--primary)]/8 grid place-items-center text-[color:var(--primary)] shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors group-hover:underline underline-offset-4 decoration-[color:var(--primary)]/40">
                    {business.address.line1}
                  </div>
                  <div className="text-sm text-[color:var(--muted-foreground)]">
                    {business.address.line2}, {business.address.region}, {business.address.country}
                  </div>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[color:var(--primary)]/8 grid place-items-center text-[color:var(--primary)] shrink-0"><Phone className="h-5 w-5" /></div>
              <div>
                <a href={callHref} className="font-semibold hover:text-[color:var(--primary)]">{business.phone}</a>
                <div className="text-sm text-[color:var(--muted-foreground)]">Tap to call</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[color:var(--primary)]/8 grid place-items-center text-[color:var(--primary)] shrink-0"><Clock className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold">{business.hoursLabel}</div>
                <div className="text-sm text-[color:var(--muted-foreground)]">Same hours every day of the week</div>
              </div>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={callHref} className="btn-primary"><Phone className="h-4 w-4" /> Call to Order</a>
            <a href={directionsHref} target="_blank" rel="noreferrer" className="btn-ghost"><MapPin className="h-4 w-4" /> Get Directions</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-[color:var(--border)] h-[420px] bg-[color:var(--surface)]">
            <iframe
              src={mapEmbedSrc}
              title="Biryani House location on Google Maps"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Reusable
function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]">
      {items.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-semibold text-[color:var(--foreground)]">{q}</span>
        <span className="h-7 w-7 rounded-full border border-[color:var(--border)] grid place-items-center text-[color:var(--primary)] transition-transform group-open:rotate-45">
          <span className="text-lg leading-none">+</span>
        </span>
      </summary>
      <div className="px-5 pb-5 text-sm text-[color:var(--muted-foreground)] leading-relaxed">{a}</div>
    </details>
  );
}

