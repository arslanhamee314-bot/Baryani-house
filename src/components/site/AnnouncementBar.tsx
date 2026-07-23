import { Clock, MapPin, Phone } from "lucide-react";
import { business, callHref } from "@/lib/business";

export function AnnouncementBar() {
  return (
    <div className="bg-[color:var(--foreground)] text-[color:var(--background)]/90 text-[13px]">
      <div className="container-page flex items-center justify-between gap-4 py-2">
        <div className="hidden sm:flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[color:var(--saffron)]" />
            {business.hoursLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[color:var(--saffron)]" />
            Main Bazar, Jauharabad
          </span>
        </div>
        <span className="sm:hidden inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[color:var(--saffron)]" />
          Open daily 8am–11pm
        </span>
        <a
          href={callHref}
          className="inline-flex items-center gap-1.5 font-semibold text-[color:var(--saffron)] hover:text-white transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          {business.phone}
        </a>
      </div>
    </div>
  );
}
