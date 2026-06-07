export interface EventRecord {
  id: string;
  club_id: string;
  title: string;
  description: string;
  event_date: string;
  poster_image_url: string | null;
  is_archived: boolean;
  created_at: string;
}

export interface CreateEventPayload {
  club_id: string;
  title: string;
  description: string;
  event_date: string;
  poster_image_url?: string;
}

export interface UpdateEventPayload {
  title?: string;
  description?: string;
  event_date?: string;
  poster_image_url?: string;
  location?: string;
  host?: string;
  requires_tickets?: boolean;
  category_badge?: string;
  is_archived?: boolean;
}
