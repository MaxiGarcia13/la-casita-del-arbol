export interface Event {
  id: string;
  instanceId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  availableSpots: number;
  price: number;
  customerIds: Array<string>;
  teamMembers?: Array<{
    id: string;
    name: string;
    surname: string;
  }>;
  type: EventType;
  infinite?: boolean;
  createdAt?: string;
  updatedAt?: string;
  durationMinutes: number;
  instagram?: string;
  currency?: EventConcurrency;
}

type EventType = 'event' | 'lesson';
type EventConcurrency = 'EUR' | 'ARS' | 'USD';
