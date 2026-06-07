import { Request, Response, NextFunction } from 'express';

// 'executive' is the legacy value — treat it as equivalent to 'club_executive'
const EXECUTIVE_ROLES = new Set(['club_executive', 'executive']);

export const requireRole = (role: 'student' | 'club_executive') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // 1. Safety Check: Ensure the user is logged in AND has a role assigned.
    // If not, they are immediately forbidden.
    if (!req.user || !req.user.role) {
      res.status(403).json({ error: `Forbidden: requires role '${role}'` });
      return;
    }

    // Now TypeScript knows req.user.role is definitely a string
    const userRole = req.user.role;

    // 2. Logic Check: Compare using the guaranteed string
    const allowed =
      role === 'club_executive'
        ? EXECUTIVE_ROLES.has(userRole)
        : userRole === role;

    if (!allowed) {
      res.status(403).json({ error: `Forbidden: requires role '${role}'` });
      return;
    }

    next();
  };
};
