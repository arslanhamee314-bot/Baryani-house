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
  autoPlayInterval = 4500,
  heightClass = "h-[440px] md:h-[500px]",
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
      scale: 0.95,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-3xl border border-[color:var(--border)] shadow-xl bg-slate-900 group`}
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex items-center"
        >
          {/* Background Image with Ken-Burns slow scale */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 ease-out"
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>

          {/* Content Card Overlay */}
          <div className="container-page relative z-10 text-white max-w-2xl px-6 md:px-12">
            {currentSlide.badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[color:var(--secondary)] text-slate-950 shadow-md mb-3"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{currentSlide.badge}</span>
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md"
            >
              {currentSlide.title}{" "}
              {currentSlide.titleUrdu && (
                <span className="text-[color:var(--secondary)] font-handwriting text-3xl md:text-5xl ml-2 font-normal">
                  {currentSlide.titleUrdu}
                </span>
              )}
            </motion.h2>

            {currentSlide.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-sm md:text-base text-gray-200 line-clamp-2 max-w-lg font-medium leading-relaxed"
              >
                {currentSlide.subtitle}
              </motion.p>
            )}

            {currentSlide.price && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-4 inline-block px-4 py-1.5 rounded-xl bg-amber-500/20 backdrop-blur border border-amber-400/40 text-amber-300 font-display font-bold text-xl md:text-2xl shadow-lg"
              >
                {currentSlide.price}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              {currentSlide.dishData ? (
                <>
                  <button
                    onClick={() => handleAddToCart(currentSlide.dishData)}
                    className="btn-primary py-3 px-5 text-xs md:text-sm font-bold gap-2 shadow-lg"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Basket
                  </button>

                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Assalam-o-Alaikum Bari's Biryani House!\nI want to order: ${currentSlide.title} (${currentSlide.price})`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp py-3 px-5 text-xs md:text-sm font-bold gap-2 shadow-lg"
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
                  className="btn-primary py-3 px-5 text-xs md:text-sm font-bold gap-2 shadow-lg"
                >
                  {currentSlide.isVideo ? <Play className="h-4 w-4 fill-current" /> : <Phone className="h-4 w-4" />}
                  {currentSlide.actionText || "Contact Kitchen"}
                </a>
              ) : (
                <a href={callHref} className="btn-primary py-3 px-5 text-xs md:text-sm font-bold gap-2 shadow-lg">
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
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur transition-all opacity-80 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur transition-all opacity-80 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-[color:var(--secondary)] shadow-md" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
