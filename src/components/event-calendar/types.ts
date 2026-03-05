/**
 * Event calendar shared types and defaults.
 */

export interface CalendarDay {
  key: string
  label: string
  fullName?: string
}

export interface TimeSlot {
  label: string
  hour: number
  minute: number
}

export interface CalendarEvent {
  id: string
  dayKey: string
  startSlotIndex: number
  spanSlots?: number
  title: string
  description?: string
}

export interface EventCalendarProps {
  days?: CalendarDay[]
  timeSlots?: TimeSlot[]
  events?: CalendarEvent[]
  /** CSS class for the root container */
  class?: string
}

/** Spanish weekdays: Lunes → Domingo, abbreviated for header */
export const DEFAULT_DAYS: CalendarDay[] = [
  { key: 'lun', label: 'L', fullName: 'Lunes' },
  { key: 'mar', label: 'M', fullName: 'Martes' },
  { key: 'mie', label: 'M', fullName: 'Miércoles' },
  { key: 'jue', label: 'J', fullName: 'Jueves' },
  { key: 'vie', label: 'V', fullName: 'Viernes' },
  { key: 'sab', label: 'S', fullName: 'Sábado' },
  { key: 'dom', label: 'D', fullName: 'Domingo' },
]
