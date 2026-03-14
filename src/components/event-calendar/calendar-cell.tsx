import type { CalendarCellEvent } from './types.ts';
import { useEffect, useRef } from 'react';
import EventCard from './event-card.tsx';

export interface CalendarCellProps {
  key?: string;
  dayKey: string;
  slotIndex: number;
  slotDurationMinutes?: number;
  event?: CalendarCellEvent;
  className?: string;
}

export default function CalendarCell({
  dayKey,
  slotIndex,
  slotDurationMinutes = 60,
  event,
  className = '',
}: CalendarCellProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasOffset = event?.offsetMinutes != null && event.offsetMinutes > 0;
  const useDurationHeight = hasOffset && event?.durationMinutes != null;
  const rowSpan = event?.spanSlots && event.spanSlots > 1 && !useDurationHeight ? event.spanSlots : undefined;
  const useAbsolute = rowSpan !== undefined || useDurationHeight;

  function applyEventCardSize(
    card: HTMLDivElement,
    parent: HTMLElement,
    event: CalendarCellEvent,
    slotDurationMinutes: number,
    useDurationHeight: boolean,
  ): void {
    const spanSlots = event.spanSlots ?? 1;
    const gap = 0;

    if (useDurationHeight && event.durationMinutes != null) {
      const heightSlots = event.durationMinutes / slotDurationMinutes;
      card.style.top = `${(event.offsetMinutes ?? 0) / slotDurationMinutes * 100}%`;
      card.style.height = `${parent.clientHeight * heightSlots - gap}px`;
    }
    else {
      card.style.top = '';
      card.style.height = `${parent.clientHeight * spanSlots - gap}px`;
    }
    card.style.width = `${parent.clientWidth}px`;
  }

  useEffect(() => {
    if (!event || !cardRef.current)
      return;

    const parentElement = cardRef.current.parentElement;
    if (!parentElement)
      return;

    const updateSize = (): void => {
      if (!cardRef.current || !cardRef.current.parentElement)
        return;
      applyEventCardSize(
        cardRef.current,
        cardRef.current.parentElement,
        event,
        slotDurationMinutes,
        useDurationHeight,
      );
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(parentElement);
    return () => observer.disconnect();
  }, [event, slotDurationMinutes, useDurationHeight]);

  return (
    <div
      className={`event-calendar-cell min-h-(--calendar-slot-height,4rem) min-w-0 border-b border-r border-black/15 ${useAbsolute ? 'relative' : ''} ${className}`.trim()}
      data-day={dayKey}
      data-slot={slotIndex}
      role="gridcell"
    >
      {event
        ? (
            <EventCard
              ref={cardRef}
              className={useAbsolute ? 'absolute top-0 left-0' : undefined}
              {...event}
            />
          )
        : null}
    </div>
  );
}
