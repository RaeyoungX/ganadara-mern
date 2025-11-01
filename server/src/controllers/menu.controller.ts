import { Request, Response } from 'express';
import { Menu } from '../models/Menu.js';
import { Category } from '../models/Category.js';

// 获取所有菜单
export async function getMenu(req: Request, res: Response) {
  try {
    const menu = await Menu.find().populate('category');
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
}

// 获取分类
export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
