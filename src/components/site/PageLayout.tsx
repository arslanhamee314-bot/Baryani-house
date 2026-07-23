import type { ReactNode } from "react";
import logoMark from "@/assets/logo-mark.png";
import { AnnouncementBar } from "./AnnouncementBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileActionBar } from "./MobileActionBar";
import { FloatingChefWidget } from "./FloatingChefWidget";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      <SiteFooter />
      <MobileActionBar />
      <FloatingChefWidget />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="mt-3 font-display text-[color:var(--foreground)]">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-[color:var(--muted-foreground)] text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PlaceholderChip({ children = "Editable placeholder" }: { children?: ReactNode }) {
  return <span className="placeholder-chip">✎ {children}</span>;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color:var(--background)] via-[color:var(--surface)] to-[color:var(--background)]" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--secondary)]/10 blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[color:var(--primary)]/10 blur-3xl -z-10" />
      {/* Watermark Logo */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 object-contain opacity-[0.16] pointer-events-none select-none -z-10"
      />
      <div className="container-page py-16 md:py-24 text-center max-w-3xl mx-auto relative z-10">
        {eyebrow && <div className="eyebrow justify-center">{eyebrow}</div>}
        <h1 className="mt-4 font-display text-[color:var(--foreground)]">{title}</h1>
        {subtitle && (
          <p className="mt-5 text-lg text-[color:var(--muted-foreground)] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
