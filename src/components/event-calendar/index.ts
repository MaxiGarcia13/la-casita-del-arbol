export { DEFAULT_DAYS } from './constants';

export { default as EventCalendar } from './event-calendar.astro';
export type * from './types';
export {
  buildTimeSlots,
  getHourAndMinute,
  getSlotDurationMinutes,
  normalizeCalendarEvent,
  parseTimeToMinutes,
} from './utils';
