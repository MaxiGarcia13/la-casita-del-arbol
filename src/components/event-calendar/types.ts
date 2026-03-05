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
  startTime: string
  durationMinutes?: number
  title: string
  description?: string
}

export interface NormalizedCalendarEvent extends CalendarEvent {
  startSlotIndex: number
  spanSlots: number
  /** Minutes from slot start to event start (0 when start is on slot boundary). */
  offsetMinutes?: number
  /** Total duration in minutes (for height when offset is used). */
  durationMinutes: number
}

export interface EventCalendarProps {
  days?: CalendarDay[]
  timeSlots?: TimeSlot[]
  events?: CalendarEvent[]
  /** CSS class for the root container */
  class?: string
}

export interface CalendarCellEvent {
  id: string
  title: string
  description?: string
  spanSlots?: number
  offsetMinutes?: number
  durationMinutes?: number
}

export const DEFAULT_DAYS: CalendarDay[] = [
  { key: 'lun', label: 'L', fullName: 'Lunes' },
  { key: 'mar', label: 'M', fullName: 'Martes' },
  { key: 'mie', label: 'M', fullName: 'Miércoles' },
  { key: 'jue', label: 'J', fullName: 'Jueves' },
  { key: 'vie', label: 'V', fullName: 'Viernes' },
  { key: 'sab', label: 'S', fullName: 'Sábado' },
  { key: 'dom', label: 'D', fullName: 'Domingo' },
]
