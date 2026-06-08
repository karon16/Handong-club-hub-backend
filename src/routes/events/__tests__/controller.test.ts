import { createEvent, getEvents } from '../controller';
import { supabase } from '../../../config/supabaseClient';
import { mockRequest, mockResponse } from '../../../utils/testHelpers';

jest.mock('../../../config/supabaseClient', () => {
  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  };

  return {
    supabase: {
      from: jest.fn(() => mockQueryBuilder),
      mockQueryBuilder,
    },
  };
});

describe('Events Controller', () => {
  let mockQueryBuilder: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryBuilder = require('../../../config/supabaseClient').supabase
      .mockQueryBuilder;
    mockQueryBuilder.select.mockReturnThis();
    mockQueryBuilder.insert.mockReturnThis();
    mockQueryBuilder.eq.mockReturnThis();
    mockQueryBuilder.single.mockReturnThis();
    mockQueryBuilder.gte.mockReturnThis();
    mockQueryBuilder.order.mockReturnThis();
  });

  describe('getEvents', () => {
    it('should fetch events successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();

      mockQueryBuilder.order.mockResolvedValue({
        data: [{ id: '1', title: 'Event 1' }],
        error: null,
      });

      await getEvents(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: '1', title: 'Event 1' }]);
    });

    it('should return 500 on db error', async () => {
      const req = mockRequest();
      const res = mockResponse();

      mockQueryBuilder.order.mockResolvedValue({
        data: null,
        error: { message: 'db error' },
      });

      await getEvents(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getEventById', () => {
    it('should fetch event by id successfully', async () => {
      const req = mockRequest({ params: { id: 'event1' } });
      const res = mockResponse();

      mockQueryBuilder.single.mockResolvedValue({
        data: { id: 'event1', title: 'Event 1' },
        error: null,
      });

      await require('../controller').getEventById(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 'event1', title: 'Event 1' });
    });

    it('should return 404 if event not found', async () => {
      const req = mockRequest({ params: { id: 'event1' } });
      const res = mockResponse();

      mockQueryBuilder.single.mockResolvedValue({
        data: null,
        error: { message: 'not found' },
      });

      await require('../controller').getEventById(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('createEvent', () => {
    it('should return 400 for invalid data', async () => {
      const req = mockRequest({
        body: {},
      });
      const res = mockResponse();

      await createEvent(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 403 if user not club executive', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'club_executive' },
        body: {
          club_id: 'a718712a-302d-457d-937d-1c390cb3335e',
          title: 'Event 1',
          description: 'Desc',
          event_date: '2026-10-10T10:00:00.000Z',
        },
      });
      const res = mockResponse();

      mockQueryBuilder.single.mockResolvedValueOnce({
        data: { exec_user_id: 'other_user' },
        error: null,
      });

      await createEvent(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 201 on success', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'club_executive' },
        body: {
          club_id: 'a718712a-302d-457d-937d-1c390cb3335e',
          title: 'Event 1',
          description: 'Desc',
          event_date: '2026-10-10T10:00:00.000Z',
        },
      });
      const res = mockResponse();

      mockQueryBuilder.single.mockResolvedValueOnce({
        data: { exec_user_id: 'user123' },
        error: null,
      });

      mockQueryBuilder.single.mockResolvedValueOnce({
        data: { id: 'event1', title: 'Event 1' },
        error: null,
      });

      await createEvent(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 'event1', title: 'Event 1' });
    });
  });
});
