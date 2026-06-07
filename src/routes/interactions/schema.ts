import { z } from 'zod';

export const clubIdParamSchema = z.object({
  clubId: z.string().uuid('clubId must be a valid UUID'),
});

export const eventIdParamSchema = z.object({
  eventId: z.string().uuid('eventId must be a valid UUID'),
});
