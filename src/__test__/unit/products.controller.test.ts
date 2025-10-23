import { jest, describe, it, expect } from '@jest/globals';

// ESM-safe mocking: declare the mock factory before importing the module under test
// We'll call unstable_mockModule inside each test to ensure a fresh mock per spec

describe('Products Controller', () => {
  beforeEach(() => { jest.resetModules(); });
  const mockReq = (body = {}, params = {}) => ({ body, params } as any);
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should create product and return 201', async () => {
    await jest.unstable_mockModule('../../services/products.service.js', () => ({
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      getProductById: jest.fn(),
      listProducts: jest.fn(),
      updateProduct: jest.fn(),
    }));
    const svc = await import('../../services/products.service.js');
  (svc as any).createProduct.mockResolvedValue({ id: 1, code: 'P-001', name: 'Test', price: 1, stock: 1 });
    const { createProductController } = await import('../../controllers/products.controller.js');
    const req = mockReq({ code: 'P-001', name: 'Test', price: 1, stock: 1 });
    const res = mockRes();
    await createProductController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: 'P-001' }));
  });

  it('should handle duplicate code error', async () => {
    await jest.unstable_mockModule('../../services/products.service.js', () => ({
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      getProductById: jest.fn(),
      listProducts: jest.fn(),
      updateProduct: jest.fn(),
    }));
    const svc = await import('../../services/products.service.js');
  (svc as any).createProduct.mockRejectedValue(Object.assign(new Error('Product code already exists'), { status: 400 }));
    const { createProductController } = await import('../../controllers/products.controller.js');
    const req = mockReq({ code: 'DUPLICATE', name: 'Test', price: 1, stock: 1 });
    const res = mockRes();
    await createProductController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Product code already exists' }));
  });

  it('should list products', async () => {
    await jest.unstable_mockModule('../../services/products.service.js', () => ({
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      getProductById: jest.fn(),
      listProducts: jest.fn(),
      updateProduct: jest.fn(),
    }));
    const svc = await import('../../services/products.service.js');
  (svc as any).listProducts.mockResolvedValue([{ id: 1, code: 'P-001', name: 'Test', price: 1, stock: 1 }]);
    const { getProductsController } = await import('../../controllers/products.controller.js');
    const req = mockReq();
    const res = mockRes();
    await getProductsController(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ code: 'P-001' })]));
  });

  it('get by id returns 404 when not found', async () => {
    await jest.unstable_mockModule('../../services/products.service.js', () => ({
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      getProductById: jest.fn(),
      listProducts: jest.fn(),
      updateProduct: jest.fn(),
    }));
    const svc = await import('../../services/products.service.js');
  (svc as any).getProductById.mockResolvedValue(null);
    const { getProductController } = await import('../../controllers/products.controller.js');
    const req = mockReq({}, { id: '99' });
    const res = mockRes();
    await getProductController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('update returns 200', async () => {
    await jest.unstable_mockModule('../../services/products.service.js', () => ({
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      getProductById: jest.fn(),
      listProducts: jest.fn(),
      updateProduct: jest.fn(),
    }));
    const svc = await import('../../services/products.service.js');
  (svc as any).updateProduct.mockResolvedValue({ id: 1 });
    const { updateProductController } = await import('../../controllers/products.controller.js');
    const req = mockReq({ name: 'X' }, { id: '1' });
    const res = mockRes();
    await updateProductController(req as any, res as any);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('delete returns 204', async () => {
    await jest.unstable_mockModule('../../services/products.service.js', () => ({
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      getProductById: jest.fn(),
      listProducts: jest.fn(),
      updateProduct: jest.fn(),
    }));
    const svc = await import('../../services/products.service.js');
  (svc as any).deleteProduct.mockResolvedValue(undefined);
    const { deleteProductController } = await import('../../controllers/products.controller.js');
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await deleteProductController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
