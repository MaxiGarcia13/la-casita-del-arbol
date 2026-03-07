/** JS getDay(): 0=Sun, 1=Mon, … 6=Sat → keys: lun, mar, … dom */
const DAY_INDEX_TO_KEY = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'] as const;

/** Returns Monday 00:00 of the week containing the given date. Week = Mon … Sun. */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const daysSinceMonday = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - daysSinceMonday);
  return d;
}

/** Add or subtract whole weeks from a date. */
export function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

/** Day key (lun, mar, …) for a given Date. */
export function getDayKeyFromDate(date: Date): string {
  return DAY_INDEX_TO_KEY[date.getDay()];
}

export function formatWeekParam(d: Date): string {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseWeekFromUrl(): Date {
  if (typeof window === 'undefined')
    return getWeekStart(new Date());
  const params = new URLSearchParams(window.location.search);
  const week = params.get('week');
  if (!week)
    return getWeekStart(new Date());
  const d = new Date(week);
  return Number.isNaN(d.getTime()) ? getWeekStart(new Date()) : getWeekStart(d);
}

const monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });

export function formatMonthYear(d: Date): string {
  const month = monthFormatter.format(d);
  const capitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalized} ${d.getFullYear()}`;
}

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
