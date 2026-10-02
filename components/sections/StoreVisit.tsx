import { Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { storeConfig } from "@/data/store";

/** "Visite nossa loja": endereço, horário, WhatsApp e mapa. */
export function StoreVisit() {
  const { address, hours, hoursFallback, whatsapp } = storeConfig;

  return (
    <section id="loja" aria-labelledby="loja-titulo" className="section-y bg-surface">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow text-muted">Loja física</p>
          <h2 id="loja-titulo" className="font-display text-title mt-3 text-balance">
            Visite nossa loja
          </h2>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            <div className="flex gap-4 py-5">
              <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div>
                <dt className="sr-only">Endereço</dt>
                <dd>
                  <p className="font-semibold">{address.line1}</p>
                  <p className="text-muted">{address.line2}</p>
                </dd>
              </div>
            </div>

            <div className="flex gap-4 py-5">
              <Clock className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div>
                <dt className="sr-only">Horário de funcionamento</dt>
                <dd>
                  {hours.length > 0 ? (
                    <ul>
                      {hours.map((entry) => (
                        <li key={entry.days}>
                          <span className="font-semibold">{entry.days}</span>{" "}
                          <span className="text-muted">
                            {entry.opens} às {entry.closes}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">{hoursFallback}</p>
                  )}
                </dd>
              </div>
            </div>

            <div className="flex gap-4 py-5">
              <WhatsAppIcon className="mt-0.5 size-5 shrink-0" />
              <div>
                <dt className="sr-only">WhatsApp</dt>
                <dd>
                  <WhatsAppLink className="font-semibold underline-offset-4 hover:underline">
                    {whatsapp.display}
                  </WhatsAppLink>
                  <p className="text-muted">Dúvidas, pedidos e disponibilidade.</p>
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ size: "lg" })}
            >
              Abrir no Google Maps
            </a>
            <WhatsAppLink
              message="Olá! Quero saber como chegar na loja e o horário de hoje."
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Como chegar
            </WhatsAppLink>
          </div>
        </div>

        <div className="reveal relative aspect-4/3 overflow-hidden rounded-xs bg-tile lg:aspect-auto lg:h-[32rem]">
          <iframe
            src={address.mapsEmbedUrl}
            title={`Mapa: ${address.full}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0 grayscale-[0.85] contrast-[1.05]"
          />
        </div>
      </div>
    </section>
  );
}
