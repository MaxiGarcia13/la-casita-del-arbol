export interface CalendarDay {
  key: string;
  label: string;
  fullName?: string;
  /** Short day name for display (e.g. "Lun", "Mar"). */
  shortName?: string;
  /** Day of month (1–31) for display. */
  dayOfMonth?: number;
}

export interface TimeSlot {
  label: string;
  hour: number;
  minute: number;
}

export interface CalendarEvent {
  id: string;
  startDate: string;
  durationMinutes?: number;
  title: string;
  description?: string;
  type?: 'lesson' | 'event' | 'other';
  totalSlots?: number;
  slotsOccupied?: number;
}

export interface NormalizedCalendarEvent extends CalendarEvent {
  dayKey: string;
  startSlotIndex: number;
  spanSlots: number;
  /** Minutes from slot start to event start (0 when start is on slot boundary). */
  offsetMinutes?: number;
  /** Total duration in minutes (for height when offset is used). */
  durationMinutes: number;
}

export interface EventCalendarProps {
  days?: CalendarDay[];
  timeSlots?: TimeSlot[];
  events?: CalendarEvent[];
  /** CSS class for the root container */
  class?: string;
}

export interface CalendarCellEvent extends CalendarEvent {
  spanSlots?: number;
  offsetMinutes?: number;
  durationMinutes?: number;
}

/** Event announced for the future (eventos section). Not tied to the calendar grid. */
export interface UpcomingEvent {
  id?: string;
  title: string;
  description?: string;
  /** Display date, e.g. "Próximamente", "Marzo 2025", "Sábado 15 de abril" */
  dateLabel: string;
  /** Call-to-action label, e.g. "Consultar" or "Inscribirme" */
  ctaLabel?: string;
  /** Prefilled WhatsApp message; defaults to asking about the event title */
  ctaMessage?: string;
}
