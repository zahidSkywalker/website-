import { Router } from 'express';
import { z } from 'zod';
import { Product } from '../models/Product';
import { requireAdmin, requireAuth } from '../middleware/auth';

const router = Router();

// List with filters
router.get('/', async (req, res) => {
  const page = Math.max(parseInt(String(req.query.page || '1')), 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '24')), 1), 60);
  const sort = String(req.query.sort || '-createdAt');
  const q = String(req.query.q || '').trim();
  const category = String(req.query.category || '');

  const filter: Record<string, unknown> = { isActive: true };
  if (q) filter['title'] = { $regex: q, $options: 'i' };
  if (category) filter['categoryId'] = category;

  const [items, total] = await Promise.all([
    Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.json({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

// Get by slug
router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// Admin: create product
const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  categoryId: z.string(),
  brand: z.string().optional(),
  images: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  price: z.object({ amount: z.number().nonnegative(), currency: z.literal('BDT') }),
  compareAtPrice: z.object({ amount: z.number().nonnegative(), currency: z.literal('BDT') }).optional(),
  stock: z.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const created = await Product.create(parsed.data);
  res.status(201).json(created);
});

export default router;

