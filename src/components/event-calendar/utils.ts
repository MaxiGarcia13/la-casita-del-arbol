import type { TimeSlot } from './types'

/** Generates time slots from start to end hour, every slotDurationMinutes */
export function buildTimeSlots (
  startHour: number,
  endHour: number,
  slotDurationMinutes: number = 60
): TimeSlot[] {
  const slots: TimeSlot[] = []
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += slotDurationMinutes) {
      if (h === endHour - 1 && m + slotDurationMinutes > 60) break
      slots.push({
        label: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
        hour: h,
        minute: m,
      })
    }
  }
  return slots
}
