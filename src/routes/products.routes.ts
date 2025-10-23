import { Router } from 'express';
import { createProductController, deleteProductController, getProductController, getProductsController, updateProductController } from '../controllers/products.controller.js';

const router = Router();

router.get('/products', getProductsController);
router.get('/products/:id', getProductController);
router.post('/products', createProductController);
router.put('/products/:id', updateProductController);
router.delete('/products/:id', deleteProductController);

export { router };
