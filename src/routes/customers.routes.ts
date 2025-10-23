import { Router } from 'express';
import { createCustomerController, deleteCustomerController, getCustomerController, getCustomersController, updateCustomerController } from '../controllers/customers.controller.js';

const router = Router();

router.get('/customers', getCustomersController);
router.get('/customers/:id', getCustomerController);
router.post('/customers', createCustomerController);
router.put('/customers/:id', updateCustomerController);
router.delete('/customers/:id', deleteCustomerController);

export { router };
