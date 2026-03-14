import type { Event } from './type';
import { request } from '../utils/request';

const UPCOMING_EVENTS_API = '/api/upcoming-events';

export async function fetchUpcomingEvents(): Promise<Event[]> {
  const response = await request<Event[]>(UPCOMING_EVENTS_API);

  return response;
}
