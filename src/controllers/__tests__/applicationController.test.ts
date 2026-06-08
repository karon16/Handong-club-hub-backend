import {
  getMyApplications,
  submitApplication,
  updateApplicationStatus,
} from '../applicationController';
import { mockRequest, mockResponse } from '../../utils/testHelpers';
import * as applicationService from '../../services/applicationService';
import * as validation from '../../utils/validation';

jest.mock('../../services/applicationService');
jest.mock('../../utils/validation');

describe('Application Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMyApplications', () => {
    it('should return 401 if not authorized', async () => {
      const req = mockRequest();
      const res = mockResponse();

      await getMyApplications(req as any, res as any);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return applications on success', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'student' },
      });
      const res = mockResponse();

      (applicationService.getApplicationsByUser as jest.Mock).mockResolvedValue(
        {
          success: true,
          data: [{ id: 'app1' }],
        }
      );

      await getMyApplications(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 'app1' }]);
    });
  });

  describe('submitApplication', () => {
    it('should return 400 if validation fails', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'student' },
        body: { club_id: '' },
      });
      const res = mockResponse();

      (validation.validateSubmitApplicationBody as jest.Mock).mockReturnValue({
        valid: false,
        message: 'Invalid club id',
      });

      await submitApplication(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should create application successfully', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'student' },
        body: { club_id: 'club123', answers: {} },
      });
      const res = mockResponse();

      (validation.validateSubmitApplicationBody as jest.Mock).mockReturnValue({
        valid: true,
      });

      (applicationService.createApplication as jest.Mock).mockResolvedValue({
        success: true,
        data: { id: 'new_app' },
      });

      await submitApplication(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ application: { id: 'new_app' } })
      );
    });
  });

  describe('updateApplicationStatus', () => {
    it('should return 403 if user does not own club', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'club_executive' },
        params: { id: 'app1' },
        body: { status: 'accepted' },
      });
      const res = mockResponse();

      (validation.validateApplicationStatus as jest.Mock).mockReturnValue({
        valid: true,
      });

      (applicationService.findApplicationClub as jest.Mock).mockResolvedValue({
        success: true,
        data: { club_id: 'club1' },
      });

      (applicationService.verifyClubOwnership as jest.Mock).mockResolvedValue({
        success: false,
        reason: 'forbidden',
        message: 'Forbidden',
      });

      await updateApplicationStatus(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should successfully update status', async () => {
      const req = mockRequest({
        user: { id: 'user123', authId: 'user123', role: 'club_executive' },
        params: { id: 'app1' },
        body: { status: 'accepted' },
      });
      const res = mockResponse();

      (validation.validateApplicationStatus as jest.Mock).mockReturnValue({
        valid: true,
      });

      (applicationService.findApplicationClub as jest.Mock).mockResolvedValue({
        success: true,
        data: { club_id: 'club1' },
      });

      (applicationService.verifyClubOwnership as jest.Mock).mockResolvedValue({
        success: true,
      });

      (applicationService.setApplicationStatus as jest.Mock).mockResolvedValue({
        success: true,
        data: { id: 'app1', status: 'accepted' },
      });

      await updateApplicationStatus(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          application: { id: 'app1', status: 'accepted' },
        })
      );
    });
  });
});
