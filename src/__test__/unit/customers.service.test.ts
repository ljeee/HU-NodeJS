import { jest, describe, test, expect } from '@jest/globals';
let mockModels: any;

describe('Customers Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('listCustomers returns items', async () => {
    const mockData = [{ id: 1, name: 'John' }];
    mockModels = { customers: { findAll: (jest.fn() as any).mockResolvedValue(mockData) } };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    const svc = await import('../../services/customers.service.js');
    const result = await svc.listCustomers();
    expect(result).toEqual(mockData);
  });

  test('createCustomer creates', async () => {
    const created = { id: 2, name: 'Jane' };
    mockModels = { customers: { create: (jest.fn() as any).mockResolvedValue(created) } };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    const svc = await import('../../services/customers.service.js');
    const result = await svc.createCustomer({ name: 'Jane' } as any);
    expect(result).toEqual(created);
  });

  test('updateCustomer errors when not found', async () => {
    mockModels = { customers: { findByPk: (jest.fn() as any).mockResolvedValue(null) } };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    const svc = await import('../../services/customers.service.js');
    await expect(svc.updateCustomer(99, { name: 'X' })).rejects.toHaveProperty('status', 404);
  });

  test('updateCustomer updates when found', async () => {
    const update = (jest.fn() as any).mockResolvedValue(undefined);
    mockModels = { customers: { findByPk: (jest.fn() as any).mockResolvedValue({ id: 1, name: 'A', update }) } };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    const svc = await import('../../services/customers.service.js');
    const out = await svc.updateCustomer(1, { name: 'B' });
    expect(update).toHaveBeenCalledWith({ name: 'B' });
    expect(out).toHaveProperty('id', 1);
  });

  test('deleteCustomer removes when found', async () => {
    const destroy = (jest.fn() as any).mockResolvedValue(undefined);
    mockModels = { customers: { findByPk: (jest.fn() as any).mockResolvedValue({ id: 1, destroy }) } };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    const svc = await import('../../services/customers.service.js');
    await svc.deleteCustomer(1);
    expect(destroy).toHaveBeenCalled();
  });

  test('deleteCustomer errors when not found', async () => {
    mockModels = { customers: { findByPk: (jest.fn() as any).mockResolvedValue(null) } };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    const svc = await import('../../services/customers.service.js');
    await expect(svc.deleteCustomer(1)).rejects.toHaveProperty('status', 404);
  });
});
