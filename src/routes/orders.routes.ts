import { Router } from 'express';
import { createOrderController, listOrdersController } from '../controllers/orders.controller.js';

const router = Router();

router.post('/orders', createOrderController);
router.get('/orders', listOrdersController);

export { router };
