import type { CalendarEvent, NormalizedCalendarEvent, TimeSlot } from './types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addWeeks,
  formatMonthYear,
  formatWeekParam,
  getStartTimeFromStartDate,
  getWeekStart,
  parseWeekFromUrl,
} from '../../utils/date';
import Skeleton from '../Skeleton';
import CalendarCell from './calendar-cell';
import {
  buildTimeSlots,
  buildWeekDays,
  filterEventsToWeek,
  getHourAndMinute,
  getSlotDurationMinutes,
  normalizeCalendarEvent,
} from './utils';
import WeekNav from './week-nav';

const SAMPLE_EVENTS_API = '/api/sample-events.json';

async function fetchEventsForWeek(week: Date): Promise<CalendarEvent[]> {
  const res = await fetch(
    `${SAMPLE_EVENTS_API}?week=${formatWeekParam(getWeekStart(week))}`,
  );
  if (!res.ok)
    throw new Error('Failed to fetch events');
  return res.json();
}

function getWeekHref(basePath: string, week: Date): string {
  const target = getWeekStart(week);
  const isCurrentWeek
    = target.getTime() === getWeekStart(new Date()).getTime();
  return isCurrentWeek ? basePath : `${basePath}?week=${formatWeekParam(target)}`;
}

function eventsByCell(
  eventsList: NormalizedCalendarEvent[],
): Map<string, NormalizedCalendarEvent> {
  const map = new Map<string, NormalizedCalendarEvent>();
  for (const e of eventsList) {
    map.set(`${e.dayKey}-${e.startSlotIndex}`, e);
  }
  return map;
}

export interface EventCalendarProps {
  /** Optional: when not provided, events are fetched inside the component */
  events?: CalendarEvent[];
  /** Optional: computed from events when not provided */
  timeSlots?: TimeSlot[];
  timelineWidth?: string;
  slotHeight?: string;
  className?: string;
}

function computeTimeSlotsFromEvents(events: CalendarEvent[]): TimeSlot[] {
  if (events.length === 0)
    return buildTimeSlots(7, 18, 60);
  let startHour = 24;
  let endHour = 0;
  for (const e of events) {
    const { hour } = getHourAndMinute(getStartTimeFromStartDate(e.startDate));
    startHour = Math.min(startHour, hour);
    endHour = Math.max(
      endHour,
      hour + (e.durationMinutes ?? 0) / 60 + 1,
    );
  }
  return buildTimeSlots(startHour - 1, endHour, 60);
}

