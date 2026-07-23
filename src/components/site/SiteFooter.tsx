import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { business, callHref, directionsHref, whatsappHref } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-[color:var(--border)] bg-[color:var(--foreground)] text-[color:var(--background)] overflow-hidden">
      {/* Logo Watermark Background */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute -right-16 -bottom-16 h-96 w-96 object-contain opacity-[0.16] pointer-events-none select-none z-0"
      />
      <div className="container-page py-14 grid gap-10 md:grid-cols-4 relative z-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logoMark} alt={business.name} className="h-14 w-14 bg-white rounded-xl p-1 shadow-md object-contain" />
            <div>
              <div className="font-display text-xl font-bold text-[color:var(--saffron)] leading-tight">
                {business.name}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/70 mt-0.5">
                Jauharabad
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            A local biryani kitchen in Main Bazar — dine in, take away, or call ahead.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href={business.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook Page" className="h-9 w-9 grid place-items-center rounded-full border border-white/20 bg-white/10 hover:bg-[color:var(--primary)] text-white transition" title="Follow on Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-full border border-white/15 hover:bg-white/10 transition">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-[color:var(--saffron)] uppercase tracking-widest">Visit</div>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 hover:text-[color:var(--saffron)] transition-colors group"
                title="Open location on Google Maps"
              >
                <MapPin className="h-4 w-4 mt-0.5 text-[color:var(--saffron)] shrink-0 group-hover:scale-110 transition-transform" />
                <span>{business.address.line1}<br />{business.address.line2}, {business.address.region}</span>
              </a>
            </li>
            <li><a href={callHref} className="flex items-start gap-2 hover:text-white"><Phone className="h-4 w-4 mt-0.5 text-[color:var(--saffron)] shrink-0" />{business.phone}</a></li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-[color:var(--saffron)] shrink-0" />{business.hoursLabel}</li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-[color:var(--saffron)] uppercase tracking-widest">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/menu", "Menu"],
              ["/about", "About"],
              ["/gallery", "Gallery"],
              ["/reviews", "Reviews"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/80 hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-[color:var(--saffron)] uppercase tracking-widest">Take action</div>
          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp justify-start text-sm"
              title="Order on WhatsApp Chat"
            >
              <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
              </svg>
              WhatsApp Order
            </a>
            <a href={callHref} className="btn-primary justify-start text-sm">
              <Phone className="h-4 w-4" /> Call to Order
            </a>
            <a href={directionsHref} target="_blank" rel="noreferrer" className="btn-ghost justify-start text-sm border-white/20 text-white hover:bg-white/10">
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span>
          <a
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[color:var(--saffron)] transition-colors underline decoration-white/20 underline-offset-4"
            title="Open location on Google Maps"
          >
            {business.address.line1}, {business.address.line2} · {business.address.region}, Pakistan
          </a>
        </div>
      </div>
    </footer>
  );
}
