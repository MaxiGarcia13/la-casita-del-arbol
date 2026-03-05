export type * from './types'

export { DEFAULT_DAYS } from './constants'
export { default as EventCalendar } from './event-calendar.astro'
export {
  buildTimeSlots,
  parseTimeToMinutes,
  getSlotDurationMinutes,
  normalizeCalendarEvent,
  getHourAndMinute
} from './utils'
