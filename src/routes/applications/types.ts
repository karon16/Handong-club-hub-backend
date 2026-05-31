export type ApplicationStatus =
  | 'Pending'
  | 'Under Review'
  | 'Interview Scheduled'
  | 'Accepted'
  | 'Rejected';

export interface ApplicationRecord {
  id: string;
  user_id: string;
  club_id: string;
  answers: Record<string, unknown>;
  status: ApplicationStatus;
  created_at: string;
}

export interface CreateApplicationPayload {
  club_id: string;
  answers: Record<string, unknown>;
}
