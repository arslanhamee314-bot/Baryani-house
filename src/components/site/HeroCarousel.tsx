import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, ShoppingBag, Phone, Sparkles } from "lucide-react";
import { parsePriceNumber, useCart } from "@/context/CartContext";
import { business, callHref } from "@/lib/business";

export type SlideItem = {
  id: string;
  title: string;
  titleUrdu?: string;
  subtitle?: string;
  price?: string;
  image: string;
  badge?: string;
  isVideo?: boolean;
  actionText?: string;
  actionHref?: string;
  dishData?: {
    name: string;
    nameUrdu?: string;
    price: string;
    unit?: string;
    image: string;
  };
};

type Props = {
  slides: SlideItem[];
  autoPlayInterval?: number;
  heightClass?: string;
  themeColor?: string;
};

export function HeroCarousel({
  slides,
  autoPlayInterval = 4000,
  heightClass = "h-[460px] md:h-[520px]",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  const handleAddToCart = (dish: SlideItem["dishData"]) => {
    if (!dish) return;
    const priceNum = parsePriceNumber(dish.price);
    addToCart(
      {
        id: dish.name.toLowerCase().replace(/\s+/g, "-"),
        name: dish.name,
        nameUrdu: dish.nameUrdu,
        price: priceNum,
        priceRaw: dish.price,
        unit: dish.unit,
        image: dish.image,
      },
      1
    );
    setIsCartOpen(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-3xl border border-[color:var(--border)] shadow-2xl bg-slate-950 group`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full flex items-center"
        >
          {/* Background Image with Smooth 4-Second Scale Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 4, ease: "linear" }}
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
            />
            {/* Rich Vignette & Dark Gradient Layering */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
          </div>

          {/* Content Card Overlay */}
          <div className="container-page relative z-10 text-white max-w-2xl px-6 md:px-12">
            {currentSlide.badge && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-[color:var(--secondary)] text-slate-950 shadow-lg border border-amber-300/60 mb-3.5 animate-shimmer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{currentSlide.badge}</span>
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] drop-shadow-lg tracking-tight"
            >
              {currentSlide.title}{" "}
              {currentSlide.titleUrdu && (
                <span className="text-[color:var(--secondary)] font-handwriting text-3xl sm:text-5xl md:text-6xl ml-2 font-normal">
                  {currentSlide.titleUrdu}
                </span>
              )}
            </motion.h2>

            {currentSlide.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45 }}
                className="mt-3 text-sm md:text-base text-gray-200 line-clamp-2 max-w-xl font-medium leading-relaxed drop-shadow"
              >
                {currentSlide.subtitle}
              </motion.p>
            )}

            {currentSlide.price && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.34, duration: 0.4 }}
                className="mt-4 inline-block px-5 py-2 rounded-2xl bg-amber-500/25 backdrop-blur-md border border-amber-400/50 text-amber-300 font-display font-black text-2xl md:text-3xl shadow-2xl"
              >
                {currentSlide.price}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="mt-6 flex flex-wrap items-center gap-3.5"
            >
              {currentSlide.dishData ? (
                <>
                  <button
                    onClick={() => handleAddToCart(currentSlide.dishData)}
                    className="btn-primary py-3.5 px-6 text-xs md:text-sm font-extrabold gap-2 shadow-xl hover:scale-105 transition-transform"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Basket
                  </button>

                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Assalam-o-Alaikum Bari's Biryani House!\nI want to order: ${currentSlide.title} (${currentSlide.price})`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp py-3.5 px-6 text-xs md:text-sm font-extrabold gap-2 shadow-xl animate-pulse-glow"
                  >
                    <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
                    </svg>
                    WhatsApp Instant
                  </a>
                </>
              ) : currentSlide.actionHref ? (
                <a
                  href={currentSlide.actionHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary py-3.5 px-6 text-xs md:text-sm font-extrabold gap-2 shadow-xl hover:scale-105 transition-transform"
                >
                  {currentSlide.isVideo ? <Play className="h-4 w-4 fill-current" /> : <Phone className="h-4 w-4" />}
                  {currentSlide.actionText || "Contact Kitchen"}
                </a>
              ) : (
                <a href={callHref} className="btn-primary py-3.5 px-6 text-xs md:text-sm font-extrabold gap-2 shadow-xl animate-ring-shake">
                  <Phone className="h-4 w-4" /> Call {business.phone}
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/50 hover:bg-[color:var(--primary)] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 opacity-75 group-hover:opacity-100 shadow-xl hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/50 hover:bg-[color:var(--primary)] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 opacity-75 group-hover:opacity-100 shadow-xl hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dynamic 4-Second Animated Progress Bar at Top */}
      {!isPaused && (
        <motion.div
          key={`timer-${currentIndex}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
          className="absolute top-0 left-0 right-0 h-1 bg-[color:var(--secondary)] origin-left z-30 shadow-[0_0_12px_rgba(224,168,58,0.8)]"
        />
      )}

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-400 ${
              idx === currentIndex
                ? "w-9 bg-[color:var(--secondary)] shadow-[0_0_10px_rgba(224,168,58,0.8)]"
                : "w-2.5 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
