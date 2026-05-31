import { Request, Response, NextFunction } from 'express';

// 'executive' is the legacy value — treat it as equivalent to 'club_executive'
const EXECUTIVE_ROLES = new Set(['club_executive', 'executive']);

export const requireRole = (role: 'student' | 'club_executive') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(403).json({ error: `Forbidden: requires role '${role}'` });
      return;
    }

    const userRole = req.user.role;
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
