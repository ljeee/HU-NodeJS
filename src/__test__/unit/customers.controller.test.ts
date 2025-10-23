import { jest, describe, test, expect } from '@jest/globals';
import { createCustomerController, getCustomersController, updateCustomerController } from '../../controllers/customers.controller.js';
import * as customersService from '../../services/customers.service.js';

const mockReq = (body = {}, params = {}) => ({ body, params } as any);
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Customers Controller', () => {
  afterEach(() => jest.clearAllMocks());

  test('create returns 201', async () => {
    jest.spyOn(customersService, 'createCustomer').mockResolvedValue({ id: 1, name: 'John' } as any);
    const req = mockReq({ name: 'John' });
    const res = mockRes();
    await createCustomerController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('list returns 200 with data', async () => {
    jest.spyOn(customersService, 'listCustomers').mockResolvedValue([{ id: 1, name: 'John' }] as any);
    const req = mockReq();
    const res = mockRes();
    await getCustomersController(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  test('update not found returns 404', async () => {
    jest.spyOn(customersService, 'updateCustomer').mockRejectedValue(Object.assign(new Error('Customer not found'), { status: 404 }));
    const req = mockReq({ name: 'Jane' }, { id: '99' });
    const res = mockRes();
    await updateCustomerController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('get by id returns 200', async () => {
    const { getCustomerController } = await import('../../controllers/customers.controller.js');
    jest.spyOn(customersService, 'getCustomerById').mockResolvedValue({ id: 1, name: 'John' } as any);
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await getCustomerController(req as any, res as any);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  test('get by id returns 404', async () => {
    const { getCustomerController } = await import('../../controllers/customers.controller.js');
    jest.spyOn(customersService, 'getCustomerById').mockResolvedValue(null as any);
    const req = mockReq({}, { id: '99' });
    const res = mockRes();
    await getCustomerController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('delete returns 204', async () => {
    const { deleteCustomerController } = await import('../../controllers/customers.controller.js');
    jest.spyOn(customersService, 'deleteCustomer').mockResolvedValue(undefined as any);
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await deleteCustomerController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
