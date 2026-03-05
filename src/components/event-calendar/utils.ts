import type { TimeSlot, CalendarEvent, NormalizedCalendarEvent } from './types'

/** Generates time slots from start to end hour, every slotDurationMinutes */
export function buildTimeSlots (
  startHour: number,
  endHour: number,
  slotDurationMinutes: number = 60
): TimeSlot[] {
  const slots: TimeSlot[] = []
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDurationMinutes) {
      const isLastHour = hour === endHour - 1
      const wouldExceedHour = minute + slotDurationMinutes > 60
      if (isLastHour && wouldExceedHour) break
      slots.push({
        label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        hour,
        minute,
      })
    }
  }
  return slots
}

/** Parse "HH:mm" to total minutes from midnight */
export function parseTimeToMinutes (timeStr: string): number {
  const { hour, minute } = getHourAndMinute(timeStr)
  return hour * 60 + minute
}

export function getHourAndMinute (time: string | number): { hour: number, minute: number } {
  const [hour, minute = 0] = time.toString().trim().split(typeof time === 'number' ? '.' : ':').map(Number)

  if (Number.isNaN(hour) || Number.isNaN(minute)) return { hour: 0, minute: 0 }

  return { hour, minute }
}

/** Slot duration in minutes from the first two time slots */
export function getSlotDurationMinutes (timeSlots: TimeSlot[]): number {
  if (timeSlots.length < 2) return 60
  const firstSlotStartMinutes = timeSlots[0].hour * 60 + timeSlots[0].minute
  const secondSlotStartMinutes = timeSlots[1].hour * 60 + timeSlots[1].minute
  return secondSlotStartMinutes - firstSlotStartMinutes
}

/**
 * Normalize an event to slot indices and optional minute offset.
 * Uses startTime and durationMinutes (defaults to one slot) to compute startSlotIndex, spanSlots, offsetMinutes.
 */
export function normalizeCalendarEvent (
  event: CalendarEvent,
  timeSlots: TimeSlot[]
): NormalizedCalendarEvent {
  const slotDurationMinutes = getSlotDurationMinutes(timeSlots)
  const durationMinutes = Math.max(
    0,
    event.durationMinutes ?? slotDurationMinutes
  )

  const startMinutes = parseTimeToMinutes(event.startTime)
  const firstSlotStartMinutes = timeSlots[0].hour * 60 + timeSlots[0].minute
  const minutesFromGridStart = Math.max(0, startMinutes - firstSlotStartMinutes)
  const startSlotIndex = Math.min(
    timeSlots.length - 1,
    Math.floor(minutesFromGridStart / slotDurationMinutes)
  )
  const offsetMinutes = minutesFromGridStart - startSlotIndex * slotDurationMinutes
  const spanSlots = Math.ceil((offsetMinutes + durationMinutes) / slotDurationMinutes) || 1

  return {
    id: event.id,
    dayKey: event.dayKey,
    startTime: event.startTime,
    title: event.title,
    description: event.description,
    startSlotIndex,
    spanSlots,
    offsetMinutes: offsetMinutes % slotDurationMinutes,
    durationMinutes,
  }
}
