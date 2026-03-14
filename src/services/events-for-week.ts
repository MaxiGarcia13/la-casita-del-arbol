import type { CalendarEvent } from '../components/event-calendar/types';
import { formatWeekParam, getWeekStart } from '../utils/date';
import { request } from '../utils/request';

const EVENTS_API = '/api/events';

export async function fetchEventsForWeek(week: Date): Promise<CalendarEvent[]> {
  try {
    const response = await request<CalendarEvent[]>(EVENTS_API, {
      params: {
        week: formatWeekParam(getWeekStart(week)),
      },
    });

    return response;
  }
  catch (error) {
    throw error instanceof Error ? error : new Error('Failed to fetch events');
  }
}
