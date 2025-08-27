"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const Order_1 = require("../models/Order");
const Product_1 = require("../models/Product");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const createSchema = zod_1.z.object({
    items: zod_1.z
        .array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().int().positive(),
    }))
        .min(1),
    shippingAddress: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        addressLine1: zod_1.z.string(),
        addressLine2: zod_1.z.string().optional(),
        city: zod_1.z.string(),
        area: zod_1.z.string().optional(),
        postalCode: zod_1.z.string().optional(),
    }),
    shippingFee: zod_1.z.number().nonnegative().default(0),
});
router.post('/', async (req, res, next) => {
    try {
        const parsed = createSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json(parsed.error.flatten());
        const { items, shippingAddress, shippingFee } = parsed.data;
        const productIds = items.map((it) => it.productId);
        const products = await Product_1.Product.find({ _id: { $in: productIds } }).lean();
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
        const order = await Order_1.Order.create({
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
    }
    catch (err) {
        next(err);
    }
});
router.get('/', auth_1.requireAuth, auth_1.requireAdmin, async (_req, res) => {
    const orders = await Order_1.Order.find().sort('-createdAt').limit(100);
    res.json(orders);
});
exports.default = router;
//# sourceMappingURL=orders.js.map