export default function EventCalendar({
  events: initialEvents,
  timeSlots: timeSlotsProp,
  timelineWidth = '3rem',
  slotHeight = '4rem',
  className = '',
}: EventCalendarProps) {
  const [weekStart, setWeekStart] = useState<Date>(() => parseWeekFromUrl());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents ?? []);
  const [loading, setLoading] = useState(!(initialEvents?.length));

  useEffect(() => {
    if (initialEvents?.length)
      return;
    let cancelled = false;
    fetchEventsForWeek(weekStart)
      .then((data) => {
        if (!cancelled)
          setEvents(data);
      })
      .finally(() => {
        if (!cancelled)
          setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const timeSlots = useMemo(
    () =>
      timeSlotsProp?.length
        ? timeSlotsProp
        : computeTimeSlotsFromEvents(events),
    [events, timeSlotsProp],
  );

  const days = useMemo(() => buildWeekDays(weekStart), [weekStart]);
  const filteredEvents = useMemo(
    () => filterEventsToWeek(events, weekStart),
    [events, weekStart],
  );
  const slotDurationMinutes = useMemo(
    () => getSlotDurationMinutes(timeSlots),
    [timeSlots],
  );
  const normalizedEvents = useMemo(
    () => filteredEvents.map(e => normalizeCalendarEvent(e, timeSlots)),
    [filteredEvents, timeSlots],
  );
  const byCell = useMemo(() => eventsByCell(normalizedEvents), [normalizedEvents]);

  const thisWeekMonday = getWeekStart(new Date());
  const isPrevWeekDisabled = weekStart.getTime() <= thisWeekMonday.getTime();

  const todayColumnIndex = useMemo(() => {
    const start = weekStart.getTime();
    const end = start + 7 * 24 * 60 * 60 * 1000;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const t = today.getTime();
    if (t < start || t >= end)
      return -1;
    return Math.round((t - start) / (24 * 60 * 60 * 1000));
  }, [weekStart]);

  const prevWeek = useMemo(() => addWeeks(weekStart, -1), [weekStart]);
  const nextWeek = useMemo(() => addWeeks(weekStart, 1), [weekStart]);

  const basePath
    = typeof window !== 'undefined' ? window.location.pathname : '/';
  const prevHref = getWeekHref(basePath, prevWeek);
  const nextHref = getWeekHref(basePath, nextWeek);

  const goToWeek = useCallback(
    async (d: Date) => {
      const target = getWeekStart(d);
      window.history.pushState({}, '', getWeekHref(basePath, target));
      setWeekStart(target);
      setLoading(true);
      try {
        const data = await fetchEventsForWeek(target);
        setEvents(data);
      }
      finally {
        setLoading(false);
      }
    },
    [basePath],
  );

  return (
    <div
      className={`flex flex-col w-full max-w-full overflow-auto rounded border-2 border-charcoal relative bg-surface ${className}`.trim()}
      style={{
        ['--calendar-days-count' as string]: days.length,
        ['--calendar-slot-height' as string]: slotHeight,
      } as React.CSSProperties}
      role="application"
      aria-label="Calendario semanal"
    >
      <WeekNav
        monthLabel={formatMonthYear(weekStart)}
        isPrevDisabled={isPrevWeekDisabled}
        prevHref={prevHref}
        onPrevClick={() => goToWeek(prevWeek)}
        todayHref={basePath}
        onTodayClick={() => goToWeek(new Date())}
        nextHref={nextHref}
        onNextClick={() => goToWeek(nextWeek)}
      />

      <header className="flex border-b-2 border-charcoal" role="row">
        <div
          className="border-charcoal shrink-0 border-r-2"
          aria-hidden
          style={{ width: timelineWidth }}
        />
        <div
          className="grid min-w-0 flex-1"
          role="row"
          style={{ gridTemplateColumns: `repeat(var(--calendar-days-count, 7), 1fr)` }}
        >
          {days.map((day, dayIndex) => {
            const isToday = dayIndex === todayColumnIndex;
            return (
              <div
                key={day.key}
                className={`border-charcoal flex flex-col items-center justify-center gap-0.5 border-r-2 px-1 py-2 last:border-r-0 ${isToday ? 'bg-charcoal/10' : ''}`}
                role="columnheader"
                title={day.fullName ? `${day.fullName} ${day.dayOfMonth}` : day.key}
              >
                <span className="text-xs font-medium uppercase tracking-wide text-charcoal/80">
                  {day.shortName ?? day.label}
                </span>
                <span className="text-lg font-bold tabular-nums leading-none">
                  {day.dayOfMonth ?? day.label}
                </span>
              </div>
            );
          })}
        </div>
      </header>

      {loading
        ? (
            <div className="flex-1 min-h-[200px] border-t-2 border-charcoal">
              <Skeleton variant="calendar" rows={8} className="h-full" />
            </div>
          )
        : (
            <div className="flex min-h-0 flex-1">
              <aside
                className="shrink border-r-2 border-charcoal"
                aria-label="Horarios"
                role="complementary"
                style={{ width: timelineWidth }}
              >
                <div className="flex flex-col">
                  {timeSlots.map(slot => (
                    <div
                      key={slot.label}
                      className="text-charcoal flex min-h-(--calendar-slot-height,2rem) items-start justify-end border-b border-black/15 py-1 pt-1 pr-2 text-xs"
                    >
                      <span className="whitespace-nowrap">{slot.label}</span>
                    </div>
                  ))}
                </div>
              </aside>
              <div
                className="event-calendar-grid grid flex-1 min-w-0"
                style={{
                  ['--calendar-slot-height' as string]: slotHeight,
                  gridTemplateColumns: 'repeat(var(--calendar-days-count, 7), 1fr)',
                  gridAutoRows: `var(--calendar-slot-height, 4rem)`,
                } as React.CSSProperties}
                role="grid"
                aria-label="Calendario de eventos"
              >
                {timeSlots.map((_, slotIndex) =>
                  days.map((day, dayIndex) => {
                    const key = `${day.key}-${slotIndex}`;
                    const event = byCell.get(key);
                    const isToday = dayIndex === todayColumnIndex;
                    return (
                      <CalendarCell
                        key={key}
                        dayKey={day.key}
                        slotIndex={slotIndex}
                        slotDurationMinutes={slotDurationMinutes}
                        event={event}
                        className={isToday ? 'bg-charcoal/10' : ''}
                      />
                    );
                  }),
                )}
              </div>
            </div>
          )}
    </div>
  );
}
