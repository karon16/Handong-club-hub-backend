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
