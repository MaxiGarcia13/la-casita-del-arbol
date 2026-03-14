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
  teamMemberIds?: Array<string>;
  type: EventType;
  infinite?: boolean;
  createdAt?: string;
  updatedAt?: string;
  durationMinutes: number;
}

type EventType = 'event' | 'lesson';
