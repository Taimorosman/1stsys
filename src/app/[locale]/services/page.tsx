import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeader } from "@/components/Section";
import { Icon, type IconName } from "@/components/Icon";
import { SampleRequestForm } from "@/components/SampleRequestForm";

export default async function ServicesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.services;
  const isAr = locale === "ar";
  const arrow = isAr ? "ArrowLeft" : "ArrowRight";

  const getServiceBgImage = (id: string) => {
    if (id === "flooring" || id === "epoxy" || id === "pu") {
      return "/images/polished_concrete.png";
    }
    if (id === "raw-materials") {
      return "/images/exposed_aggregate.png";
    }
    if (id === "finishing") {
      return "/images/terrazzo_floor.png";
    }
    if (id === "concrete-repair" || id === "insulation") {
      return "/images/concrete_construction.png";
    }
    if (id === "adhesives" || id === "joint-fillers") {
      return "/images/stamped_concrete.png";
    }
    return "/images/polished_concrete.png"; // fallback
  };

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} bgImage="/images/services_hero.png" />

      {/* SERVICES GRID */}
      <Section size="md">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s, idx) => (
            <div
              key={s.id}
              className="ui-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-accent)]/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5"
            >
              {/* Animated Concrete Background Texture - 30% normal / 65% hover */}
              <div 
                className="card-bg-concrete absolute inset-0 opacity-30 scale-100 group-hover:opacity-65 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0"
                style={{
                  backgroundImage: `url(${getServiceBgImage(s.id)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-soft)]/30 via-transparent to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none z-0" />
              
              <div className="absolute -end-10 -top-10 w-32 h-32 rounded-full bg-[var(--color-accent)]/0 blur-2xl transition group-hover:bg-[var(--color-accent)]/10 pointer-events-none z-0" />
              
              <div className="relative flex items-start justify-between z-10">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-bg)] text-[var(--color-accent)] transition-all duration-300 group-hover:bg-[var(--color-accent-soft)] group-hover:-translate-y-1">
                  <Icon name={s.icon as IconName} size={20} />
                </div>
                <span className="text-xs font-mono text-[var(--color-fg-subtle)]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="relative mt-6 text-xl font-semibold z-10 transition-colors duration-300 group-hover:text-[var(--color-accent)]">{s.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)] z-10">
                {s.description}
              </p>
              <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] z-10">
                {dict.common.learnMore}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name={arrow} size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section size="md" className="border-t border-[var(--color-border)]">
        <SectionHeader
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, idx) => {
            const processImages = [
              "process_consultation.png",
              "process_specification.png",
              "process_supply.png",
              "process_support.png"
            ];
            const bgImage = `/images/${processImages[idx] || "digital_building_wireframe.png"}`;

            return (
              <div
                key={step.step}
                className="ui-card group/process relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-accent)]/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5"
              >
                {/* Digital building blueprint background texture */}
                <div 
                  className="card-bg-blueprint absolute inset-0 opacity-[0.08] group-hover/process:opacity-[0.22] scale-100 group-hover/process:scale-108 transition-all duration-700 pointer-events-none z-0"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-0 group-hover/process:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-display text-5xl font-medium text-[var(--color-accent)]/30 transition-colors duration-300 group-hover/process:text-[var(--color-accent)]/60">
                      {step.step}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold transition-colors duration-300 group-hover/process:text-[var(--color-accent)]">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SAMPLE REQUEST FORM */}
      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={isAr ? "اطلب عينة" : "Order a sample"}
              title={t.sampleForm.title}
              subtitle={t.sampleForm.subtitle}
            />
          </div>
          <div className="lg:col-span-7">
            <SampleRequestForm dict={dict} variant="services" />
          </div>
        </div>
      </Section>
    </>
  );
}
