import type { APIRoute } from 'astro';
import type { UpcomingEvent } from '../../components/event-calendar/types';

export const upcomingEvents: UpcomingEvent[] = [
  {
    title: 'Taller de cerámica para principiantes',
    description:
      'Un fin de semana para aprender las bases del torno y la mano. Incluye materiales y horneado.',
    dateLabel: 'Próximamente',
    ctaLabel: 'Quiero más información',
    ctaMessage:
      'Hola, me interesa el taller de cerámica para principiantes. ¿Cuándo es y cómo me inscribo?',
  },
  {
    title: 'Curso intensivo de verano',
    description:
      'Una semana de inmersión en cerámica. Niveles inicial e intermedio.',
    dateLabel: 'Enero 2026',
    ctaLabel: 'Consultar',
  },
  {
    title: 'Noche de cerámica y vino',
    description:
      'Una tarde para crear tu pieza mientras disfrutás un buen vino. Ideal para regalar o para hacer algo distinto.',
    dateLabel: 'Por confirmar',
  },
];

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(upcomingEvents), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
