import { storeConfig } from "@/data/store";

/** "Por que Prime?": institucional curto, só com fatos (ver data/store.ts). */
export function WhyPrime() {
  return (
    <section aria-labelledby="porque-titulo" className="section-y">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-muted">Por que Prime?</p>
          <h2 id="porque-titulo" className="font-display text-title mt-3 text-balance">
            Suplementação sem complicação.
          </h2>
        </div>

        <dl className="reveal border-t border-ink">
          {storeConfig.differentials.map((item) => (
            <div
              key={item.title}
              className="grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-8"
            >
              <dt className="font-display text-xl md:text-2xl">{item.title}</dt>
              <dd className="text-pretty text-muted">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
