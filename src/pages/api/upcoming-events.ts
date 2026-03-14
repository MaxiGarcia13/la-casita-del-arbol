import type { APIRoute } from 'astro';
import type { CalendarEvent } from '../../components/event-calendar';
import { BOOKLY_API_URL_V1, BOOKLY_INSTANCE_ID, VERCEL_AUTOMATION_BYPASS } from 'astro:env/server';
import { addWeeks } from '../../utils/date';
import { json, request } from '../../utils/request';

export const GET: APIRoute = async () => {
  const weekStart = addWeeks(new Date(), 1);

  try {
    const response = await request<{ results: CalendarEvent[] }>(`${BOOKLY_API_URL_V1}/events`, {
      headers: {
        'x-vercel-protection-bypass': VERCEL_AUTOMATION_BYPASS,
      },
      params: {
        instanceID: BOOKLY_INSTANCE_ID,
        startDate: weekStart.toISOString(),
        type: 'event',
        pageSize: 10,
        teamMembersInfo: true,
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
