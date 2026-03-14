import type { Event } from '../../services/type';
import { useEffect, useState } from 'react';
import { fetchUpcomingEvents } from '../../services/upcoming-events';
import { FetchErrorAlert } from '../fetch-error-alert';
import { UpcomingEventCard } from './upcoming-event-card';
import { UpcomingEventLoader } from './upcoming-event-loader';

export default function UpcomingEventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpcomingEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <UpcomingEventLoader rows={3} />;
  }

  if (error) {
    return (
      <FetchErrorAlert
        message="No se pudieron cargar los eventos."
        error={error}
      />
    );
  }

  return (
    <ul
      className="flex flex-col gap-4"
      aria-label="Próximos eventos y novedades"
    >
      {
        events.length > 0
          ? (
              events.map(event => (
                <UpcomingEventCard key={event.id} event={event} />
              ))
            )
          : (
              <p className="text-center text-neutral-500 mb-10">No hay eventos próximos</p>
            )
      }
    </ul>
  );
}
