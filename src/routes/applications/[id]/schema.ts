import { z } from 'zod';

export const updateStatusSchema = z.object({
  status: z.enum([
    'Pending',
    'Under Review',
    'Interview Scheduled',
    'Accepted',
    'Rejected',
  ]),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
