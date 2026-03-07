import type { APIRoute } from 'astro';
import type { CalendarEvent } from '../../components/event-calendar/types';
import { filterEventsToWeek } from '../../components/event-calendar/utils';
import { getWeekStart } from '../../utils/date';

/** All sample events (multiple weeks). API returns only events for the requested week. */
export const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    startDate: new Date().toString(),
    durationMinutes: 60,
    title: 'Clase cerámica',
    description: `
    Turno mañana, 10:15 - 11:15 de 2 horas.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
    `,
    totalSlots: 10,
    slotsOccupied: 9,
    type: 'lesson',
  },
  {
    id: '2',
    startDate: '2025-03-06T12:00:00',
    durationMinutes: 120,
    title: 'Taller',
    description: '2 horas',
    totalSlots: 10,
    slotsOccupied: 10,
    type: 'event',
  },
  {
    id: '3',
    startDate: '2025-03-07T14:00:00',
    durationMinutes: 240,
    title: 'Curso intensivo',
    description: '3 horas',
  },
  {
    id: '4',
    startDate: '2025-03-04T18:30:00',
    durationMinutes: 120,
    title: 'Clase 18:30',
    description: 'Con minutos',
  },
  {
    id: '5',
    startDate: '2025-03-11T10:00:00',
    durationMinutes: 90,
    title: 'Clase semana siguiente',
    description: 'Lunes siguiente',
    type: 'lesson',
  },
  {
    id: '6',
    startDate: '2025-03-17T14:00:00',
    durationMinutes: 120,
    title: 'Taller otra semana',
    description: 'Otra semana',
    type: 'event',
  },
];

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const weekParam = url.searchParams.get('week');
  const weekStart = weekParam
    ? getWeekStart(new Date(weekParam))
    : getWeekStart(new Date());

  const eventsForWeek = filterEventsToWeek(sampleEvents, weekStart);

  return new Response(JSON.stringify(eventsForWeek), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
