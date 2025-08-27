import { Router } from 'express';
import { z } from 'zod';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { requireAdmin, requireAuth } from '../middleware/auth';

const router = Router();

const createSchema = z.object({
	items: z
		.array(
			z.object({
				productId: z.string(),
				quantity: z.number().int().positive(),
			})
		)
		.min(1),
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

router.post('/', async (req, res, next) => {
	try {
		const parsed = createSchema.safeParse(req.body);
		if (!parsed.success) return res.status(400).json(parsed.error.flatten());
		const { items, shippingAddress, shippingFee } = parsed.data;

		const productIds = items.map((it) => it.productId);
		const products = await Product.find({ _id: { $in: productIds } }).lean();
		const productMap = new Map(products.map((p) => [String(p._id), p]));

		const normalizedItems = items.map((it) => {
			const p = productMap.get(it.productId);
			if (!p) {
				throw Object.assign(new Error('Product not found'), { status: 400 });
			}
			return {
				productId: p._id,
				title: p.title,
				image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : undefined,
				unitPrice: p.price.amount,
				quantity: it.quantity,
			};
		});

		const subtotal = normalizedItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
		const total = subtotal + shippingFee;
		const order = await Order.create({
			items: normalizedItems,
			shippingAddress,
			subtotal,
			shippingFee,
			total,
			currency: 'BDT',
			paymentStatus: 'pending',
			fulfillmentStatus: 'unfulfilled',
		});
		res.status(201).json(order);
	} catch (err) {
		next(err);
	}
});

router.get('/', requireAuth, requireAdmin, async (_req, res) => {
	const orders = await Order.find().sort('-createdAt').limit(100);
	res.json(orders);
});

export default router;

