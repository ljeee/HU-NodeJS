import { jest, describe, test, expect } from '@jest/globals';
let mockModels: any;
jest.mock('../../models/init-models.js', () => ({
  initModels: () => mockModels,
}));

describe('Products Service', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('listProducts returns items from model', async () => {
    const mockProducts = [{ id: 1, code: 'P-001', name: 'Test', price: 1, stock: 1 }];
  mockModels = { products: { findAll: (jest.fn() as any).mockResolvedValue(mockProducts) } };
    const svc = await import('../../services/products.service.js');
    const result = await svc.listProducts();
    expect(result).toEqual(mockProducts);
  });

  test('createProduct throws when code exists', async () => {
  mockModels = { products: { findOne: (jest.fn() as any).mockResolvedValue({ id: 99, code: 'DUP' }) } };
    const svc = await import('../../services/products.service.js');
    await expect(
      svc.createProduct({ code: 'DUP', name: 'X', price: 10, stock: 5 } as any)
    ).rejects.toThrow('Product code already exists');
  });

  test('createProduct creates when code is unique', async () => {
    const created = { id: 2, code: 'P-002', name: 'Y', price: 20, stock: 3 };
  mockModels = { products: { findOne: (jest.fn() as any).mockResolvedValue(null), create: (jest.fn() as any).mockResolvedValue(created) } };
    const svc = await import('../../services/products.service.js');
    const result = await svc.createProduct({ code: 'P-002', name: 'Y', price: 20, stock: 3 } as any);
    expect(result).toEqual(created);
  });

  test('updateProduct throws when not found', async () => {
  mockModels = { products: { findByPk: (jest.fn() as any).mockResolvedValue(null) } };
    const svc = await import('../../services/products.service.js');
    await expect(svc.updateProduct(1, { name: 'Z' })).rejects.toHaveProperty('status', 404);
  });

  test('updateProduct throws when code duplicated', async () => {
    const existing = { id: 1, code: 'OLD', name: 'A', price: 1, stock: 1 };
    mockModels = {
      products: {
  findByPk: (jest.fn() as any).mockResolvedValue(existing),
  findOne: (jest.fn() as any).mockResolvedValue({ id: 9, code: 'NEW' }),
      },
    };
    const svc = await import('../../services/products.service.js');
    await expect(svc.updateProduct(1, { code: 'NEW' } as any)).rejects.toHaveProperty('status', 400);
  });

  test('updateProduct updates and returns item', async () => {
  const update = (jest.fn() as any).mockResolvedValue(undefined);
    const current = { id: 1, code: 'A', name: 'A', price: 1, stock: 1, update } as any;
    mockModels = {
      products: {
  findByPk: (jest.fn() as any).mockResolvedValue(current),
  findOne: (jest.fn() as any).mockResolvedValue(null),
      },
    };
    const svc = await import('../../services/products.service.js');
    const out = await svc.updateProduct(1, { name: 'B' });
    expect(update).toHaveBeenCalledWith({ name: 'B' });
    expect(out).toBe(current);
  });

  test('deleteProduct throws when not found', async () => {
  mockModels = { products: { findByPk: (jest.fn() as any).mockResolvedValue(null) } };
    const svc = await import('../../services/products.service.js');
    await expect(svc.deleteProduct(1)).rejects.toHaveProperty('status', 404);
  });

  test('deleteProduct removes when found', async () => {
  const destroy = (jest.fn() as any).mockResolvedValue(undefined);
  mockModels = { products: { findByPk: (jest.fn() as any).mockResolvedValue({ destroy }) } };
    const svc = await import('../../services/products.service.js');
    await svc.deleteProduct(1);
    expect(destroy).toHaveBeenCalled();
  });
});
