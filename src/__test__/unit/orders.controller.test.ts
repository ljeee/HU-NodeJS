import { jest, describe, test, expect } from '@jest/globals';

const mockReq = (body = {}, params = {}, query = {}) => ({ body, params, query } as any);
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Orders Controller', () => {
  beforeEach(() => { jest.resetModules(); });
  afterEach(() => jest.clearAllMocks());

  test('create returns 201', async () => {
    await jest.unstable_mockModule('../../services/orders.service.js', () => ({
      createOrder: jest.fn(),
      listOrders: jest.fn(),
    }));
    const svc = await import('../../services/orders.service.js');
    (svc as any).createOrder.mockResolvedValue({ id: 10 });
    const { createOrderController } = await import('../../controllers/orders.controller.js');
    const req = mockReq({ customer_id: 1, items: [{ product_id: 2, quantity: 1 }] });
    const res = mockRes();
    await createOrderController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('create returns 400 when stock insufficient', async () => {
    await jest.unstable_mockModule('../../services/orders.service.js', () => ({
      createOrder: jest.fn(),
      listOrders: jest.fn(),
    }));
    const svc = await import('../../services/orders.service.js');
    (svc as any).createOrder.mockRejectedValue(Object.assign(new Error('Insufficient stock'), { status: 400 }));
    const { createOrderController } = await import('../../controllers/orders.controller.js');
    const req = mockReq({ customer_id: 1, items: [{ product_id: 2, quantity: 9 }] });
    const res = mockRes();
    await createOrderController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('list returns 200', async () => {
    await jest.unstable_mockModule('../../services/orders.service.js', () => ({
      createOrder: jest.fn(),
      listOrders: jest.fn(),
    }));
    const svc = await import('../../services/orders.service.js');
    (svc as any).listOrders.mockResolvedValue([{ id: 1 }]);
    const { listOrdersController } = await import('../../controllers/orders.controller.js');
    const req = mockReq({}, {}, { customer_id: '1' });
    const res = mockRes();
    await listOrdersController(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
