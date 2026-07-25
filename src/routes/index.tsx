import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
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
import { useStoreState } from "@/lib/useStore";
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

const HERO_PRODUCTS = [
  {
    name: "Special Dum Chicken Biryani",
    nameUrdu: "خاص دم چکن بریانی",
    price: "Rs. 300/-",
    image: heroImg,
    badge: "🔥 Customer Favorite · باری کی بریانی",
  },
  {
    name: "Full Service Dum Biryani",
    nameUrdu: "فل بریانی سروس",
    price: "Rs. 450/-",
    image: dishBiryaniFullService,
    badge: "⭐ Fresh Daily Batch",
  },
  {
    name: "Crispy Finger Fish",
    nameUrdu: "کرسپی فنگر فِش",
    price: "Rs. 1900/- kg",
    image: dishFingerFish,
    badge: "🐟 Hot & Fresh Special",
  },
  {
    name: "Chicken Samosi",
    nameUrdu: "چکن سموسی",
    price: "Rs. 30/- pc",
    image: dishChickenSamosi,
    badge: "🥟 Crisp Snack Special",
  },
  {
    name: "Chicken Vegetable Roll",
    nameUrdu: "چکن رول",
    price: "Rs. 60/- pc",
    image: dishChickenRoll,
    badge: "🌯 Hot Roll Special",
  },
];

