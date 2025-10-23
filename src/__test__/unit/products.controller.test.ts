import { jest, describe, it, expect } from '@jest/globals';
import { createProductController, getProductsController } from '../../controllers/products.controller.js';
import * as productsService from '../../services/products.service.js';

describe('Products Controller', () => {
  const mockReq = (body = {}, params = {}) => ({ body, params } as any);
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should create product and return 201', async () => {
    jest.spyOn(productsService, 'createProduct').mockResolvedValue({ id: 1, code: 'P-001', name: 'Test', price: 1, stock: 1 } as any);
    const req = mockReq({ code: 'P-001', name: 'Test', price: 1, stock: 1 });
    const res = mockRes();
    await createProductController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: 'P-001' }));
  });

  it('should handle duplicate code error', async () => {
    jest.spyOn(productsService, 'createProduct').mockRejectedValue(Object.assign(new Error('Product code already exists'), { status: 400 }));
    const req = mockReq({ code: 'DUPLICATE', name: 'Test', price: 1, stock: 1 });
    const res = mockRes();
    await createProductController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Product code already exists' }));
  });

  it('should list products', async () => {
    jest.spyOn(productsService, 'listProducts').mockResolvedValue([{ id: 1, code: 'P-001', name: 'Test', price: 1, stock: 1 }] as any);
    const req = mockReq();
    const res = mockRes();
    await getProductsController(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ code: 'P-001' })]));
  });

  it('get by id returns 404 when not found', async () => {
    const { getProductController } = await import('../../controllers/products.controller.js');
    jest.spyOn(productsService, 'getProductById').mockResolvedValue(null as any);
    const req = mockReq({}, { id: '99' });
    const res = mockRes();
    await getProductController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('update returns 200', async () => {
    const { updateProductController } = await import('../../controllers/products.controller.js');
    jest.spyOn(productsService, 'updateProduct').mockResolvedValue({ id: 1 } as any);
    const req = mockReq({ name: 'X' }, { id: '1' });
    const res = mockRes();
    await updateProductController(req as any, res as any);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('delete returns 204', async () => {
    const { deleteProductController } = await import('../../controllers/products.controller.js');
    jest.spyOn(productsService, 'deleteProduct').mockResolvedValue(undefined as any);
    const req = mockReq({}, { id: '1' });
    const res = mockRes();
    await deleteProductController(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
