"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const schema = zod_1.z.object({
    amount: zod_1.z.number().positive(),
    currency: zod_1.z.literal('BDT'),
    orderId: zod_1.z.string(),
    method: zod_1.z.enum(['cod', 'sslcommerz']).default('cod'),
});
router.post('/create-session', async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const { method, amount, currency, orderId } = parsed.data;
    if (method === 'cod') {
        return res.json({ provider: 'cod', redirectUrl: null, orderId, amount, currency });
    }
    // SSLCommerz integration (init). In production, call /gwprocess/v4/api.php
    if (!process.env.SSLCZ_STORE_ID || !process.env.SSLCZ_STORE_PASSWD) {
        return res.status(501).json({ message: 'SSLCommerz not configured' });
    }
    // TODO: Exchange with SSLCommerz init API and return GatewayPageURL from response
    return res.json({ provider: 'sslcommerz', redirectUrl: 'https://sandbox.sslcommerz.com/redirect/mock', orderId, amount, currency });
});
// SSLCommerz IPN/Validation callback (server-to-server). Excluded from CSRF.
// This endpoint should verify the transaction with SSLCommerz validation API, then update order paymentStatus accordingly.
router.post('/ipn', async (req, res) => {
    // TODO: Verify IPN data with SSLCommerz validation endpoint using val_id
    // If valid and status is VALID/VALIDATED, mark order as paid, else failed
    res.status(204).end();
});
exports.default = router;
//# sourceMappingURL=payments.js.map