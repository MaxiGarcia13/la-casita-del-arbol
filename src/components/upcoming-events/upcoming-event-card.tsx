import type { Event } from '../../services/type';
import { formatEventDateTime } from '../event-calendar';
import { WhatsappLinkButton } from '../whatsapp-link-button';

export function UpcomingEventCard({ event }: { event: Event }) {
  const {
    title,
    description = '',
    startDate,
  } = event;
  const ctaLabel = 'Consultar';
  const message = `Hola, me gustaría más información sobre: ${title}`;
  const dateLabel = formatEventDateTime(startDate ?? '');

  return (
    <article className="pb-4">
      <header>

        <h3 className="text-lg font-semibold wrap-break-word">
          {title}
        </h3>
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
