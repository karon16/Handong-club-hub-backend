import { z } from 'zod';

export const createApplicationSchema = z.object({
  club_id: z.string().uuid(),
  // Dynamic JSON form — keys are question IDs/labels, values are the student's answers
  answers: z.record(z.string(), z.unknown()),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
