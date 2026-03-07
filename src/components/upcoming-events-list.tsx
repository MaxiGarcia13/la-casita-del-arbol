import type { UpcomingEvent } from './event-calendar/types';
import { useEffect, useState } from 'react';
import { WhatsappLinkButton } from './whatsapp-link-button';

const UPCOMING_EVENTS_API = '/api/upcoming-events.json';

async function fetchUpcomingEvents(): Promise<UpcomingEvent[]> {
  const res = await fetch(UPCOMING_EVENTS_API);
  if (!res.ok)
    throw new Error('Failed to fetch upcoming events');
  return res.json();
}

function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
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

export default function UpcomingEventsList() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchUpcomingEvents()
      .then((data) => {
        if (!cancelled)
          setEvents(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Error');
      })
      .finally(() => {
        if (!cancelled)
          setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <ul
        className="flex flex-col gap-4"
        aria-label="Próximos eventos y novedades"
        aria-busy
      >
        <li className="rounded-lg border border-charcoal/20 bg-surface p-4 animate-pulse h-32" />
        <li className="rounded-lg border border-charcoal/20 bg-surface p-4 animate-pulse h-32" />
      </ul>
    );
  }

  if (error) {
    return (
      <p className="text-charcoal/80 text-sm" role="alert">
        No se pudieron cargar los eventos.
        {' '}
        {error}
      </p>
    );
  }

  return (
    <ul
      className="flex flex-col gap-4"
      aria-label="Próximos eventos y novedades"
    >
      {events.map((event, index) => (
        <li key={event.id ?? event.title ?? index}>
          <UpcomingEventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
