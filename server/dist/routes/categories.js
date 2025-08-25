"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const Category_1 = require("../models/Category");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const items = await Category_1.Category.find().sort('name');
    res.json(items);
});
const schema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    slug: zod_1.z.string().min(2),
    description: zod_1.z.string().optional(),
});
router.post('/', async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const created = await Category_1.Category.create(parsed.data);
    res.status(201).json(created);
});
exports.default = router;
//# sourceMappingURL=categories.js.map