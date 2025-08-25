import { Router } from 'express';
import { z } from 'zod';
import { Order } from '../models/Order';

const router = Router();

const createSchema = z.object({
  items: z.array(z.object({ productId: z.string(), title: z.string(), image: z.string().optional(), unitPrice: z.number().nonnegative(), quantity: z.number().int().positive() })).min(1),
  shippingAddress: z.object({
    name: z.string(),
    phone: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    area: z.string().optional(),
    postalCode: z.string().optional(),
  }),
  shippingFee: z.number().nonnegative().default(0),
});

router.post('/', async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const { items, shippingAddress, shippingFee } = parsed.data;
  const subtotal = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  const total = subtotal + shippingFee;
  const order = await Order.create({
    items,
    shippingAddress,
    subtotal,
    shippingFee,
    total,
    currency: 'BDT',
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
  });
  res.status(201).json(order);
});

router.get('/', async (_req, res) => {
  const orders = await Order.find().sort('-createdAt').limit(100);
  res.json(orders);
});

export default router;

