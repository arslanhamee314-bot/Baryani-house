import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  return (
    <aside className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end pointer-events-none">
      {/* Speech Bubble (Desktop/Tablet Only) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-auto mb-2 max-w-[250px] bg-white dark:bg-zinc-900 border-2 border-[#25D366] rounded-2xl p-3 shadow-2xl relative text-right text-xs"
        >
          {/* Dismiss Button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-zinc-800 text-white flex items-center justify-center shadow hover:bg-black transition-colors"
            title="Dismiss chef widget"
            aria-label="Dismiss widget"
          >
            <X className="h-3.5 w-3.5" />
          </button>

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

      {/* Chef Mascot Badge */}
      <div className="pointer-events-auto relative group">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="block active:scale-95 transition-transform"
          aria-label="Bari's Biryani House WhatsApp"
        >
          <div className="relative h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-gradient-to-tr from-[color:var(--primary)] via-[color:var(--secondary)] to-[#25D366] p-1 shadow-2xl group-hover:scale-105 transition-transform">
            <img
              src={chefMascot}
              alt="Bari's Biryani Master Chef"
              className="w-full h-full object-cover rounded-full bg-white"
              width={80}
              height={80}
            />
          </div>
        </a>
      </div>
    </aside>
  );
}
