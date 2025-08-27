"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const Product_1 = require("../models/Product");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// List with filters
router.get('/', async (req, res) => {
    const page = Math.max(parseInt(String(req.query.page || '1')), 1);
    const limit = Math.min(Math.max(parseInt(String(req.query.limit || '24')), 1), 60);
    const sort = String(req.query.sort || '-createdAt');
    const q = String(req.query.q || '').trim();
    const category = String(req.query.category || '');
    const filter = { isActive: true };
    if (q)
        filter['title'] = { $regex: q, $options: 'i' };
    if (category)
        filter['categoryId'] = category;
    const [items, total] = await Promise.all([
        Product_1.Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
        Product_1.Product.countDocuments(filter),
    ]);
    res.json({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});
// Get by slug
router.get('/:slug', async (req, res) => {
    const product = await Product_1.Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product)
        return res.status(404).json({ message: 'Not found' });
    res.json(product);
});
// Admin: create product
const productSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    slug: zod_1.z.string().min(2),
    description: zod_1.z.string().optional(),
    categoryId: zod_1.z.string(),
    brand: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string()).default([]),
    sizes: zod_1.z.array(zod_1.z.string()).default([]),
    colors: zod_1.z.array(zod_1.z.string()).default([]),
    price: zod_1.z.object({ amount: zod_1.z.number().nonnegative(), currency: zod_1.z.literal('BDT') }),
    compareAtPrice: zod_1.z.object({ amount: zod_1.z.number().nonnegative(), currency: zod_1.z.literal('BDT') }).optional(),
    stock: zod_1.z.number().int().nonnegative().default(0),
    isActive: zod_1.z.boolean().default(true),
});
router.post('/', auth_1.requireAuth, auth_1.requireAdmin, async (req, res) => {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const created = await Product_1.Product.create(parsed.data);
    res.status(201).json(created);
});
exports.default = router;
//# sourceMappingURL=products.js.map