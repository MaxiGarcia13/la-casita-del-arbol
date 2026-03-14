import type { APIRoute } from 'astro';
import { BOOKLY_API_URL_V1, BOOKLY_INSTANCE_ID, VERCEL_AUTOMATION_BYPASS } from 'astro:env/server';
import { getWeekStart } from '../../utils/date';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const weekParam = url.searchParams.get('week');
  const weekStart = weekParam
    ? getWeekStart(new Date(weekParam))
    : getWeekStart(new Date());

  const params = new URLSearchParams({
    instanceID: BOOKLY_INSTANCE_ID,
    startDate: weekStart.toISOString(),
  });

  try {
    const response = await fetch(`${BOOKLY_API_URL_V1}/events?${params.toString()}`, {
      headers: {
        'x-vercel-protection-bypass': VERCEL_AUTOMATION_BYPASS,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch events',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data.results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to fetch events',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
