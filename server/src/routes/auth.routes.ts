import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { User } from '../models/ User.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// 测试用：通过 token 获取用户信息
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user?.id).select('-passwordHash');
  res.json({ user });
});

export default router;
