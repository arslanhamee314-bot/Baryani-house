import { Link } from "@tanstack/react-router";
import { Facebook, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoMark from "@/assets/logo-mark.png";
import { business, callHref, whatsappHref } from "@/lib/business";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[color:var(--background)]/90 backdrop-blur border-b border-[color:var(--border)] shadow-sm"
          : "bg-[color:var(--background)] border-b border-[color:var(--border)]"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3 group" aria-label={business.name}>
          <img
            src={logoMark}
            alt={business.name}
            className="h-12 w-12 object-contain rounded-xl bg-white p-1 border border-[color:var(--border)] shadow-sm group-hover:scale-105 transition-transform"
            width={48}
            height={48}
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold text-[color:var(--primary)]">
              {business.name}
            </span>
            <span className="text-[10px] tracking-[0.24em] uppercase text-[color:var(--muted-foreground)] mt-0.5 font-semibold">
              Jauharabad
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors"
              activeProps={{ className: "text-[color:var(--primary)] font-semibold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook Page"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white transition-colors"
            title="Follow Bari's Biryani & Pizza on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp hidden md:inline-flex text-sm py-2.5 px-4 gap-2"
            title="Order on WhatsApp Catalog"
          >
            <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.333 5.003L2 22l5.127-1.343c1.46.797 3.109 1.217 4.881 1.217 5.509 0 9.991-4.479 9.992-9.985 0-2.668-1.038-5.176-2.925-7.063C17.189 3.039 14.68 2 12.012 2zm5.727 14.417c-.244.684-1.205 1.31-1.688 1.365-.484.054-.954.267-3.155-.601-2.639-1.042-4.323-3.716-4.455-3.892-.132-.176-1.071-1.424-1.071-2.716 0-1.291.677-1.928.92-2.189.243-.26.531-.326.708-.326.177 0 .354.002.508.009.162.008.38-.061.595.454.22.527.749 1.823.815 1.956.066.133.11.288.022.464-.088.176-.133.287-.265.441-.132.155-.278.347-.397.466-.132.132-.27.276-.116.541.154.265.688 1.133 1.478 1.834 1.015.901 1.872 1.18 2.137 1.312.265.132.419.11.573-.066.155-.176.662-.772.839-1.037.177-.265.353-.221.596-.132.243.088 1.543.728 1.808.861.265.132.441.198.507.309.066.111.066.643-.178 1.327z"/>
            </svg>
            WhatsApp Order
          </a>
          <a href={callHref} className="btn-primary hidden sm:inline-flex text-sm py-2.5 px-4">
            <Phone className="h-4 w-4" />
            Call to Order
          </a>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--foreground)]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Touch Mobile Category Ribbon */}
      <div className="lg:hidden bg-[color:var(--surface)] border-t border-[color:var(--border)] px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth text-xs font-semibold">
        {[
          { label: "🔥 Specials", href: "/#specials" },
          { label: "🍗 Biryani & Pulao", href: "/menu" },
          { label: "🍕 Pizzas", href: "/menu" },
          { label: "🥘 Karahi & Broast", href: "/menu" },
          { label: "🍨 Desserts & Shakes", href: "/menu" },
        ].map((cat) => (
          <Link
            key={cat.label}
            to={cat.href}
            className="shrink-0 px-3 py-1.5 rounded-full bg-[color:var(--background)] text-[color:var(--foreground)] border border-[color:var(--border)] active:scale-95 hover:border-[color:var(--primary)]/50 transition-all shadow-2xs"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[color:var(--surface)] shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-[color:var(--border)]">
                <span className="font-display text-lg font-bold text-[color:var(--primary)]">
                  {business.name}
                </span>
                <button
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-[color:var(--muted)]"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col p-3">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3.5 rounded-lg text-base font-medium text-[color:var(--foreground)] hover:bg-[color:var(--muted)]"
                    activeProps={{ className: "text-[color:var(--primary)] bg-[color:var(--muted)]" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-5 border-t border-[color:var(--border)] flex flex-col gap-2.5">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent w-full justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white border-none gap-2"
                >
                  <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                  WhatsApp Order Catalog
                </a>
                <a href={callHref} className="btn-primary w-full justify-center">
                  <Phone className="h-4 w-4" />
                  Call to Order ({business.phone})
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
