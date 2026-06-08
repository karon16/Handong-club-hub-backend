import {
  createClub,
  deleteClub,
  getAllClubs,
  getClubById,
  updateClub,
} from '../clubController';
import { supabase } from '../../config/supabase';
import { mockRequest, mockResponse } from '../../utils/testHelpers';

jest.mock('../../config/supabase');

describe('Club Controller', () => {
  let mockQueryBuilder: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryBuilder = require('../../config/supabase').supabase
      .mockQueryBuilder;
    mockQueryBuilder.select.mockReturnThis();
    mockQueryBuilder.single.mockReturnThis();
    mockQueryBuilder.insert.mockReturnThis();
    mockQueryBuilder.update.mockReturnThis();
    mockQueryBuilder.delete.mockReturnThis();
    mockQueryBuilder.eq.mockReturnThis();
  });

  describe('getAllClubs', () => {
    it('should return all clubs', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const mockData = [{ id: '1', name: 'Test Club' }];
      mockQueryBuilder.select.mockResolvedValueOnce({
        data: mockData,
        error: null,
      });

      await getAllClubs(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should return 500 on db error', async () => {
      const req = mockRequest();
      const res = mockResponse();

      mockQueryBuilder.select.mockResolvedValueOnce({
        data: null,
        error: new Error('DB Error'),
      });

      await getAllClubs(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to retrieve clubs due to a database error.',
      });
    });
  });

  describe('createClub', () => {
    it('should return 400 for invalid data', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'student' },
        body: { description: 'Missing name' },
      });
      const res = mockResponse();

      await createClub(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Object) })
      );
    });

    it('should return 201 on success', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'student' },
        body: { name: 'New Club', description: 'desc' },
      });
      const res = mockResponse();

      mockQueryBuilder.single.mockResolvedValue({
        data: { id: '1', name: 'New Club' },
        error: null,
      });

      await createClub(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ id: '1', name: 'New Club' })
      );
    });
  });

  describe('getClubById', () => {
    it('should return 404 if club not found', async () => {
      const req = mockRequest({ params: { id: 'invalid' } });
      const res = mockResponse();

      mockQueryBuilder.single.mockResolvedValue({
        data: null,
        error: { message: 'Not found' },
      });

      await getClubById(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return club data on success', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      mockQueryBuilder.single.mockResolvedValue({
        data: { id: '1', name: 'Club 1' },
        error: null,
      });

      await getClubById(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Club 1' });
    });
  });
});
