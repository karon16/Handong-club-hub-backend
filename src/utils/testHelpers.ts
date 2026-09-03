import { Request, Response } from 'express';

export const mockRequest = (overrides?: Partial<Request>): Partial<Request> => {
  return {
    body: {},
    params: {},
    query: {},
    ...overrides,
  };
};

export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
