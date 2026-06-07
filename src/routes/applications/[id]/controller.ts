import { Request, Response } from 'express';
import { supabase } from '../../../config/supabaseClient';
import { updateStatusSchema } from './schema';

export const updateApplicationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!.id;

  const parsed = updateStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { status } = parsed.data;

  // Fetch the application to verify it exists and get the club_id + applicant user_id
  const { data: application, error: fetchError } = await supabase
    .from('applications')
    .select('id, user_id, club_id, status')
    .eq('id', id)
    .single();

  if (fetchError || !application) {
    res.status(404).json({ error: 'Application not found' });
    return;
  }

  // Verify the requesting user is the executive of the club that owns this application
  const { data: club, error: clubError } = await supabase
    .from('clubs')
    .select('exec_user_id')
    .eq('id', application.club_id)
    .single();

  if (clubError || !club || club.exec_user_id !== userId) {
    res.status(403).json({ error: 'Forbidden: you are not an executive of this club' });
    return;
  }

  // Update the application status
  const { data: updated, error: updateError } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    res.status(500).json({ error: 'Failed to update status', details: updateError.message });
    return;
  }

  // Trigger notification to the applicant (FR5.2, NFR12)
  const notificationMessage = buildNotificationMessage(status);
  await supabase.from('notifications').insert({
    user_id: application.user_id,
    message: notificationMessage,
    type: 'application_status',
    is_read: false,
  });

  res.status(200).json(updated);
};

function buildNotificationMessage(status: string): string {
  const messages: Record<string, string> = {
    'Under Review': 'Your application is now under review.',
    'Interview Scheduled': 'An interview has been scheduled for your application.',
    Accepted: 'Congratulations! Your application has been accepted.',
    Rejected: 'Your application has been reviewed and was not accepted.',
    Pending: 'Your application status has been updated to Pending.',
  };
  return messages[status] ?? `Your application status has been updated to: ${status}.`;
}
