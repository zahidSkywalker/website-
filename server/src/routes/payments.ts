import { Router } from 'express'
import { z } from 'zod'

const router = Router()

const schema = z.object({
  amount: z.number().positive(),
  currency: z.literal('BDT'),
  orderId: z.string(),
  method: z.enum(['cod', 'sslcommerz']).default('cod'),
})

router.post('/create-session', async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json(parsed.error.flatten())
  const { method, amount, currency, orderId } = parsed.data

  if (method === 'cod') {
    return res.json({ provider: 'cod', redirectUrl: null, orderId, amount, currency })
  }

  // Placeholder for SSLCommerz integration
  if (!process.env.SSLCZ_STORE_ID || !process.env.SSLCZ_STORE_PASSWD) {
    return res.status(501).json({ message: 'SSLCommerz not configured' })
  }
  // In production: call SSLCommerz init API and return GatewayPageURL
  return res.json({ provider: 'sslcommerz', redirectUrl: 'https://sandbox.sslcommerz.com/redirect/mock', orderId, amount, currency })
})

export default router

