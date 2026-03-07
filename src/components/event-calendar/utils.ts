import type { CalendarEvent, NormalizedCalendarEvent, TimeSlot } from './types';
import { DEFAULT_DAYS } from './constants';

/** JS getDay(): 0=Sun, 1=Mon, … 6=Sat → keys: lun, mar, … dom */
const DAY_INDEX_TO_KEY = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'] as const;

function parseStartDate(startDate: string): Date {
  const d = new Date(startDate);
  if (Number.isNaN(d.getTime()))
    throw new Error(`Invalid startDate: ${startDate}`);
  return d;
}

/** Derive weekday key from startDate (e.g. "2025-03-04T10:15:00" → "mar") */
export function getDayKeyFromStartDate(startDate: string): string {
  return DAY_INDEX_TO_KEY[parseStartDate(startDate).getDay()];
}

/** Derive "HH:mm" from startDate */
export function getStartTimeFromStartDate(startDate: string): string {
  const d = parseStartDate(startDate);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

/** Format startDate as a single date string, e.g. "martes a las 10:15" */
export function formatEventDateTime(startDate: string): string {
  const dayKey = getDayKeyFromStartDate(startDate);
  const dayName = DEFAULT_DAYS.find(d => d.key === dayKey)?.fullName?.toLowerCase() ?? dayKey;
  const time = getStartTimeFromStartDate(startDate);

  return `${dayName} a las ${time} (fecha: ${startDate})`;
}

/** Generates time slots from start to end hour, every slotDurationMinutes */
export function buildTimeSlots(
  startHour: number,
  endHour: number,
  slotDurationMinutes: number = 60,
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDurationMinutes) {
      const isLastHour = hour === endHour - 1;
      const wouldExceedHour = minute + slotDurationMinutes > 60;
      if (isLastHour && wouldExceedHour)
        break;
      slots.push({
        label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        hour,
        minute,
      });
    }
  }
  return slots;
}

/** Parse "HH:mm" to total minutes from midnight */
export function parseTimeToMinutes(timeStr: string): number {
  const { hour, minute } = getHourAndMinute(timeStr);
  return hour * 60 + minute;
}

export function getHourAndMinute(time: string | number): { hour: number; minute: number } {
  const [hour, minute = 0] = time.toString().trim().split(typeof time === 'number' ? '.' : ':').map(Number);

  if (Number.isNaN(hour) || Number.isNaN(minute))
    return { hour: 0, minute: 0 };

  return { hour, minute };
}

/** Slot duration in minutes from the first two time slots */
export function getSlotDurationMinutes(timeSlots: TimeSlot[]): number {
  if (timeSlots.length < 2)
    return 60;
  const firstSlotStartMinutes = timeSlots[0].hour * 60 + timeSlots[0].minute;
  const secondSlotStartMinutes = timeSlots[1].hour * 60 + timeSlots[1].minute;
  return secondSlotStartMinutes - firstSlotStartMinutes;
}

/**
 * Normalize an event to slot indices and optional minute offset.
 * Derives dayKey and start time from startDate; uses durationMinutes (defaults to one slot) for spanSlots, offsetMinutes.
 */
export function normalizeCalendarEvent(
  event: CalendarEvent,
  timeSlots: TimeSlot[],
): NormalizedCalendarEvent {
  const slotDurationMinutes = getSlotDurationMinutes(timeSlots);
  const durationMinutes = Math.max(
    0,
    event.durationMinutes ?? slotDurationMinutes,
  );

  const startTime = getStartTimeFromStartDate(event.startDate);
  const startMinutes = parseTimeToMinutes(startTime);
  const dayKey = getDayKeyFromStartDate(event.startDate);
  const firstSlotStartMinutes = timeSlots[0].hour * 60 + timeSlots[0].minute;
  const minutesFromGridStart = Math.max(0, startMinutes - firstSlotStartMinutes);
  const startSlotIndex = Math.min(
    timeSlots.length - 1,
    Math.floor(minutesFromGridStart / slotDurationMinutes),
  );
  const offsetMinutes = minutesFromGridStart - startSlotIndex * slotDurationMinutes;
  const spanSlots = Math.ceil((offsetMinutes + durationMinutes) / slotDurationMinutes) || 1;

  return {
    ...event,
    dayKey,
    startSlotIndex,
    spanSlots,
    offsetMinutes: offsetMinutes % slotDurationMinutes,
    durationMinutes,
  };
}
