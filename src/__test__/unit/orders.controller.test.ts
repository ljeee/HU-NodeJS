import { jest, describe, test, expect } from '@jest/globals';
import { createOrderController, listOrdersController } from '../../controllers/orders.controller.js';
import * as ordersService from '../../services/orders.service.js';

const mockReq = (body = {}, params = {}, query = {}) => ({ body, params, query } as any);
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Orders Controller', () => {
  afterEach(() => jest.clearAllMocks());

  test('create returns 201', async () => {
    jest.spyOn(ordersService, 'createOrder').mockResolvedValue({ id: 10 } as any);
    const req = mockReq({ customer_id: 1, items: [{ product_id: 2, quantity: 1 }] });
    const res = mockRes();
    await createOrderController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('create returns 400 when stock insufficient', async () => {
    jest.spyOn(ordersService, 'createOrder').mockRejectedValue(Object.assign(new Error('Insufficient stock'), { status: 400 }));
    const req = mockReq({ customer_id: 1, items: [{ product_id: 2, quantity: 9 }] });
    const res = mockRes();
    await createOrderController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('list returns 200', async () => {
    jest.spyOn(ordersService, 'listOrders').mockResolvedValue([{ id: 1 }] as any);
    const req = mockReq({}, {}, { customer_id: '1' });
    const res = mockRes();
    await listOrdersController(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
