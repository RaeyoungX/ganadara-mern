import { Schema, model, Document } from 'mongoose';

// 1️⃣ 定义用户类型（TS 类型安全）
export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ 定义 Schema
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    addresses: [{ type: String }]
  },
  { timestamps: true } // 自动生成 createdAt / updatedAt
);

// 3️⃣ 创建并导出模型
export const User = model<IUser>('User', userSchema);
