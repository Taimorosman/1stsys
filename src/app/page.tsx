import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon, type IconName } from "@/components/Icon";
import { NewsletterForm } from "@/components/NewsletterForm";
import { InteractiveHero } from "@/components/InteractiveHero";
import Link from "next/link";

export default async function HomePage() {
  const locale = "en";
  const dict = getDictionary(locale);
  const t = dict.home;
  const isAr = false;
  const arrowIcon = "ArrowRight";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
        <div className="absolute -top-40 end-0 w-[700px] h-[700px] rounded-full bg-[var(--color-accent)]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -start-20 w-[500px] h-[500px] rounded-full bg-[var(--color-accent-2)]/10 blur-3xl pointer-events-none" />

        <div className="container-page relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-6">
              <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                {t.hero.eyebrow}
              </span>

              <h1 className="text-display animate-fade-up delay-100 mt-6 text-5xl font-medium md:text-7xl lg:text-[80px] lg:leading-[0.95]">
                {t.hero.title}
                <br />
                <span className="text-gradient-gold">{t.hero.titleAccent}</span>
              </h1>

              <p className="animate-fade-up delay-200 mt-6 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
                {t.hero.subtitle}
              </p>

              <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-3">
                <Button
                  href="/services"
                  size="lg"
                  trailingIcon={arrowIcon}
                >
                  {t.hero.ctaPrimary}
                </Button>
                <Button href="/products" variant="secondary" size="lg">
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="animate-fade-in delay-300">
                <InteractiveHero
                  isAr={isAr}
                  altText={isAr ? "النظام الأول - حلول البناء المبتكرة" : "The First System - Innovative Construction Solutions"}
                />
              </div>
            </div>
          </div>

          {/* Stats band */}
          <div className="animate-fade-up delay-500 mt-16 grid grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-10 md:mt-20 md:grid-cols-4 md:gap-8">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <div className="text-display text-3xl font-medium text-[var(--color-fg)] md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-[var(--color-fg-muted)] md:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO / ABOUT */}
      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={t.intro.eyebrow}
              title={t.intro.title}
              subtitle={t.intro.body}
            />
            <ul className="mt-8 space-y-3">
              {t.intro.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] shrink-0">
                    <Icon name="Check" size={12} />
                  </span>
                  <span className="text-[var(--color-fg-muted)]">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/about" variant="secondary" trailingIcon={arrowIcon}>
                {dict.common.learnMore}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {t.values.items.map((v, idx) => {
                const valueImages = [
                  "value_quality.png",
                  "value_professionalism.png",
                  "value_innovation.png",
                  "value_commitment.png",
                  "value_customer_focus.png"
                ];
                const bgImage = `/images/${valueImages[idx] || "digital_building_wireframe.png"}?v=4`;

                return (
                  <Card
                    interactive
                    key={v.title}
                    className={`group/card ${idx % 3 === 0 ? "row-span-2" : ""}`}
                  >
                    {/* Digital building blueprint background texture */}
                    <div 
                      className="card-bg-blueprint absolute inset-0 opacity-[0.08] group-hover/card:opacity-[0.20] scale-100 group-hover/card:scale-108 transition-all duration-700 pointer-events-none z-0"
                      style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                        <Icon name={v.icon as IconName} size={20} />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {v.description}
                    </p>
                  </div>
                </Card>
              );
            })}
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICES GRID */}
      <Section size="md" className="border-t border-[var(--color-border)]">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {dict.services.items.map((s) => {
            const getServiceBgImage = (id: string) => {
              switch (id) {
                case "adhesives":
                  return "/images/adhesives_grouts.png";
                case "flooring":
                  return "/images/flooring_systems.png";
                case "epoxy":
                  return "/images/epoxy_systems.png";
                case "pu":
                  return "/images/polyurethane.png";
                case "concrete-repair":
                  return "/images/concrete_repair.png";
                case "protection":
                  return "/images/concrete_protection.png";
                case "insulation":
                  return "/images/insulation.png";
                case "joint-fillers":
                  return "/images/joint_fillers.png";
                case "finishing":
                  return "/images/finishing_materials.png";
                case "raw-materials":
                  return "/images/raw_materials.png";
                default:
                  return "/images/flooring_systems.png";
              }
            };

            return (
              <Link
                href={`/services#${s.id}`}
                key={s.id}
                className="ui-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:border-[var(--color-accent)]/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5"
              >
                {/* Dynamic Background Image Texture - Visible by default, scales and clears on hover */}
                <div 
                  className="card-bg-concrete absolute inset-0 opacity-15 scale-100 group-hover:opacity-65 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0"
                  style={{
                    backgroundImage: `url(${getServiceBgImage(s.id)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                {/* Legibility protecting gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-soft)]/30 via-transparent to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-bg)] text-[var(--color-accent)] transition-all duration-300 group-hover:bg-[var(--color-accent-soft)] group-hover:-translate-y-0.5 z-10">
                  <Icon name={s.icon as IconName} size={18} />
                </div>
                <h3 className="relative mt-5 text-base font-semibold leading-tight z-10 transition-colors duration-300 group-hover:text-[var(--color-accent)]">{s.title}</h3>
                <p className="relative mt-1.5 text-xs leading-relaxed text-[var(--color-fg-muted)] z-10">
                  {s.description}
                </p>
                <div className="relative mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
                  {dict.common.learnMore}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                    <Icon name={arrowIcon} size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/services" variant="secondary" trailingIcon={arrowIcon}>
            {dict.common.viewAll}
          </Button>
        </div>
      </Section>

      {/* SAMPLE CTA */}
      <Section size="md">
        <div className="ui-card relative overflow-hidden rounded-3xl border border-[var(--color-accent-green)]/30 bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-surface)] p-8 md:p-14 group">
          <div 
            className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.07] scale-100 group-hover:scale-105 transition-all duration-1000 pointer-events-none z-0"
            style={{
              backgroundImage: `url(/images/concrete_construction.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-elevated)]/90 via-[var(--color-surface)]/45 to-transparent pointer-events-none z-0" />
          <div className="absolute -end-32 -top-20 w-[400px] h-[400px] rounded-full bg-[var(--color-accent)]/15 blur-3xl pointer-events-none z-0" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center z-10">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                <span className="h-px w-6 bg-[var(--color-accent)]" />
                {t.sample.eyebrow}
              </span>
              <h2 className="text-display mt-4 text-3xl font-medium md:text-5xl">
                {t.sample.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)]">
                {t.sample.body}
              </p>
            </div>
            <div className="md:justify-self-end">
              <Button
                href="/contact"
                size="lg"
                trailingIcon={arrowIcon}
              >
                {t.sample.cta}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* PARTNERS */}
      <Section size="md" className="border-t border-[var(--color-border)] overflow-hidden">
        <SectionHeader
          eyebrow={t.partners.eyebrow}
          title={t.partners.title}
          subtitle={t.partners.subtitle}
        />
        
        <div className="mt-12 relative w-full overflow-hidden py-6 mask-image-horizontal" dir="ltr">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Track 1 */}
            <div className="flex gap-6 pr-6 shrink-0">
              {dict.brands.items.map((b) => {
                const getBrandBgImage = (id: string) => {
                  switch (id) {
                    case "ccc":
                      return "/images/polished_concrete.png";
                    case "rapidset":
                      return "/images/concrete_construction.png";
                    case "flake":
                      return "/images/terrazzo_floor.png";
                    case "bricform":
                      return "/images/stamped_concrete.png";
                    case "lythic":
                      return "/images/polished_concrete.png";
                    case "day1":
                      return "/images/exposed_aggregate.png";
                    default:
                      return "/images/polished_concrete.png";
                  }
                };

                return (
                  <div
                    key={b.id}
                    className="ui-card group relative overflow-hidden flex flex-col items-center justify-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-6 w-72 h-52 transition-all duration-300 hover:border-[var(--color-accent)]/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5"
                    style={{ borderRadius: '0 50% 0 50%' }}
                  >
                    {/* Background texture - visible by default, scales and clears on hover */}
                    <div 
                      className="card-bg-concrete absolute inset-0 opacity-15 scale-100 group-hover:opacity-65 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0"
                      style={{
                        backgroundImage: `url(${getBrandBgImage(b.id)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    {/* Legibility protecting gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-soft)]/30 via-transparent to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none z-0" />

                    <div className="text-display text-2xl font-bold text-[var(--color-fg)] transition-colors duration-300 group-hover:text-[var(--color-accent)] z-10 relative">
                      {b.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] text-center z-10 relative max-w-[85%] mx-auto whitespace-normal leading-normal">
                      {b.tagline}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Track 2 (Seamless loop duplicate) */}
            <div className="flex gap-6 pr-6 shrink-0" aria-hidden="true">
              {dict.brands.items.map((b) => {
                const getBrandBgImage = (id: string) => {
                  switch (id) {
                    case "ccc":
                      return "/images/polished_concrete.png";
                    case "rapidset":
                      return "/images/concrete_construction.png";
                    case "flake":
                      return "/images/terrazzo_floor.png";
                    case "bricform":
                      return "/images/stamped_concrete.png";
                    case "lythic":
                      return "/images/polished_concrete.png";
                    case "day1":
                      return "/images/exposed_aggregate.png";
                    default:
                      return "/images/polished_concrete.png";
                  }
                };

                return (
                  <div
                    key={`${b.id}-dup`}
                    className="ui-card group relative overflow-hidden flex flex-col items-center justify-center gap-2 border border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-6 w-72 h-52 transition-all duration-300 hover:border-[var(--color-accent)]/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5"
                    style={{ borderRadius: '0 50% 0 50%' }}
                  >
                    {/* Background texture - visible by default, scales and clears on hover */}
                    <div 
                      className="card-bg-concrete absolute inset-0 opacity-15 scale-100 group-hover:opacity-65 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0"
                      style={{
                        backgroundImage: `url(${getBrandBgImage(b.id)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    {/* Legibility protecting gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-soft)]/30 via-transparent to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none z-0" />

                    <div className="text-display text-2xl font-bold text-[var(--color-fg)] transition-colors duration-300 group-hover:text-[var(--color-accent)] z-10 relative">
                      {b.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] text-center z-10 relative max-w-[85%] mx-auto whitespace-normal leading-normal">
                      {b.tagline}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Section size="md">
        <div className="ui-card relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12 group">
          <div 
            className="absolute inset-0 opacity-[0.03] scale-100 transition-all duration-1000 pointer-events-none z-0"
            style={{
              backgroundImage: `url(/images/stamped_concrete.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent pointer-events-none z-0" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center z-10">
            <div>
              <h2 className="text-display text-2xl font-medium md:text-4xl">
                {t.newsletter.title}
              </h2>
              <p className="mt-4 max-w-md text-sm text-[var(--color-fg-muted)] md:text-base">
                {t.newsletter.body}
              </p>
            </div>
            <div className="md:justify-self-end w-full md:max-w-md">
              <NewsletterForm
                locale={locale}
                placeholder={t.newsletter.placeholder}
                cta={t.newsletter.cta}
                successText={dict.common.sent}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
