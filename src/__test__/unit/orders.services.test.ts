import { jest, describe, test, expect } from '@jest/globals';
let mockModels: any;

describe('Orders Service', () => {
  beforeEach(() => { jest.resetModules(); });
  afterEach(() => { jest.resetModules(); jest.clearAllMocks(); });

  test('createOrder throws when insufficient stock', async () => {
    mockModels = {
      orders: { create: (jest.fn() as any) },
      order_details: { create: (jest.fn() as any) },
      products: { findByPk: (jest.fn() as any).mockResolvedValue({ id: 2, code: 'P-001', stock: 1 }) },
    };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    await jest.unstable_mockModule('../../config/dbconect.js', () => ({ sequelize: { transaction: async (fn: any) => await fn({}) } }));
    const svc = await import('../../services/orders.service.js');
    await expect(
      svc.createOrder({ customer_id: 1, items: [{ product_id: 2, quantity: 3 }] })
    ).rejects.toThrow('Insufficient stock');
  });

  test('createOrder reduces inventory and returns order', async () => {
    const mockUpdate = (jest.fn() as any);
    mockModels = {
      orders: { create: (jest.fn() as any).mockResolvedValue({ id: 10, update: (jest.fn() as any) }) },
      order_details: { create: (jest.fn() as any) },
      products: { findByPk: (jest.fn() as any).mockResolvedValue({ id: 2, code: 'P-001', stock: 5, price: 100, update: mockUpdate }) },
    };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    await jest.unstable_mockModule('../../config/dbconect.js', () => ({ sequelize: { transaction: async (fn: any) => await fn({}) } }));
    const svc = await import('../../services/orders.service.js');
    const order = await svc.createOrder({ customer_id: 1, items: [{ product_id: 2, quantity: 2 }] });
    expect(order.id).toBe(10);
    expect(mockUpdate).toHaveBeenCalledWith({ stock: 3 }, expect.any(Object));
  });

  test('listOrders returns data', async () => {
    const data = [{ id: 1 }];
    mockModels = { orders: { findAll: (jest.fn() as any).mockResolvedValue(data) }, order_details: {}, products: {} };
    await jest.unstable_mockModule('../../models/init-models.js', () => ({ initModels: () => mockModels }));
    await jest.unstable_mockModule('../../config/dbconect.js', () => ({ sequelize: { transaction: async (fn: any) => await fn({}) } }));
    const svc = await import('../../services/orders.service.js');
    const out = await svc.listOrders({ customer_id: 1 });
    expect(out).toEqual(data);
  });
});
