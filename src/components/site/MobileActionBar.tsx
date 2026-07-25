import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone, Utensils } from "lucide-react";
import { callHref, directionsHref, whatsappHref } from "@/lib/business";

export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[color:var(--surface)]/95 backdrop-blur-md border-t border-[color:var(--border)] shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.25)] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="grid grid-cols-4 items-center">
        {/* 1. Call Button */}
        <a
          href={callHref}
          aria-label="Call Kitchen"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[50px] py-2 text-[11px] font-bold text-[color:var(--primary)] active:bg-[color:var(--muted)]"
        >
          <Phone className="h-5 w-5 animate-ring-shake" />
          <span>Call Us</span>
        </a>

        {/* 2. WhatsApp Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Order"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[50px] py-2 text-[11px] font-bold text-[#25D366] active:bg-[color:var(--muted)] border-l border-[color:var(--border)]"
        >
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping" />
            <MessageCircle className="h-5 w-5 fill-[#25D366]/20" />
          </div>
          <span>WhatsApp</span>
        </a>

        {/* 3. Directions Button */}
        <a
          href={directionsHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Get Directions"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[50px] py-2 text-[11px] font-bold text-[color:var(--secondary-hover)] active:bg-[color:var(--muted)] border-l border-[color:var(--border)]"
        >
          <MapPin className="h-5 w-5" />
          <span>Directions</span>
        </a>

        {/* 4. Menu Link */}
        <Link
          to="/menu"
          aria-label="View Menu"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[50px] py-2 text-[11px] font-bold text-[color:var(--foreground)] active:bg-[color:var(--muted)] border-l border-[color:var(--border)]"
        >
          <Utensils className="h-5 w-5 text-[color:var(--primary)]" />
          <span>Menu</span>
        </Link>
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
