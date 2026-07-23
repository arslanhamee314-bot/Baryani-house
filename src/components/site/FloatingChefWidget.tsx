import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import chefMascot from "@/assets/chef-mascot.png";
import { business, whatsappHref } from "@/lib/business";

const GREETINGS = [
  { urdu: "خوش آمدید! گرم گرم بریانی واٹس ایپ پر آرڈر کریں 🍲", eng: "Order Fresh Biryani via WhatsApp!" },
  { urdu: "باری باری یعنی بریانی باری باری! 🍗", eng: "Bari's Special Pizza & Fast Food 🍕" },
  { urdu: "جوہر آباد میں فری ہوم ڈیلیوری! 🛵", eng: "Free Home Delivery in Jauharabad!" },
  { urdu: "ڈائریکٹ واٹس ایپ پر آرڈر کیجیے 💚", eng: "Click to chat on WhatsApp: +92 300 2797932" },
] as const;

export function FloatingChefWidget() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Dynamic Animated Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-auto mb-2 max-w-[210px] sm:max-w-[250px] bg-white dark:bg-zinc-900 border-2 border-[#25D366] rounded-2xl p-3 shadow-2xl relative text-right text-xs"
        >
          {/* Speech Bubble Arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-zinc-900 border-b-2 border-r-2 border-[#25D366] transform rotate-45" />

          <p className="font-bold text-[color:var(--primary)] leading-snug">
            {GREETINGS[index].urdu}
          </p>
          <p className="text-[10px] text-[color:var(--muted-foreground)] mt-1 font-medium">
            {GREETINGS[index].eng}
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366] hover:underline"
          >
            <span>Order via WhatsApp &rarr;</span>
          </a>
        </motion.div>
      </AnimatePresence>

      {/* 3D Chef Character + WhatsApp Badge */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto relative group block active:scale-95 transition-transform"
        title="Chat with Bari's Biryani House Chef on WhatsApp (+92 300 2797932)"
      >
        {/* Glowing WhatsApp Badge floating on top of chef */}
        <div className="absolute -top-3 -left-1 z-20 h-9 w-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
          </svg>
        </div>

        {/* 3D Chef Avatar with Bari's Logo on shirt */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-tr from-[color:var(--primary)] via-[color:var(--secondary)] to-[#25D366] p-1 shadow-2xl group-hover:scale-105 transition-transform">
          <img
            src={chefMascot}
            alt="Bari's Biryani Master Chef"
            className="w-full h-full object-cover rounded-full bg-white"
          />
        </div>
      </a>
    </aside>
  );
}
