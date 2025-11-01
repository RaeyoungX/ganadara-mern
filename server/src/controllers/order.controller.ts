import { Request, Response } from 'express';
import { Order } from '../models/Order.js';
import { Menu } from '../models/Menu.js';

// 创建订单
export async function createOrder(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { items, deliveryType, address } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ error: 'No items in order' });

    // 计算总价
    let totalPrice = 0;
    for (const item of items) {
      const menu = await Menu.findById(item.menu);
      if (!menu) return res.status(400).json({ error: 'Menu item not found' });
      totalPrice += menu.price * item.quantity;
    }

    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
      deliveryType,
      address,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
}

// 获取当前用户的所有订单
export async function getMyOrders(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const orders = await Order.find({ user: userId })
      .populate('items.menu')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
