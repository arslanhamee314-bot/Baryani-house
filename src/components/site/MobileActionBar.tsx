import { MapPin, MessageCircle, Phone } from "lucide-react";
import { callHref, directionsHref, whatsappHref } from "@/lib/business";

export function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[color:var(--surface)]/95 backdrop-blur border-t border-[color:var(--border)] shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-3">
        <a href={callHref} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-[color:var(--primary)] active:bg-[color:var(--muted)]">
          <Phone className="h-5 w-5" />
          Call
        </a>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-[color:var(--accent)] active:bg-[color:var(--muted)] border-x border-[color:var(--border)]">
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
        <a href={directionsHref} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-[color:var(--secondary-hover)] active:bg-[color:var(--muted)]">
          <MapPin className="h-5 w-5" />
          Directions
        </a>
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
