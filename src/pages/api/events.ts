import type { APIRoute } from 'astro';
import type { CalendarEvent } from '../../components/event-calendar';
import { BOOKLY_API_URL_V1, BOOKLY_INSTANCE_ID, VERCEL_AUTOMATION_BYPASS } from 'astro:env/server';
import { getWeekStart } from '../../utils/date';
import { json, request } from '../../utils/request';

export const GET: APIRoute = async ({ request: req }) => {
  const url = new URL(req.url);
  const weekParam = url.searchParams.get('week');
  const weekStart = weekParam
    ? getWeekStart(new Date(weekParam))
    : getWeekStart(new Date());
  const endDate = new Date(weekStart);
  endDate.setDate(endDate.getDate() + 7);

  try {
    const response = await request<{ results: CalendarEvent[] }>(`${BOOKLY_API_URL_V1}/events`, {
      headers: {
        'x-vercel-protection-bypass': VERCEL_AUTOMATION_BYPASS,
      },
      params: {
        instanceID: BOOKLY_INSTANCE_ID,
        startDate: weekStart.toISOString(),
        endDate: endDate.toISOString(),
      },
    });

    return json(response.results, 200);
  }
  catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch events',
      },
      500,
    );
  }
};
