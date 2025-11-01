import { Router } from 'express';
import { createOrder, getMyOrders, payOrder, updateOrderStatus, getAllOrders } from '../controllers/order.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// 用户操作
router.post('/orders', authMiddleware, createOrder);
router.get('/orders/me', authMiddleware, getMyOrders);

// ✅ 模拟支付
router.post('/orders/:id/pay', authMiddleware, payOrder);

// ✅ 商家操作
router.patch('/orders/:id/status', updateOrderStatus);
router.get('/orders', getAllOrders);

export default router;
