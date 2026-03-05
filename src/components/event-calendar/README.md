# Event Calendar

Reusable weekly event calendar with a **header** (days), **timeline** (left column), and **grid** (events).

## Structure

- **EventCalendar.astro** – Main component. Composes header, timeline, and grid.
- **CalendarHeader.astro** – Row of day abbreviations (e.g. L, M, M, J, V, S, D).
- **CalendarTimeline.astro** – Left column with time labels (e.g. 09:00, 10:00).
- **CalendarGrid.astro** – Grid of cells; places events by day and time slot.
- **CalendarCell.astro** – Single cell; can show an event or stay empty.
- **EventCard.astro** – Event card shown inside a cell; scales by `spanSlots` (e.g. 3-hour events use larger typography/padding).
- **types.ts** – Shared types and helpers (`buildTimeSlots`, `DEFAULT_DAYS`).

## Usage

```astro
---
import EventCalendar from '@/components/event-calendar/EventCalendar.astro'
import { buildTimeSlots } from '@/components/event-calendar'

const events = [
  { id: '1', dayKey: 'mar', startSlotIndex: 2, title: 'Clase', description: 'Mañana' },
]
const timeSlots = buildTimeSlots(9, 18, 60) // 9h–18h, 1h slots
---
<EventCalendar events={events} timeSlots={timeSlots} />
```

## Props (EventCalendar)

| Prop | Type | Default |
|------|------|---------|
| `days` | `CalendarDay[]` | Spanish L–D |
| `timeSlots` | `TimeSlot[]` | 9–18, 1h |
| `events` | `CalendarEvent[]` | `[]` |
| `timelineWidth` | `string` | `'4rem'` |
| `slotHeight` | `string` | `'4rem'` |
| `class` | `string` | `''` |

## Event shape

- `dayKey`: one of the `days[].key` (e.g. `'mar'`).
- `startSlotIndex`: index in `timeSlots` (0-based).
- `spanSlots`: optional; number of rows the event spans.
- `title`, `description`: display text.

## Using subcomponents

You can use **CalendarHeader**, **CalendarTimeline**, and **CalendarGrid** (with **CalendarCell**) on their own if you need a custom layout; pass the same `days` / `timeSlots` and set `--calendar-days-count` and `--calendar-slot-height` CSS variables so layout stays aligned.
