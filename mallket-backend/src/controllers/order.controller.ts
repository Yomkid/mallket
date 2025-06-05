import { Request, Response } from 'express';
import orderService from '../services/order.service';

export const createOrder = (req: any, res: Response) => orderService.createOrder(req, res);
export const getOrders = (req: any, res: Response) => orderService.getOrders(req, res);
