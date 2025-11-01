import { Schema, model, Document, Types } from 'mongoose';

export interface IOrderItem {
  menu: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        menu: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true },
    deliveryType: { type: String, enum: ['pickup', 'delivery'], required: true },
    address: { type: String },
    status: {
    type: String,
    enum: ['pending', 'paid', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',},
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);
