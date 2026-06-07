declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;       // public.users.id = Supabase auth UUID
        authId: string;   // same value — kept for explicitness
        role: 'student' | 'club_executive' | 'executive';
        email?: string;
      };
    }
  }
}

export {};
