import { Router } from 'express';
import { getMenu, getCategories } from '../controllers/menu.controller.js';

const router = Router();

router.get('/menu', getMenu);
router.get('/categories', getCategories);

export default router;
