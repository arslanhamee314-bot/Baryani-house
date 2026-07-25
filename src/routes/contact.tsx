import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { PageLayout } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business, callHref, directionsHref, mapEmbedSrc, whatsappHref } from "@/lib/business";
import { HeroCarousel, type SlideItem } from "@/components/site/HeroCarousel";
import aboutStoreMain from "@/assets/about-store-main.jpg";
import aboutStoreInset from "@/assets/about-store-inset.jpg";
import heroImg from "@/assets/hero-biryani.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location | Biryani House Jauharabad" },
      { name: "description", content: "Call +92 300 2797932, get directions to Sarwar Shaheed Chowk, Main Bazar, Jauharabad, or send us a message. Open daily 8am–11pm." },
      { property: "og:title", content: "Contact & Location | Biryani House Jauharabad" },
      { property: "og:description", content: "Call, WhatsApp, or find us on Main Bazar Road, Jauharabad. Open daily 8am–11pm." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Status = "idle" | "sending" | "success" | "error";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  const contactSlides: SlideItem[] = [
    {
      id: "cont-1",
      title: `Call Us Direct: ${business.phone}`,
      titleUrdu: "فوری ارڈر فون پر کریں",
      subtitle: "One quick phone call for instant pickup or takeaway order preparation.",
      image: aboutStoreMain,
      badge: "📞 Quick Phone Order",
      actionText: `Call Kitchen (${business.phone})`,
      actionHref: callHref,
    },
    {
      id: "cont-2",
      title: "WhatsApp Catalog Order & Chat",
      titleUrdu: "واٹس ایپ آن لائن آرڈر",
      subtitle: "Send order message directly with automatic items, total price & address.",
      image: heroImg,
      badge: "💬 WhatsApp Catalog",
      actionText: "Send WhatsApp Order",
      actionHref: whatsappHref,
    },
    {
      id: "cont-3",
      title: "Sarwar Shaheed Chowk, Main Bazar",
      titleUrdu: "سرور شہید چوک جوہرآباد",
      subtitle: `${business.address.line1}, ${business.address.line2}. Open daily 8:00 AM – 11:00 PM.`,
      image: aboutStoreInset,
      badge: "📍 Visit Store",
      actionText: "Get Directions on Google Maps",
      actionHref: directionsHref,
    },
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") ?? "").toString();
    const phone = (data.get("phone") ?? "").toString();
    const message = (data.get("message") ?? "").toString();
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\n${message}`);
    window.location.href = `mailto:hello@biryanihouse.example?subject=${encodeURIComponent("Enquiry from website")}&body=${body}`;
    setTimeout(() => { setStatus("success"); form.reset(); }, 400);
  };

  return (
    <PageLayout>
      {/* Dynamic One-by-One Contact & Location Slideshow */}
      <section className="container-page pt-6 pb-4">
        <HeroCarousel slides={contactSlides} heightClass="h-[460px] md:h-[520px]" />
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal>
            <a href={callHref} className="card-surface p-6 block h-full">
              <div className="h-11 w-11 rounded-xl bg-[color:var(--primary)]/8 text-[color:var(--primary)] grid place-items-center"><Phone className="h-5 w-5" /></div>
              <div className="mt-4 text-sm text-[color:var(--muted-foreground)]">Tap to call</div>
              <div className="mt-1 font-display text-xl font-semibold text-[color:var(--foreground)]">{business.phone}</div>
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="card-surface p-6 block h-full">
              <div className="h-11 w-11 rounded-xl bg-[color:var(--accent)]/12 text-[color:var(--accent)] grid place-items-center"><MessageCircle className="h-5 w-5" /></div>
              <div className="mt-4 text-sm text-[color:var(--muted-foreground)]">Chat on WhatsApp</div>
              <div className="mt-1 font-display text-xl font-semibold text-[color:var(--foreground)]">Send a message</div>
              <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">[Update WhatsApp number in code]</div>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={directionsHref} target="_blank" rel="noreferrer" className="card-surface p-6 block h-full">
              <div className="h-11 w-11 rounded-xl bg-[color:var(--secondary)]/12 text-[color:var(--secondary-hover)] grid place-items-center"><MapPin className="h-5 w-5" /></div>
              <div className="mt-4 text-sm text-[color:var(--muted-foreground)]">Get directions</div>
              <div className="mt-1 font-display text-xl font-semibold text-[color:var(--foreground)]">Main Bazar Rd, Jauharabad</div>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <Reveal>
            <div className="card-surface p-6 md:p-8">
              <h2 className="font-display text-2xl">Send us a message</h2>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                Prefer to write? Fill this in and we'll get back to you.
              </p>
              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[color:var(--foreground)]">Your name</label>
                  <input id="name" name="name" required className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/40 focus:border-[color:var(--primary)]" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[color:var(--foreground)]">Phone number</label>
                  <input id="phone" name="phone" type="tel" required className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/40 focus:border-[color:var(--primary)]" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[color:var(--foreground)]">Message</label>
                  <textarea id="message" name="message" required rows={5} className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/40 focus:border-[color:var(--primary)]" />
                </div>
                <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-70">
                  {status === "sending" ? "Opening…" : <>Send message <Send className="h-4 w-4" /></>}
                </button>
                {status === "success" && (
                  <p className="text-sm text-[color:var(--accent)] font-medium">Thanks — your email app should have opened. If not, please call us at {business.phone}.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-[color:var(--destructive)] font-medium">Something went wrong. Please call us at {business.phone}.</p>
                )}
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[color:var(--border)] h-[340px] bg-[color:var(--surface)]">
                <iframe src={mapEmbedSrc} title="Biryani House location on Google Maps" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="card-surface p-6">
                <h3 className="font-display text-lg">Opening hours</h3>
                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
                    <div key={d} className="flex items-center justify-between">
                      <span className="text-[color:var(--foreground)]">{d}</span>
                      <span className="text-[color:var(--muted-foreground)]">8:00 – 23:00</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-[color:var(--muted-foreground)]"><Clock className="h-3.5 w-3.5" /> Same hours every day of the week</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
