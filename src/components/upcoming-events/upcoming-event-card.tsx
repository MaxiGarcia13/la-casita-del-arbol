import type { UpcomingEvent } from '../event-calendar/types';
import { WhatsappLinkButton } from '../whatsapp-link-button';

export function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
  const {
    title,
    description = '',
    dateLabel,
    ctaLabel = 'Consultar',
    ctaMessage,
  } = event;
  const message
    = ctaMessage ?? `Hola, me gustaría más información sobre: ${title}`;

  return (
    <article className="rounded-lg border border-charcoal/20 bg-surface p-4 text-charcoal transition-shadow hover:shadow-md">
      <header>
        <h3 className="text-lg font-semibold wrap-break-word">{title}</h3>
        <p className="mt-1 text-sm text-charcoal/80">{dateLabel}</p>
      </header>
      {description.trim()
        ? (
            <p className="mt-3 line-clamp-3 text-sm wrap-break-word">
              {description.trim()}
            </p>
          )
        : null}
      <footer className="mt-4">
        <WhatsappLinkButton message={message} variant="filled">
          <span>{ctaLabel}</span>
          <span aria-hidden="true">→</span>
        </WhatsappLinkButton>
      </footer>
    </article>
  );
}
