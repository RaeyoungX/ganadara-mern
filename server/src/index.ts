import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from "./config/db.js";
import authRoutes from './routes/auth.routes.js';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/order.routes.js';
 




await connectDB(); // 顶层 await：tsx 运行器支持 ESM async 启动


const app = express();
app.use(cors({ origin: process.env.ORIGIN?.split(',') || true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);


app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`✅ API listening on :${port}`));
