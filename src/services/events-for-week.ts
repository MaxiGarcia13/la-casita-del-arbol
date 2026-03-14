import type { Event } from './type';
import { formatWeekParam, getWeekStart } from '../utils/date';
import { request } from '../utils/request';

const EVENTS_API = '/api/events';

export async function fetchEventsForWeek(week: Date): Promise<Event[]> {
  try {
    const response = await request<Event[]>(EVENTS_API, {
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
