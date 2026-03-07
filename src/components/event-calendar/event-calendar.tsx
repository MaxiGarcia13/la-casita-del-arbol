import type { CalendarEvent, TimeSlot } from './types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchEventsForWeek } from '../../services/events-for-week';
import {
  addWeeks,
  formatMonthYear,
  formatWeekParam,
  getWeekStart,
  parseWeekFromUrl,
} from '../../utils/date';
import { EventCalendarLoader } from './event-calendar-loader';
import EventCalendarView from './event-calendar-view';
import { buildTimeSlots, getHourAndMinute, getStartTimeFromStartDate } from './utils';

function getWeekHref(basePath: string, week: Date): string {
  const target = getWeekStart(week);
  const isCurrentWeek
    = target.getTime() === getWeekStart(new Date()).getTime();
  return isCurrentWeek ? basePath : `${basePath}?week=${formatWeekParam(target)}`;
}

function computeTimeSlotsFromEvents(events: CalendarEvent[]) {
  if (events.length === 0)
    return buildTimeSlots(7, 18, 60);
  let startHour = 24;
  let endHour = 0;
  for (const e of events) {
    const { hour } = getHourAndMinute(getStartTimeFromStartDate(e.startDate));
    startHour = Math.min(startHour, hour);
    endHour = Math.max(endHour, hour + (e.durationMinutes ?? 0) / 60 + 1);
  }
  return buildTimeSlots(startHour - 1, endHour, 60);
}

export interface EventCalendarProps {
  timeSlots?: TimeSlot[];
  timelineWidth?: string;
  slotHeight?: string;
  className?: string;
}

export default function EventCalendar({
  timelineWidth = '3rem',
  slotHeight = '4rem',
  className = '',
}: EventCalendarProps) {
  const [weekStart, setWeekStart] = useState<Date>(() => parseWeekFromUrl());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    // Intentionally run only on mount; week navigation uses goToWeek()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeSlots = useMemo(
    () => computeTimeSlotsFromEvents(events),
    [events],
  );

  const thisWeekMonday = getWeekStart(new Date());
  const isPrevWeekDisabled = weekStart.getTime() <= thisWeekMonday.getTime();
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

  if (loading) {
    return <EventCalendarLoader className={className} rows={4} />;
  }

  return (
    <EventCalendarView
      events={events}
      weekStart={weekStart}
      timeSlots={timeSlots}
      timelineWidth={timelineWidth}
      slotHeight={slotHeight}
      className={className}
      monthLabel={formatMonthYear(weekStart)}
      isPrevDisabled={isPrevWeekDisabled}
      prevHref={prevHref}
      todayHref={basePath}
      nextHref={nextHref}
      onPrevClick={() => goToWeek(prevWeek)}
      onTodayClick={() => goToWeek(new Date())}
      onNextClick={() => goToWeek(nextWeek)}
    />
  );
}
