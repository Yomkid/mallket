// src/app.ts
import express from 'express';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import orderRoutes from './routes/order.routes';
import adminRoutes from './routes/admin.routes';




const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
