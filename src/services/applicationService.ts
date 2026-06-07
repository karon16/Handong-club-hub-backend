/**
 * @file src/services/applicationService.ts
 * @description Data-access layer for the `applications` and `clubs` tables.
 *
 * This module owns all Supabase queries related to applications — no HTTP
 * objects (Request / Response) or business-rule validation live here.
 * Controllers call these functions and translate their return values into
 * HTTP responses.
 */

import { supabase } from '../config/supabase';

// ---------------------------------------------------------------------------
// Return-type interfaces
// ---------------------------------------------------------------------------

/** Represents a newly created application row returned from the DB. */
export interface CreatedApplication {
  id: string;
  user_id: string;
  club_id: string;
  answers: unknown;
  status: string;
  created_at: string;
}

/** Represents a fully updated application row returned from the DB. */
export interface UpdatedApplication extends CreatedApplication {
  updated_at: string;
}

/** Generic discriminated-union result so callers can use early-return guards. */
export type ServiceResult<T> =
  | { success: true; data: T }
  | {
      success: false;
      reason: 'not_found' | 'forbidden' | 'db_error';
      message: string;
    };

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Inserts a new application record with `status: 'pending'`.
 *
 * @param userId  - The authenticated user's UUID from `public.users`.
 * @param clubId  - The target club's UUID.
 * @param answers - Optional freeform answers object from the request body.
 * @returns A `ServiceResult` containing the created row, or a DB error descriptor.
 */
export async function createApplication(
  userId: string,
  clubId: string,
  answers: unknown
): Promise<ServiceResult<CreatedApplication>> {
  const { data, error } = await supabase
    .from('applications')
    .insert([{ user_id: userId, club_id: clubId, answers, status: 'pending' }])
    .select()
    .single();

  if (error || !data) {
    return {
      success: false,
      reason: 'db_error',
      message: error?.message ?? 'Insert failed.',
    };
  }

  return { success: true, data: data as CreatedApplication };
}

/**
 * Looks up an application by its primary key and returns its `club_id`.
 *
 * @param applicationId - UUID of the application to find.
 * @returns A `ServiceResult` with `{ club_id }` or a `not_found` descriptor.
 */
export async function findApplicationClub(
  applicationId: string
): Promise<ServiceResult<{ club_id: string }>> {
  const { data, error } = await supabase
    .from('applications')
    .select('club_id')
    .eq('id', applicationId)
    .single();

  if (error || !data) {
    return {
      success: false,
      reason: 'not_found',
      message: 'Application not found.',
    };
  }

  return { success: true, data: data as { club_id: string } };
}

/**
 * Verifies that the given user is the registered executive of a club.
 *
 * @param clubId         - UUID of the club to check.
 * @param execUserId     - UUID of the user claiming executive access.
 * @returns A `ServiceResult` with `true` on success, or `forbidden`/`not_found` on failure.
 */
export async function verifyClubOwnership(
  clubId: string,
  execUserId: string
): Promise<ServiceResult<true>> {
  const { data, error } = await supabase
    .from('clubs')
    .select('exec_user_id')
    .eq('id', clubId)
    .single();

  if (error || !data) {
    return { success: false, reason: 'not_found', message: 'Club not found.' };
  }

  if (data.exec_user_id !== execUserId) {
    return {
      success: false,
      reason: 'forbidden',
      message: 'Unauthorized: You do not manage this club.',
    };
  }

  return { success: true, data: true };
}

/**
 * Updates the `status` and `updated_at` fields of an existing application.
 *
 * @param applicationId - UUID of the application to update.
 * @param status        - The new status value (must be pre-validated by caller).
 * @returns A `ServiceResult` containing the updated row, or a DB error descriptor.
 */
export async function setApplicationStatus(
  applicationId: string,
  status: string
): Promise<ServiceResult<UpdatedApplication>> {
  const { data, error } = await supabase
    .from('applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', applicationId)
    .select()
    .single();

  if (error || !data) {
    return {
      success: false,
      reason: 'db_error',
      message: error?.message ?? 'Update failed.',
    };
  }

  return { success: true, data: data as UpdatedApplication };
}
