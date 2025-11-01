import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/order.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/orders', authMiddleware, createOrder);
router.get('/orders/me', authMiddleware, getMyOrders);

export default router;
