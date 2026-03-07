import type { CalendarDay } from './types';

export const DEFAULT_DAYS: CalendarDay[] = [
  { key: 'lun', label: 'L', shortName: 'Lun', fullName: 'Lunes' },
  { key: 'mar', label: 'M', shortName: 'Mar', fullName: 'Martes' },
  { key: 'mie', label: 'M', shortName: 'Mié', fullName: 'Miércoles' },
  { key: 'jue', label: 'J', shortName: 'Jue', fullName: 'Jueves' },
  { key: 'vie', label: 'V', shortName: 'Vie', fullName: 'Viernes' },
  { key: 'sab', label: 'S', shortName: 'Sáb', fullName: 'Sábado' },
  { key: 'dom', label: 'D', shortName: 'Dom', fullName: 'Domingo' },
];
