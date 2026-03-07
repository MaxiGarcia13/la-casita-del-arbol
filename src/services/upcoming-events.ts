import type { UpcomingEvent } from '../components/event-calendar/types';

const UPCOMING_EVENTS_API = '/api/upcoming-events.json';

export async function fetchUpcomingEvents(): Promise<UpcomingEvent[]> {
  const res = await fetch(UPCOMING_EVENTS_API);
  if (!res.ok)
    throw new Error('Failed to fetch upcoming events');
  return res.json();
}
