"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const Order_1 = require("../models/Order");
const router = (0, express_1.Router)();
const createSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({ productId: zod_1.z.string(), title: zod_1.z.string(), image: zod_1.z.string().optional(), unitPrice: zod_1.z.number().nonnegative(), quantity: zod_1.z.number().int().positive() })).min(1),
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
router.post('/', async (req, res) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const { items, shippingAddress, shippingFee } = parsed.data;
    const subtotal = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
    const total = subtotal + shippingFee;
    const order = await Order_1.Order.create({
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
    const orders = await Order_1.Order.find().sort('-createdAt').limit(100);
    res.json(orders);
});
exports.default = router;
//# sourceMappingURL=orders.js.map