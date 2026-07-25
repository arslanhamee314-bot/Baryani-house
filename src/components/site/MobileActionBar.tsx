import { MapPin, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { callHref, directionsHref, whatsappHref } from "@/lib/business";
import { useCart } from "@/context/CartContext";

export function MobileActionBar() {
  const { totalItemsCount, subtotal, setIsCartOpen } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[color:var(--surface)]/95 backdrop-blur-md border-t border-[color:var(--border)] shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.2)]">
      <div className="grid grid-cols-4 items-center">
        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-bold text-[color:var(--foreground)] active:bg-[color:var(--muted)] relative"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5 text-[color:var(--primary)]" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-amber-400 text-black text-[10px] font-extrabold shadow">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span>Basket {subtotal > 0 ? `(Rs. ${subtotal})` : ""}</span>
        </button>

        {/* WhatsApp Order Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-bold text-[#25D366] active:bg-[color:var(--muted)] border-l border-[color:var(--border)]"
        >
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping" />
            <MessageCircle className="h-5 w-5 fill-[#25D366]/20" />
          </div>
          <span>WhatsApp</span>
        </a>

        {/* Call Button */}
        <a
          href={callHref}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-bold text-[color:var(--primary)] active:bg-[color:var(--muted)] border-l border-[color:var(--border)]"
        >
          <Phone className="h-5 w-5 animate-ring-shake" />
          <span>Call Us</span>
        </a>

        {/* Directions Button */}
        <a
          href={directionsHref}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-bold text-[color:var(--secondary-hover)] active:bg-[color:var(--muted)] border-l border-[color:var(--border)]"
        >
          <MapPin className="h-5 w-5" />
          <span>Location</span>
        </a>
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
