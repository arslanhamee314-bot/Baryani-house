import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Flame, HandHeart, Leaf, MapPin, Phone, Utensils } from "lucide-react";
import aboutStoreMain from "@/assets/about-store-main.jpg";
import aboutStoreInset from "@/assets/about-store-inset.jpg";
import interiorImg from "@/assets/gallery-interior-1.jpg";
import spicesImg from "@/assets/gallery-spices.jpg";
import servingImg from "@/assets/gallery-serving.jpg";
import { PageHero, PageLayout, PlaceholderChip, SectionHeader } from "@/components/site/PageLayout";
import { Reveal } from "@/components/site/Reveal";
import { business, callHref, directionsHref } from "@/lib/business";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Biryani House | Local Biryani in Jauharabad" },
      { name: "description", content: "A neighbourhood biryani kitchen in Main Bazar, Jauharabad. Slow-cooked biryani, warm hospitality, dine-in and takeaway daily." },
      { property: "og:title", content: "About Biryani House | Local Biryani in Jauharabad" },
      { property: "og:description", content: "A neighbourhood biryani kitchen in Main Bazar, Jauharabad. Warm hospitality, dine-in and takeaway daily." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Our Story"
        title="A neighbourhood biryani kitchen in Main Bazar"
        subtitle="We keep it simple — cook biryani well, welcome people warmly, and be here every day."
      />

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="relative">
              <img src={aboutStoreMain} alt="Bari's Biryani & Pizza Storefront" loading="lazy" className="rounded-2xl w-full h-[460px] object-cover border border-[color:var(--border)] shadow-xl" />
              <div className="hidden sm:block absolute -bottom-6 -right-4 md:-right-6 w-36 h-28 sm:w-44 sm:h-32 md:w-52 md:h-36 rounded-2xl overflow-hidden border-3 border-white dark:border-zinc-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] z-20 hover:scale-105 transition-transform duration-300">
                <img src={aboutStoreInset} alt="Bari's Biryani & Pizza Interior" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader eyebrow="Local Kitchen" title={<>Cooking for the <span className="text-[color:var(--primary)]">Main Bazar</span> community</>} />
            <p className="mt-5 text-[color:var(--muted-foreground)] leading-relaxed">
              Biryani House sits on Main Bazar Road in Jauharabad — an easy stop for lunch, a family dinner, or a quick takeaway on the way home. Our menu is focused: biryani cooked on dum, karahi from the wok, fresh naan and simple sides.
            </p>
            <div className="mt-6 rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <PlaceholderChip>Owner story — editable</PlaceholderChip>
              <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
                [Add a short, verified paragraph from the owner: how the restaurant started, what makes the biryani recipe theirs, and what they want guests to feel when they visit. Keep it warm and honest — don't invent claims.]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--surface)] border-y border-[color:var(--border)]">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <SectionHeader center eyebrow="What we care about" title="Small things we don't compromise on" />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Flame, title: "Cooked on dum", body: "Layered biryani with whole spices, cooked slowly for depth of flavour." },
              { icon: Leaf, title: "Fresh every day", body: "We cook in daily batches — nothing sits around waiting to be served." },
              { icon: HandHeart, title: "Warm service", body: "Familiar faces, patient staff, and a welcome that feels local." },
              { icon: Utensils, title: "Focused menu", body: "We do a short menu properly instead of a long one halfway." },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="card-surface p-6 h-full">
                  <div className="h-11 w-11 rounded-xl bg-[color:var(--primary)]/8 text-[color:var(--primary)] grid place-items-center"><p.icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-display text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--muted-foreground)] leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
          <Reveal>
            <img src={servingImg} alt="Fresh biryani being served" loading="lazy" className="rounded-2xl w-full h-[360px] object-cover border border-[color:var(--border)]" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader eyebrow="Visit us" title="We're open every day" />
            <ul className="mt-6 space-y-3 text-[color:var(--foreground)]">
              <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-[color:var(--primary)]" />{business.hoursLabel}</li>
              <li className="flex items-center gap-3">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-[color:var(--primary)] transition-colors group"
                  title="Open location on Google Maps"
                >
                  <MapPin className="h-5 w-5 text-[color:var(--primary)] group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline underline-offset-4 decoration-[color:var(--primary)]/40">{business.address.line1}, {business.address.line2}</span>
                </a>
              </li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-[color:var(--primary)]" /><a href={callHref} className="hover:text-[color:var(--primary)]">{business.phone}</a></li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={callHref} className="btn-primary"><Phone className="h-4 w-4" /> Call to Order</a>
              <a href={directionsHref} target="_blank" rel="noreferrer" className="btn-ghost"><MapPin className="h-4 w-4" /> Get Directions</a>
              <Link to="/menu" className="btn-ghost">See the menu</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
