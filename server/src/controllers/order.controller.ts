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

/**
 *   模拟支付（前端点击“支付”后调用）
 * 将订单状态从 pending → paid
 */
export async function payOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const order = await Order.findOne({ _id: id, user: userId });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Order is not pending' });
    }

    order.status = 'paid';
    await order.save();

    res.json({ message: 'Payment successful', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process payment' });
  }
}

/**
 *   商家更新订单状态
 * 比如：paid → confirmed → completed
 */
export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'paid', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
}

/**
 *  获取所有订单（商家端）
 */
export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .populate('user', 'email')
      .populate('items.menu')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
