import { checkHealth } from '../health.controller';
import { mockRequest, mockResponse } from '../../utils/testHelpers';

describe('Health Controller', () => {
  it('should return 200 and server online status', () => {
    const req = mockRequest();
    const res = mockResponse();

    checkHealth(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 'server online' });
  });
});