function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_PRODUCTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentHeroProduct = HERO_PRODUCTS[heroIndex];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color:var(--background)] via-[color:var(--surface)] to-[#F1E7DA]" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[color:var(--primary)]/8 blur-3xl -z-10" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--secondary)]/10 blur-3xl -z-10" />

      {/* Rotating Background Watermark Text - 0.05 Opacity Max */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[80px] sm:text-[120px] md:text-[160px] font-bold text-black/[0.05] dark:text-white/[0.05] select-none pointer-events-none whitespace-nowrap -rotate-6 z-0">
        Jauharabad Famous Dum Biryani
      </div>

      {/* Logo Watermark Background */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] sm:h-[540px] sm:w-[540px] object-contain opacity-[0.05] pointer-events-none select-none -z-10"
      />

      <div className="container-page pt-8 pb-12 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24 grid gap-8 lg:grid-cols-[1.05fr_1fr] items-center relative z-10">
        <div>
          <div className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
            Bari's Special · Dum Biryani · Fast Food
          </div>

          <h1 className="mt-4 font-display text-[28px] sm:text-4xl md:text-5xl font-extrabold text-[color:var(--foreground)] leading-[1.12]">
            Fresh, Flavorful{" "}
            <span className="relative inline-block text-[color:var(--primary)]">
              Biryani
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[color:var(--secondary)] overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0 100 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{" "}
            in the Heart of{" "}
            <span className="relative inline-block italic text-[color:var(--secondary-hover)] font-handwriting text-[1.1em] ml-1">
              Jauharabad
              <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[color:var(--primary)] overflow-visible" viewBox="0 0 100 15" preserveAspectRatio="none">
                <path d="M0 8 Q 50 15 100 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[color:var(--muted-foreground)] leading-relaxed max-w-xl">
            Slow-cooked dum chicken biryani, crisp samosas & piping hot pizzas prepared fresh in Sarwar Shaheed Chowk, Main Bazar. Order online via WhatsApp for fast pickup or delivery.
          </p>

          {/* Full-width Promo Banner above CTAs */}
          <div className="mt-5 p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#1f8745]">
            <span className="h-3 w-3 rounded-full bg-[#25D366] shrink-0 animate-ping" />
            <span>🔥 Free Home Delivery in Jauharabad on WhatsApp Orders!</span>
          </div>

          {/* Mobile Button Hierarchy (Top-to-Bottom: WhatsApp, Call, Directions - 52px tall each) */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full z-30 relative">
            {/* Position 1: WhatsApp Multi Order (Green, Full-width) */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp Multi Order"
              className="btn-whatsapp min-h-[52px] h-[52px] w-full sm:w-auto text-base font-bold justify-center shadow-lg animate-pulse-glow"
              title="Order on WhatsApp Catalog"
            >
              <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
              </svg>
              <span>WhatsApp Multi Order</span>
            </a>

            {/* Position 2: Call to Order (Red/Primary, Full-width) */}
            <a
              href={callHref}
              aria-label="Call to Order"
              className="btn-primary min-h-[52px] h-[52px] w-full sm:w-auto text-base font-bold justify-center animate-ring-shake"
            >
              <Phone className="h-5 w-5" />
              <span>Call to Order</span>
            </a>

            {/* Position 3: Get Directions (Outline, Full-width) */}
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Get Directions"
              className="btn-ghost min-h-[52px] h-[52px] w-full sm:w-auto text-base font-bold justify-center"
            >
              <MapPin className="h-5 w-5" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[color:var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Star className="h-4 w-4 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />
              <strong className="text-[color:var(--foreground)]">{business.rating} ★</strong> Google Customer Rating
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              Open Daily · 8:00 AM – 11:00 PM
            </span>
          </div>
        </div>

        {/* Dynamic 4-Second Changing Hero Product Image Stage */}
        <div className="relative mt-4 lg:mt-0">
          <div className="relative rounded-[1.75rem] overflow-hidden border border-[color:var(--border)] shadow-[0_30px_60px_-30px_rgba(140,29,24,0.4)] h-[320px] sm:h-[420px] md:h-[500px] bg-[color:var(--surface)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroProduct.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <img
                  src={currentHeroProduct.image}
                  alt={currentHeroProduct.name}
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover"
                />

                {/* Floating Product Badge & Price overlay */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-black/80 backdrop-blur-md text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-bold border border-white/20 shadow-lg">
                  {currentHeroProduct.badge}
                </div>

                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-black/85 backdrop-blur-md text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-amber-400/40 shadow-2xl">
                  <div className="text-xs text-amber-300 font-bold">
                    {currentHeroProduct.name}{" "}
                    {currentHeroProduct.nameUrdu && (
                      <span dir="rtl" lang="ur" className="block sm:inline font-handwriting text-sm text-white/90 ml-1">
                        {currentHeroProduct.nameUrdu}
                      </span>
                    )}
                  </div>
                  <div className="text-base sm:text-lg font-black text-white">{currentHeroProduct.price}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 4-Second Animated Gold Timer Bar */}
            <motion.div
              key={`hero-timer-${heroIndex}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1.5 bg-[color:var(--secondary)] origin-left z-30 shadow-[0_0_12px_rgba(224,168,58,0.9)]"
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
            subtitle="Tap any item to view details or click the corner basket icon to add directly to your order!"
          />
        </Reveal>

        {/* Auto-scrolling Dish Marquee Strip */}
        <div className="mt-8 overflow-hidden relative py-3 bg-[color:var(--background)]/70 rounded-3xl border border-[color:var(--border)] shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[color:var(--surface)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[color:var(--surface)] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-6 items-center">
            {[...specials, ...specials].map((dish, idx) => (
              <div
                key={`marquee-${idx}`}
                onClick={() => setSelectedDish(dish)}
                className="shrink-0 flex items-center gap-3 p-2 pr-4 rounded-2xl bg-[color:var(--surface)] border border-[color:var(--border)] shadow-sm hover:scale-105 transition-transform cursor-pointer group"
              >
                {dish.image && (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-12 w-12 rounded-xl object-cover border border-[color:var(--border)]"
                  />
                )}
                <div>
                  <h4 className="text-xs font-bold text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">
                    {dish.name}
                  </h4>
                  <span className="text-[11px] font-bold text-[color:var(--secondary)]">
                    {dish.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                      <div className="absolute top-3 left-3 bg-[color:var(--primary)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
                        <span dir="rtl" lang="ur">{s.nameUrdu}</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur text-white px-3.5 py-1.5 rounded-xl font-display font-bold text-base shadow-lg border border-white/10 z-10">
                      {s.price} {s.unit && <span className="text-xs font-normal text-white/80">· {s.unit}</span>}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-display text-base sm:text-lg text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">
                        {s.name}
                      </h3>
                      {s.description && (
                        <p className="mt-1.5 text-xs text-[color:var(--muted-foreground)] leading-relaxed">
                          {s.description}
                        </p>
                      )}
                    </div>

                    {/* 50/50 Full-Width Buttons, 48px Tall, 8px Gap */}
                    <div className="mt-4 pt-3 border-t border-[color:var(--border)] flex items-center gap-2">
                      <QuickAddBasket dish={s} variant="button" className="flex-1 h-[48px] min-h-[48px]" />
                      <a
                        href={itemWaUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-whatsapp flex-1 text-xs py-2 px-3 gap-1.5 justify-center h-[48px] min-h-[48px]"
                        aria-label={`Order ${s.name} on WhatsApp`}
                      >
                        <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
                        </svg>
                        <span>WhatsApp</span>
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
    { icon: Accessibility, label: "Accessible seating", sub: "Wheelchair-friendly area" },
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
                <div className="text-xs sm:text-sm font-semibold text-[color:var(--foreground)] truncate group-hover:text-[color:var(--primary)] transition-colors">{it.label}</div>
                <div className="text-[11px] sm:text-xs text-[color:var(--muted-foreground)] truncate">{it.sub}</div>
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
  const { featuredMenu, activeMenu } = useStoreState();
  const displayItems = featuredMenu.length > 0 ? featuredMenu : activeMenu.slice(0, 6);

  return (
    <section className="relative overflow-hidden container-page py-16 md:py-28">
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] object-contain opacity-[0.08] pointer-events-none select-none -z-10"
      />
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <SectionHeader
            eyebrow="The Menu"
            title={<>Signature dishes from <span className="text-[color:var(--primary)]">our handi</span></>}
            subtitle="A short taste of what we cook every single day in Sarwar Shaheed Chowk."
          />
          <Link to="/menu" className="btn-ghost self-start md:self-end">
            View full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {displayItems.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.05}>
            <article className="card-surface overflow-hidden h-full flex flex-col">
              {d.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-[color:var(--foreground)]">
                    {d.name} {d.nameUrdu ? <span className="font-normal text-xs text-stone-500">({d.nameUrdu})</span> : ""}
                  </h3>
                  <span className="text-[color:var(--primary)] font-semibold whitespace-nowrap">{d.price}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[color:var(--muted-foreground)] leading-relaxed">{d.description}</p>
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
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 right-10 -translate-y-1/2 h-80 w-80 object-contain opacity-[0.08] pointer-events-none select-none -z-10"
      />
      <div className="container-page py-16 md:py-24 relative z-10">
        <Reveal>
          <SectionHeader
            center
            eyebrow="Why Biryani House"
            title={<>A local kitchen, done well</>}
            subtitle="Nothing fancy — just honest biryani, warm service and a place that's easy to visit or call."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="card-surface p-5 sm:p-6 h-full">
                <div className="h-11 w-11 rounded-xl bg-[color:var(--primary)]/8 text-[color:var(--primary)] grid place-items-center">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base sm:text-lg">{p.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[color:var(--muted-foreground)] leading-relaxed">{p.body}</p>
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
    <section className="container-page py-16 md:py-28">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative">
            <img
              src={aboutStoreMain}
              alt="Bari's Biryani & Pizza Storefront in Main Bazar Jauharabad"
              loading="lazy"
              className="rounded-2xl object-cover w-full h-[320px] sm:h-[420px] md:h-[480px] border border-[color:var(--border)] shadow-xl"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow">Our Story</div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl">A neighbourhood biryani spot in Main Bazar</h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--muted-foreground)] leading-relaxed">
            Biryani House is a local dine-in and takeaway kitchen serving Jauharabad. We keep the menu focused on what we do best — slow-cooked biryani, hearty karahi and fresh sides — and we cook it every day for people who live and work around Main Bazar.
          </p>
          <p className="mt-3 text-sm text-[color:var(--muted-foreground)] leading-relaxed font-medium">
            Founded with a passion for authentic spices and traditional dum cooking, every dish is prepared under strict hygiene standards.
          </p>
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
      <div className="container-page py-16 md:py-24">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Gallery"
              title="A look at the food and the room"
              subtitle="Real dishes and interior photography from our restaurant."
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
  const reviews = [
    { name: "Mian Hamza", comment: "Jauharabad mein sab se behtareen dum biryani! Chawal aur boti ka zaika zabardast hai.", stars: 5 },
    { name: "Tariq Malik", comment: "Finger fish aur samosay buhat crisp hotay hain. Service is super fast and hot delivery.", stars: 5 },
    { name: "Muhammad Awais", comment: "Family ke saath dine-in kiya, mahool aur khana dono shandar thay. Highly recommended!", stars: 5 },
  ];

  return (
    <section className="container-page py-16 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
        <Reveal>
          <div className="card-surface p-6 sm:p-8 text-center">
            <div className="text-5xl sm:text-6xl font-display font-bold text-[color:var(--primary)]">{business.rating}</div>
            <div className="mt-2 flex items-center justify-center gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />)}
            </div>
            <div className="mt-3 text-xs sm:text-sm text-[color:var(--muted-foreground)]">Google rating (verified reviews)</div>
            <a href={googleReviewsHref} target="_blank" rel="noreferrer" className="btn-secondary mt-6 w-full py-3 text-xs sm:text-sm font-bold">
              View on Google
            </a>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeader
              eyebrow="What guests say"
              title="Real feedback from valued customers"
              subtitle="Authentic Google reviews from biryani lovers in Jauharabad."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reviews.map((r, n) => (
              <Reveal key={r.name} delay={n * 0.05}>
                <div className="card-surface p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(r.stars)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[color:var(--secondary)] text-[color:var(--secondary)]" />
                      ))}
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-[color:var(--foreground)] italic leading-relaxed">
                      "{r.comment}"
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[color:var(--border)] text-xs font-bold text-[color:var(--foreground)]">
                    {r.name}
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
      <div className="container-page py-16 md:py-24">
        <Reveal>
          <SectionHeader
            center
            eyebrow="Good to know"
            title="Frequently asked questions"
          />
        </Reveal>
        <div className="mt-8 max-w-3xl mx-auto">
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
    <section className="container-page py-16 md:py-28">
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
                  <div className="font-semibold text-sm sm:text-base text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors group-hover:underline underline-offset-4 decoration-[color:var(--primary)]/40">
                    {business.address.line1}
                  </div>
                  <div className="text-xs sm:text-sm text-[color:var(--muted-foreground)]">
                    {business.address.line2}, {business.address.region}, {business.address.country}
                  </div>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[color:var(--primary)]/8 grid place-items-center text-[color:var(--primary)] shrink-0"><Phone className="h-5 w-5" /></div>
              <div>
                <a href={callHref} className="font-semibold text-sm sm:text-base hover:text-[color:var(--primary)]">{business.phone}</a>
                <div className="text-xs sm:text-sm text-[color:var(--muted-foreground)]">Tap to call</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[color:var(--primary)]/8 grid place-items-center text-[color:var(--primary)] shrink-0"><Clock className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold text-sm sm:text-base">{business.hoursLabel}</div>
                <div className="text-xs sm:text-sm text-[color:var(--muted-foreground)]">Same hours every day of the week</div>
              </div>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={callHref} className="btn-primary min-h-[48px] py-3"><Phone className="h-4 w-4" /> Call to Order</a>
            <a href={directionsHref} target="_blank" rel="noreferrer" className="btn-ghost min-h-[48px] py-3"><MapPin className="h-4 w-4" /> Get Directions</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-[color:var(--border)] h-[320px] sm:h-[420px] bg-[color:var(--surface)]">
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
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-4 sm:p-5 text-left select-none min-h-[52px]">
        <span className="font-semibold text-sm sm:text-base text-[color:var(--foreground)] pr-2">{q}</span>
        <span className="h-8 w-8 min-w-[32px] rounded-full border border-[color:var(--border)] grid place-items-center text-[color:var(--primary)] transition-transform group-open:rotate-45 shrink-0">
          <span className="text-xl leading-none">+</span>
        </span>
      </summary>
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[color:var(--muted-foreground)] leading-relaxed">{a}</div>
    </details>
  );
}

