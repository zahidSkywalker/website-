import { Router } from 'express';
import { z } from 'zod';
import { Category } from '../models/Category';
import { requireAdmin, requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Category.find().sort('name');
  res.json(items);
});

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const created = await Category.create(parsed.data);
  res.status(201).json(created);
});

export default router;

