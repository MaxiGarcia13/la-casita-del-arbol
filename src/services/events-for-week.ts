import type { CalendarEvent } from '../components/event-calendar/types';
import { formatWeekParam, getWeekStart } from '../utils/date';

const SAMPLE_EVENTS_API = '/api/sample-events.json';

export async function fetchEventsForWeek(week: Date): Promise<CalendarEvent[]> {
  const res = await fetch(
    `${SAMPLE_EVENTS_API}?week=${formatWeekParam(getWeekStart(week))}`,
  );
  if (!res.ok)
    throw new Error('Failed to fetch events');
  return res.json();
}
