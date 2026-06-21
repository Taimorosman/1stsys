import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.about;
  const isAr = locale === "ar";
  const arrow = isAr ? "ArrowLeft" : "ArrowRight";

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} bgImage="/images/about_hero.png" />

      {/* STATS BAND */}
      <Section size="sm" className="-mt-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {t.stats.map((s, i) => {
            const statImages = [
              "stat_years.png",
              "stat_systems.png",
              "stat_projects.png",
              "stat_exclusive.png"
            ];
            const bgImage = `/images/${statImages[i] || "digital_building_wireframe.png"}`;

            return (
              <div
                key={i}
                className="ui-card group/stat relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
              >
                {/* Digital building blueprint background texture */}
                <div 
                  className="card-bg-blueprint-stat absolute inset-0 opacity-[0.03] group-hover/stat:opacity-[0.12] scale-100 group-hover/stat:scale-105 transition-all duration-700 pointer-events-none z-0"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="relative z-10">
                  <div className="flex items-baseline gap-2">
                    <div className="text-display text-3xl font-medium md:text-4xl">
                      {s.value}
                    </div>
                    {s.unit && (
                      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-fg-subtle)]">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-fg-muted)]">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* STORY */}
      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={t.story.eyebrow} title={t.story.title} />
            <div className="relative mt-8">
              {/* Outer soft aura glow */}
              <div className="absolute -inset-2 rounded-[24px] bg-gradient-to-tr from-[var(--color-accent)]/15 to-[var(--color-accent)]/2 blur-xl opacity-75 animate-halo pointer-events-none parallax-glow-1" />
              <div className="ui-card relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl aspect-[4/3] group animate-float-slow parallax-element">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src="/images/concrete_construction.png"
                  alt={isAr ? "كيماويات البناء والديكور السعودية" : "Saudi Decorative and Construction Chemicals"}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            {t.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section size="md" className="border-t border-[var(--color-border)]">
        <SectionHeader
          eyebrow={t.values.eyebrow}
          title={t.values.title}
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 max-w-6xl">
          {t.values.items.map((v, idx) => {
            const valueImages = [
              "value_quality.png",
              "value_professionalism.png",
              "value_innovation.png",
              "value_commitment.png",
              "value_customer_focus.png"
            ];
            const bgImage = `/images/${valueImages[idx] || "digital_building_wireframe.png"}`;

            return (
              <Card key={v.title} interactive className="text-center group/card">
                {/* Digital building blueprint background texture */}
                <div 
                  className="card-bg-blueprint absolute inset-0 opacity-[0.03] group-hover/card:opacity-[0.18] scale-100 group-hover/card:scale-108 transition-all duration-700 pointer-events-none z-0"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <Icon name={v.icon as IconName} size={22} />
                </div>
                <h3 className="mt-5 text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-fg-muted)]">
                  {v.description}
                </p>
              </div>
            </Card>
          );
        })}
        </div>
      </Section>

      {/* CTA */}
      <Section size="md">
        <div className="ui-card relative overflow-hidden rounded-3xl border border-[var(--color-accent-green)]/30 bg-[var(--color-surface)] p-8 md:p-14 text-center group">
          <div 
            className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] scale-100 group-hover:scale-105 transition-all duration-1000 pointer-events-none z-0"
            style={{
              backgroundImage: `url(/images/polished_concrete.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent pointer-events-none z-0" />
          <div className="absolute inset-0 hero-grid-bg pointer-events-none opacity-40 z-0" />
          <div className="relative z-10">
            <h2 className="text-display text-3xl font-medium md:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
              {t.cta.body}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={`/${locale}/contact`} size="lg" trailingIcon={arrow}>
                {t.cta.primary}
              </Button>
              <Button href={`/${locale}/products`} variant="secondary" size="lg">
                {t.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
