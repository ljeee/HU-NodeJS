import { jest, describe, test, expect } from '@jest/globals';

const mockReq = (body = {}, params = {}) => ({ body, params } as any);
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Customers Controller', () => {
  beforeEach(() => { jest.resetModules(); });
  afterEach(() => jest.clearAllMocks());

  test('create returns 201', async () => {
    await jest.unstable_mockModule('../../services/customers.service.js', () => ({
      createCustomer: jest.fn(),
      listCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    }));
    const svc = await import('../../services/customers.service.js');
    (svc as any).createCustomer.mockResolvedValue({ id: 1, name: 'John' });
    const { createCustomerController } = await import('../../controllers/customers.controller.js');
    const req = mockReq({ name: 'John' });
    const res = mockRes();
    await createCustomerController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('list returns 200 with data', async () => {
    await jest.unstable_mockModule('../../services/customers.service.js', () => ({
      createCustomer: jest.fn(),
      listCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    }));
    const svc = await import('../../services/customers.service.js');
    (svc as any).listCustomers.mockResolvedValue([{ id: 1, name: 'John' }]);
    const { getCustomersController } = await import('../../controllers/customers.controller.js');
    const req = mockReq();
    const res = mockRes();
    await getCustomersController(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  test('update not found returns 404', async () => {
    await jest.unstable_mockModule('../../services/customers.service.js', () => ({
      createCustomer: jest.fn(),
      listCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    }));
    const svc = await import('../../services/customers.service.js');
    (svc as any).updateCustomer.mockRejectedValue(Object.assign(new Error('Customer not found'), { status: 404 }));
    const { updateCustomerController } = await import('../../controllers/customers.controller.js');
    const req = mockReq({ name: 'Jane' }, { id: '99' });
    const res = mockRes();
    await updateCustomerController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('get by id returns 200', async () => {
    await jest.unstable_mockModule('../../services/customers.service.js', () => ({
      createCustomer: jest.fn(),
      listCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    }));
    const svc = await import('../../services/customers.service.js');
    (svc as any).getCustomerById.mockResolvedValue({ id: 1, name: 'John' });
    const { getCustomerController } = await import('../../controllers/customers.controller.js');
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await getCustomerController(req as any, res as any);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  test('get by id returns 404', async () => {
    await jest.unstable_mockModule('../../services/customers.service.js', () => ({
      createCustomer: jest.fn(),
      listCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    }));
    const svc = await import('../../services/customers.service.js');
    (svc as any).getCustomerById.mockResolvedValue(null);
    const { getCustomerController } = await import('../../controllers/customers.controller.js');
    const req = mockReq({}, { id: '99' });
    const res = mockRes();
    await getCustomerController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('delete returns 204', async () => {
    await jest.unstable_mockModule('../../services/customers.service.js', () => ({
      createCustomer: jest.fn(),
      listCustomers: jest.fn(),
      getCustomerById: jest.fn(),
      updateCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
    }));
    const svc = await import('../../services/customers.service.js');
    (svc as any).deleteCustomer.mockResolvedValue(undefined);
    const { deleteCustomerController } = await import('../../controllers/customers.controller.js');
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await deleteCustomerController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
