import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import adminRoutes from './routes/admin.routes';
import notificationRoutes from './routes/notification.routes';

import { errorHandler } from './middlewares/error.middleware';



const app = express();

// In your backend (app.ts/server.ts)
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Required for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD', 'TRACE', 'CONNECT', 'COPY', 'LOCK', 'MKCOL', 'MOVE', 'PROPFIND', 'PROPPATCH', 'SEARCH', 'UNLOCK', 'REPORT', 'FETCH', 'PURGE', 'LINK', 'UNLINK'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('MallKet backend is alive!');
});


app.get('/health', (req, res) => {
  res.status(200).send('MallKet backend is alive!');
});




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);


// Error Handler
app.use(errorHandler);

export default app;
