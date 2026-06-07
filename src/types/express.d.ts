declare global {
  namespace Express {
    interface User {
      id: string; // public.users.id = Supabase auth UUID
      authId: string; // same value — kept for explicitness
      role: 'student' | 'club_executive' | 'executive';
      email?: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
