import { signup, login } from '../authController';
import { supabase } from '../../config/supabase';
import { mockRequest, mockResponse } from '../../utils/testHelpers';

jest.mock('../../config/supabase');

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should return 400 if required fields are missing', async () => {
      const req = mockRequest({ body: { email: 'test@test.com' } });
      const res = mockResponse();

      await signup(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(String) })
      );
    });

    it('should successfully register a user', async () => {
      const req = mockRequest({
        body: { email: 'test@test.com', password: 'password', name: 'Test' },
      });
      const res = mockResponse();

      (supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: { id: 'user123', email: 'test@test.com' } },
        error: null,
      });

      // supabase.from('users').insert() mock
      const mockQueryBuilder = require('../../config/supabase').supabase
        .mockQueryBuilder;
      mockQueryBuilder.insert.mockResolvedValue({ error: null });

      await signup(req as any, res as any);

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'User registered successfully.' })
      );
    });
  });

  describe('login', () => {
    it('should return 400 if email or password missing', async () => {
      const req = mockRequest({ body: { email: 'test@test.com' } });
      const res = mockResponse();

      await login(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should login successfully', async () => {
      const req = mockRequest({
        body: { email: 'test@test.com', password: 'password' },
      });
      const res = mockResponse();

      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: {
          user: { id: 'user123', email: 'test@test.com' },
          session: { access_token: 'token123' },
        },
        error: null,
      });

      const mockQueryBuilder = require('../../config/supabase').supabase
        .mockQueryBuilder;
      mockQueryBuilder.single.mockResolvedValue({
        data: { role: 'student' },
        error: null,
      });

      await login(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Login successful.',
          user: expect.objectContaining({ role: 'student' }),
        })
      );
    });
  });
});
