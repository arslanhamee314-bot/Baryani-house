import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Phone, X } from "lucide-react";
import { business, callHref } from "@/lib/business";

export type DishModalItem = {
  name: string;
  nameUrdu?: string;
  price: string;
  unit?: string;
  description?: string;
  image?: string;
};

type Props = {
  item: DishModalItem | null;
  onClose: () => void;
};

export function MobileDishModal({ item, onClose }: Props) {
  if (!item) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Bari's Biryani House!\nI want to order: ${item.name} (${item.price})` + (currentUrl ? `\nFrom website: ${currentUrl}` : "")
  );
  const whatsappDishUrl = `https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet Modal Container */}
          <motion.div
            className="relative w-full max-w-lg bg-[color:var(--surface)] rounded-t-[2rem] sm:rounded-3xl overflow-hidden shadow-2xl z-10 border border-[color:var(--border)] max-h-[90vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            {/* Grab Bar for Mobile */}
            <div className="w-12 h-1.5 bg-black/15 dark:bg-white/20 rounded-full mx-auto my-3 shrink-0" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur hover:bg-black/60 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto flex-1">
              {item.image && (
                <div className="relative aspect-[16/10] bg-black/5 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.nameUrdu && (
                    <div className="absolute top-4 left-4 bg-[color:var(--primary)] text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-md">
                      {item.nameUrdu}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur text-white px-4 py-1.5 rounded-2xl font-display font-bold text-lg border border-white/10 shadow-lg">
                    {item.price} {item.unit && <span className="text-xs font-normal text-white/80">{item.unit}</span>}
                  </div>
                </div>
              )}

              <div className="p-6">
                <h2 className="font-display text-2xl font-bold text-[color:var(--foreground)]">
                  {item.name}
                </h2>

                {item.description && (
                  <p className="mt-3 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
                    {item.description}
                  </p>
                )}

                <div className="mt-5 p-3.5 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-[color:var(--foreground)]">
                    <Clock className="h-4 w-4 text-[color:var(--secondary)]" /> Freshly prepared on order
                  </span>
                  <span className="flex items-center gap-1.5 text-[color:var(--muted-foreground)]">
                    <MapPin className="h-4 w-4 text-[color:var(--primary)]" /> Main Bazar Jauharabad
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-5 bg-[color:var(--background)] border-t border-[color:var(--border)] flex items-center gap-3 shrink-0">
              <a
                href={whatsappDishUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp flex-1 py-3 text-sm font-semibold gap-2 shadow-lg"
              >
                <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
                </svg>
                Order via WhatsApp
              </a>

              <a
                href={callHref}
                className="btn-primary py-3 px-5 text-sm font-semibold gap-2 shadow-lg shrink-0"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
