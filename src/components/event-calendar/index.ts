/**
 * Event calendar public API.
 * Import the main component: import EventCalendar from '@/components/event-calendar/EventCalendar.astro'
 */

export type { CalendarDay, TimeSlot, CalendarEvent, EventCalendarProps } from './types'
export { DEFAULT_DAYS } from './types'
export { buildTimeSlots } from './utils'
export { default as EventCalendar } from './EventCalendar.astro'
