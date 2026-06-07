/**
 * @file src/utils/validation.ts
 * @description Pure validation helpers — no HTTP, no DB dependencies.
 *
 * Each helper returns a `ValidationResult` so callers always receive
 * both a success flag and a human-readable error message in one object,
 * eliminating the need for paired boolean + string variables elsewhere.
 */

/** Allowlist of valid application statuses. Kept here so it is the single source of truth.
 *  Values match Ai_Rules.md: Pending, Under Review, Interview Scheduled, Accepted, Rejected.
 */
export const VALID_APPLICATION_STATUSES = new Set([
  'Pending',
  'Under Review',
  'Interview Scheduled',
  'Accepted',
  'Rejected',
]);

/** Shape returned by all validation helpers in this module. */
export interface ValidationResult {
  valid: boolean;
  /** Present only when `valid` is false. */
  message?: string;
}

/**
 * Validates that a `clubId` field is present and non-empty.
 *
 * @param clubId - The club ID extracted from the request body.
 * @returns A `ValidationResult` indicating success or the specific failure reason.
 */
export function validateSubmitApplicationBody(
  clubId: unknown
): ValidationResult {
  if (!clubId) {
    return { valid: false, message: 'Missing required field: club_id.' };
  }
  return { valid: true };
}

/**
 * Validates that an application `status` is one of the allowed values.
 *
 * @param status - The status string extracted from the request body.
 * @returns A `ValidationResult` indicating success or the specific failure reason.
 */
export function validateApplicationStatus(status: unknown): ValidationResult {
  if (!status || typeof status !== 'string') {
    return { valid: false, message: 'Missing required field: status.' };
  }

  if (!VALID_APPLICATION_STATUSES.has(status)) {
    return {
      valid: false,
      message: `Invalid status. Must be one of: ${[...VALID_APPLICATION_STATUSES].join(', ')}.`,
    };
  }

  return { valid: true };
}
