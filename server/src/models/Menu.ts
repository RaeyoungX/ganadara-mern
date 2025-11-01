import { Schema, model, Document, Types } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: Types.ObjectId;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Menu = model<IMenu>('Menu', menuSchema);
