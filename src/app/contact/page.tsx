import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { SampleRequestForm } from "@/components/SampleRequestForm";

export default async function ContactPage() {
  const locale = "en";
  const dict = getDictionary(locale);
  const t = dict.contact;

  const getMapLink = (city: string) => {
    const c = city.toLowerCase();
    if (c.includes("riyadh") || c.includes("رياض")) {
      return "https://www.google.com/maps/search/?api=1&query=Al-Qairawan+District+Riyadh+Saudi+Arabia";
    }
    if (c.includes("jeddah") || c.includes("جدة")) {
      return "https://www.google.com/maps/search/?api=1&query=King+Abdulaziz+Road+Jeddah+Saudi+Arabia";
    }
    if (c.includes("dammam") || c.includes("دمام")) {
      return "https://www.google.com/maps/search/?api=1&query=Second+Industrial+City+Dammam+Saudi+Arabia";
    }
    return "https://maps.google.com";
  };

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        body={t.hero.body}
        bgImage="/images/contact_hero.png"
      />

      <Section size="md">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* OFFICES */}
          <div className="lg:col-span-5 space-y-4">
            {t.offices.map((office, idx) => (
              <article
                key={idx}
                className={`ui-card relative overflow-hidden rounded-2xl border bg-[var(--color-surface)] p-6 ${
                  office.type === "headquarters"
                    ? "border-[var(--color-accent)]/30"
                    : "border-[var(--color-border)]"
                }`}
              >
                {office.type === "headquarters" && (
                  <div className="absolute -end-16 -top-16 w-40 h-40 rounded-full bg-[var(--color-accent)]/10 blur-3xl pointer-events-none" />
                )}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative">
                  <div className="flex-1">
                    <div className="relative flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`grid h-11 w-11 place-items-center rounded-xl ${
                            office.type === "headquarters"
                              ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                              : "bg-[var(--color-bg)] text-[var(--color-fg-muted)]"
                          }`}
                        >
                          <Icon name="Building" size={20} />
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                            {office.badge}
                          </div>
                          <h3 className="mt-1 text-xl font-semibold">{office.city}</h3>
                        </div>
                      </div>
                    </div>

                    <ul className="relative mt-5 space-y-3 text-sm text-[var(--color-fg-muted)]">
                      <li className="flex items-start gap-3">
                        <Icon
                          name="MapPin"
                          size={14}
                          className="mt-0.5 text-[var(--color-accent)] shrink-0"
                        />
                        <span>{office.address}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon
                          name="Phone"
                          size={14}
                          className="mt-0.5 text-[var(--color-accent)] shrink-0"
                        />
                        <a
                          href={office.phone.href}
                          className="hover:text-[var(--color-fg)] transition"
                          dir="ltr"
                        >
                          {office.phone.display}
                        </a>
                      </li>
                      {office.email && (
                        <li className="flex items-start gap-3">
                          <Icon
                            name="Mail"
                            size={14}
                            className="mt-0.5 text-[var(--color-accent)] shrink-0"
                          />
                          <a
                            href={office.email.href}
                            className="hover:text-[var(--color-fg)] transition"
                            dir="ltr"
                          >
                            {office.email.display}
                          </a>
                        </li>
                      )}
                      <li className="flex items-start gap-3">
                        <Icon
                          name="Clock"
                          size={14}
                          className="mt-0.5 text-[var(--color-accent)] shrink-0"
                        />
                        <span>{office.hours}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Miniature SVG Map of KSA showing specific office location */}
                  <a
                    href={getMapLink(office.city)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-card block w-full sm:w-28 h-36 sm:h-28 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 relative overflow-hidden group/map transition-all duration-300 hover:border-[var(--color-accent)]/55 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
                    title={locale === "ar" ? "افتح الموقع في خرائط جوجل" : "Open location in Google Maps"}
                  >
                    <div className="absolute inset-0 hero-grid-bg opacity-30 pointer-events-none" />
                    <svg viewBox="0 0 400 400" className="w-full h-full transition-transform duration-500 group-hover/map:scale-105" fill="none">
                      {/* KSA outline */}
                      <path
                        d="M120 80 L300 70 L340 100 L350 160 L320 220 L300 280 L260 320 L200 340 L150 320 L110 280 L80 220 L70 160 L90 110 Z"
                        stroke="var(--color-border-strong)"
                        strokeWidth="2.5"
                        fill="rgba(0, 189, 58, 0.02)"
                      />
                      {/* Riyadh dot */}
                      {office.city === "Riyadh" || office.city === "الرياض" ? (
                        <g>
                          <circle cx="240" cy="200" r="22" fill="var(--color-accent)" opacity="0.15">
                            <animate attributeName="r" values="22;35;22" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="240" cy="200" r="10" fill="var(--color-accent)" />
                        </g>
                      ) : (
                        <circle cx="240" cy="200" r="5" fill="var(--color-border-strong)" opacity="0.5" />
                      )}
                      
                      {/* Jeddah dot */}
                      {office.city === "Jeddah" || office.city === "جدة" ? (
                        <g>
                          <circle cx="140" cy="220" r="20" fill="var(--color-accent)" opacity="0.15">
                            <animate attributeName="r" values="20;32;20" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="140" cy="220" r="9" fill="var(--color-accent)" />
                        </g>
                      ) : (
                        <circle cx="140" cy="220" r="5" fill="var(--color-border-strong)" opacity="0.5" />
                      )}

                      {/* Dammam dot */}
                      {office.city === "Dammam" || office.city === "الدمام" ? (
                        <g>
                          <circle cx="310" cy="170" r="20" fill="var(--color-accent)" opacity="0.15">
                            <animate attributeName="r" values="20;32;20" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="310" cy="170" r="9" fill="var(--color-accent)" />
                        </g>
                      ) : (
                        <circle cx="310" cy="170" r="5" fill="var(--color-border-strong)" opacity="0.5" />
                      )}
                    </svg>
                  </a>
                </div>
              </article>
            ))}

            <a
              href={t.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-card flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[#25d366]/40 hover:bg-[var(--color-surface-elevated)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#25d366]/10 text-[#25d366]">
                <Icon name="MessageCircle" size={20} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{t.whatsapp.label}</div>
                <div className="text-xs text-[var(--color-fg-subtle)]" dir="ltr">
                  +966 56 944 4664
                </div>
              </div>
              <Icon
                name={locale === "ar" ? "ArrowLeft" : "ArrowRight"}
                size={16}
                className="text-[var(--color-fg-subtle)]"
              />
            </a>
          </div>

          {/* FORM */}
          <div className="lg:col-span-7">
            <SampleRequestForm dict={dict} variant="contact" />
          </div>
        </div>
      </Section>

      {/* REGIONAL PRESENCE */}
      <Section size="md" className="border-t border-[var(--color-border)]">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              <span className="h-px w-6 bg-[var(--color-accent)]" />
              {locale === "ar" ? "خريطة الحضور" : "Coverage Map"}
            </span>
            <h2 className="text-display mt-4 text-3xl font-medium md:text-5xl">
              {t.network.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)]">
              {t.network.body}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="ui-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <Icon
                  name="Truck"
                  size={20}
                  className="text-[var(--color-accent)]"
                />
                <div className="mt-3 text-2xl font-semibold">24h</div>
                <div className="text-xs text-[var(--color-fg-muted)]">
                  {locale === "ar" ? "تسليم سريع" : "Express delivery"}
                </div>
              </div>
              <div className="ui-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <Icon
                  name="Building"
                  size={20}
                  className="text-[var(--color-accent)]"
                />
                <div className="mt-3 text-2xl font-semibold">3</div>
                <div className="text-xs text-[var(--color-fg-muted)]">
                  {locale === "ar" ? "مكاتب إقليمية" : "Regional offices"}
                </div>
              </div>
              <div className="ui-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <Icon
                  name="Globe"
                  size={20}
                  className="text-[var(--color-accent)]"
                />
                <div className="mt-3 text-2xl font-semibold">KSA</div>
                <div className="text-xs text-[var(--color-fg-muted)]">
                  {locale === "ar" ? "تغطية وطنية" : "Nationwide"}
                </div>
              </div>
            </div>
          </div>

          {/* SVG MAP */}
          <div className="ui-card relative h-80 md:h-96 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              {/* Stylized KSA outline */}
              <path
                d="M120 80 L300 70 L340 100 L350 160 L320 220 L300 280 L260 320 L200 340 L150 320 L110 280 L80 220 L70 160 L90 110 Z"
                stroke="var(--color-border-strong)"
                strokeWidth="1.5"
                fill="rgba(0, 189, 58, 0.04)"
              />
              {/* Riyadh */}
              <g>
                <circle cx="240" cy="200" r="14" fill="var(--color-accent)" opacity="0.2">
                  <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="240" cy="200" r="6" fill="var(--color-accent)" />
                <text x="252" y="205" fill="var(--color-fg)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
                  Riyadh
                </text>
              </g>
              {/* Jeddah */}
              <g>
                <circle cx="140" cy="220" r="10" fill="var(--color-accent)" opacity="0.2">
                  <animate attributeName="r" values="10;18;10" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="140" cy="220" r="5" fill="var(--color-accent)" />
                <text x="92" y="225" fill="var(--color-fg)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
                  Jeddah
                </text>
              </g>
              {/* Dammam */}
              <g>
                <circle cx="310" cy="170" r="10" fill="var(--color-accent)" opacity="0.2">
                  <animate attributeName="r" values="10;18;10" dur="2.5s" begin="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="310" cy="170" r="5" fill="var(--color-accent)" />
                <text x="322" y="175" fill="var(--color-fg)" fontSize="12" fontWeight="600" fontFamily="var(--font-display)">
                  Dammam
                </text>
              </g>
              {/* Connecting lines */}
              <line x1="240" y1="200" x2="140" y2="220" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
              <line x1="240" y1="200" x2="310" y2="170" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
            </svg>
          </div>
        </div>
      </Section>
    </>
  );
}
