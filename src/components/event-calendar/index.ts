export type { CalendarDay, TimeSlot, CalendarEvent, NormalizedCalendarEvent, EventCalendarProps } from './types'
export { DEFAULT_DAYS } from './types'
export { default as EventCalendar } from './EventCalendar.astro'
export {
  buildTimeSlots,
  parseTimeToMinutes,
  getSlotDurationMinutes,
  normalizeCalendarEvent,
  getHourAndMinute
} from './utils'
