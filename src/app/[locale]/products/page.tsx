import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { CataloguesList } from "@/components/CataloguesList";

export default async function ProductsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.products;
  const isAr = locale === "ar";
  const arrow = isAr ? "ArrowLeft" : "ArrowRight";

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} bgImage="/images/products_hero.png" />

      {/* CATEGORIES */}
      <Section size="md">
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {t.categoriesSection.eyebrow}
          </span>
          <SectionHeader
            title={t.categoriesSection.title}
            subtitle={t.categoriesSection.subtitle}
          />
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {t.categories.map((cat, idx) => {
            const getProductBgImage = (id: string) => {
              switch (id) {
                case "concrete-admixtures":
                  return "/images/exposed_aggregate.png";
                case "waterproofing":
                  return "/images/polished_concrete.png";
                case "industrial-flooring":
                  return "/images/terrazzo_floor.png";
                case "repair-grouting":
                  return "/images/concrete_construction.png";
                case "custom-solutions":
                  return "/images/stamped_concrete.png";
                default:
                  return "/images/polished_concrete.png";
              }
            };
            
            return (
              <div
                key={cat.id}
                className={`ui-card group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-all duration-300 hover:border-[var(--color-accent-green)]/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent-green)]/5 ${
                  idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                {/* Dynamic Background Image Texture on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 scale-100 group-hover:opacity-10 group-hover:scale-108 transition-all duration-1000 pointer-events-none z-0"
                  style={{
                    backgroundImage: `url(${getProductBgImage(cat.id)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-[var(--color-surface)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

                <div className="absolute -end-16 -top-16 w-48 h-48 rounded-full bg-[var(--color-accent)]/5 blur-3xl pointer-events-none z-0" />

                <div className="relative flex items-start justify-between gap-4 z-10">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-bg)] text-[var(--color-accent)] transition-all duration-300 group-hover:bg-[var(--color-accent-soft)] group-hover:-translate-y-0.5">
                    <Icon name={cat.icon as IconName} size={20} />
                  </div>
                  <span className="text-xs font-mono text-[var(--color-fg-subtle)]">
                    {String(idx + 1).padStart(2, "0")} / {String(t.categories.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-display relative mt-6 text-2xl font-medium md:text-3xl z-10 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {cat.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)] md:text-base z-10">
                  {cat.description}
                </p>

                <ul className="relative mt-6 flex flex-wrap gap-2 z-10">
                  {cat.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/80 px-3 py-1 text-xs text-[var(--color-fg-muted)]"
                    >
                      {it}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] opacity-90 z-10">
                  {dict.common.explore}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    <Icon name={arrow} size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* TECHNICAL DOCUMENTS CTA */}
      <Section size="md">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-accent)]/20 bg-gradient-to-br from-[var(--color-surface-elevated)] via-[var(--color-surface)] to-[var(--color-surface)] p-8 md:p-14">
          <div className="absolute end-0 top-0 w-1/2 h-full pointer-events-none">
            <div className="absolute -end-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
          </div>
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Icon name="Beaker" size={24} />
              </div>
              <h2 className="text-display mt-6 text-3xl font-medium md:text-5xl">
                {t.techDocs.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)]">
                {t.techDocs.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-self-end">
              <Button
                href="mailto:Sales2@firstsystem.sa"
                size="lg"
                trailingIcon={arrow}
                external
              >
                {t.techDocs.primary}
              </Button>
              <Button href="#catalogues-section" variant="secondary" size="lg">
                {t.techDocs.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* CATALOGUES SECTION */}
      <Section id="catalogues-section" size="md" className="border-t border-[var(--color-border)]">
        <div className="flex flex-col items-start gap-4 mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {locale === "en" ? "TECHNICAL RESOURCES" : "الموارد الفنية"}
          </span>
          <SectionHeader
            title={dict.catalogues.title}
            subtitle={dict.catalogues.description}
          />
        </div>

        <CataloguesList locale={locale} dict={dict} />
      </Section>
    </>
  );
}
