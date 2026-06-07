/**
 * @file src/controllers/applicationController.ts
 * @description HTTP handlers for application routes.
 *
 * This controller has a single responsibility: translate HTTP requests into
 * service calls and translate service results back into HTTP responses.
 *
 * All validation logic lives in `src/utils/validation.ts`.
 * All database queries live in `src/services/applicationService.ts`.
 */

import { Request, Response } from 'express';
import {
  validateSubmitApplicationBody,
  validateApplicationStatus,
} from '../utils/validation';
import {
  createApplication,
  getApplicationsByClub,
  getApplicationsByUser,
  findApplicationClub,
  verifyClubOwnership,
  setApplicationStatus,
} from '../services/applicationService';
import { supabase } from '../config/supabase';

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

/**
 * Returns all applications submitted to a club the exec manages.
 *
 * @route  GET /api/clubs/:clubId/applications
 * @access Authenticated (club_executive)
 */
export const getClubApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  const clubId = req.params.clubId as string;

  const ownership = await verifyClubOwnership(clubId, req.user.id);
  if (!ownership.success) {
    const status = ownership.reason === 'not_found' ? 404 : 403;
    res.status(status).json({ error: ownership.message });
    return;
  }

  const result = await getApplicationsByClub(clubId);
  if (!result.success) {
    console.error('[getClubApplications] DB error:', result.message);
    res.status(500).json({ error: 'Failed to retrieve applications.' });
    return;
  }

  res.status(200).json(result.data);
};

/**
 * Returns all applications submitted by the authenticated student.
 *
 * @route  GET /api/applications
 * @access Authenticated (student)
 */
export const getMyApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  const result = await getApplicationsByUser(req.user.id);
  if (!result.success) {
    console.error('[getMyApplications] DB error:', result.message);
    res.status(500).json({ error: 'Failed to retrieve applications.' });
    return;
  }

  res.status(200).json(result.data);
};

/**
 * Handles a student submitting a new application to a club.
 *
 * Validates the request body, then delegates the DB write to
 * `applicationService.createApplication`.
 *
 * @route  POST /api/applications
 * @access Authenticated (student)
 */
export const submitApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  // auth guard — req.user is typed via src/types/express.d.ts
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  const { club_id, answers } = req.body;

  // input validation — delegate to utils/validation
  const validation = validateSubmitApplicationBody(club_id);
  if (!validation.valid) {
    res.status(400).json({ error: validation.message });
    return;
  }

  // data write — delegate to service layer
  const result = await createApplication(req.user.id, club_id, answers);
  if (!result.success) {
    console.error('[submitApplication] DB error:', result.message);
    res.status(500).json({ error: 'Failed to submit application.' });
    return;
  }

  res
    .status(201)
    .json({
      message: 'Application submitted successfully.',
      application: result.data,
    });
};

/**
 * Handles an executive updating the status of a pending application.
 *
 * Validates the new status value, confirms the application exists, confirms
 * the caller owns the relevant club, then delegates the DB update to
 * `applicationService.setApplicationStatus`.
 *
 * @route  PATCH /api/applications/:id
 * @access Authenticated (club_executive)
 */
export const updateApplicationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  // auth guard — req.user is typed via src/types/express.d.ts
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  const id = req.params.id as string;
  const status = req.body.status as string;

  // input validation — delegate to utils/validation
  const validation = validateApplicationStatus(status);
  if (!validation.valid) {
    res.status(400).json({ error: validation.message });
    return;
  }

  // step 1: resolve which club owns this application
  const appResult = await findApplicationClub(id);
  if (!appResult.success) {
    res.status(404).json({ error: appResult.message });
    return;
  }

  // step 2: confirm this executive owns that club
  const ownershipResult = await verifyClubOwnership(
    appResult.data.club_id,
    req.user.id
  );
  if (!ownershipResult.success) {
    const httpStatus = ownershipResult.reason === 'not_found' ? 404 : 403;
    res.status(httpStatus).json({ error: ownershipResult.message });
    return;
  }

  // step 3: persist the new status
  const updateResult = await setApplicationStatus(id, status);
  if (!updateResult.success) {
    console.error('[updateApplicationStatus] DB error:', updateResult.message);
    res.status(500).json({ error: 'Failed to update application.' });
    return;
  }

  // step 4: notify the applicant (fire-and-forget — never block the response)
  supabase
    .from('notifications')
    .insert({
      user_id: updateResult.data.user_id,
      type: 'status_update',
      message: `Your application status has been updated to "${status}".`,
    })
    .then(({ error }) => {
      if (error) console.error('[updateApplicationStatus] Notification insert failed:', error.message);
    });

  res
    .status(200)
    .json({
      message: 'Application status updated.',
      application: updateResult.data,
    });
};
