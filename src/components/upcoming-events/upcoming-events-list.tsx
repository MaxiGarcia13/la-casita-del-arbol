import type { UpcomingEvent } from '../event-calendar/types';
import { useEffect, useState } from 'react';
import { fetchUpcomingEvents } from '../../services/upcoming-events';
import { UpcomingEventCard } from './upcoming-event-card';
import { UpcomingEventLoader } from './upcoming-event-loader';

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
    return <UpcomingEventLoader rows={2} />;
  }

  if (error) {
    return (
      <p className="text-charcoal/80 text-sm" role="alert">
        No se pudieron cargar los eventos.
        <br />
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
