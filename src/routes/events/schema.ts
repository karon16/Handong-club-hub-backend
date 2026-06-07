import { z } from 'zod';

export const createEventSchema = z.object({
  club_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  // ISO 8601 datetime string, e.g. "2026-09-01T18:00:00Z"
  event_date: z.string().datetime(),
  poster_image_url: z.string().url().optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

export const updateEventSchema = z
  .object({
    title: z.string().min(1).max(200),
    description: z.string().min(1),
    event_date: z.string().datetime(),
    poster_image_url: z.string().url(),
    location: z.string(),
    host: z.string(),
    requires_tickets: z.boolean(),
    category_badge: z.string(),
    is_archived: z.boolean(),
  })
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Request body must contain at least one field to update.',
  });

export type UpdateEventInput = z.infer<typeof updateEventSchema>;
