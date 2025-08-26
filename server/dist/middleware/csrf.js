"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCsrfToken = setCsrfToken;
exports.verifyCsrf = verifyCsrf;
const crypto_1 = require("crypto");
const CSRF_COOKIE = 'csrf_token';
const CSRF_HEADER = 'x-csrf-token';
// Generates/sets a CSRF token cookie if missing
function setCsrfToken(req, res, next) {
    const existing = req.cookies?.[CSRF_COOKIE];
    if (!existing) {
        const token = (0, crypto_1.randomBytes)(24).toString('hex');
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie(CSRF_COOKIE, token, {
            httpOnly: false, // must be readable by client to send back via header
            sameSite: isProd ? 'lax' : 'lax',
            secure: isProd,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });
    }
    next();
}
// Verifies CSRF on state-changing requests using double-submit cookie pattern
function verifyCsrf(exclusions = []) {
    return (req, res, next) => {
        const method = req.method.toUpperCase();
        if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS')
            return next();
        // Exclusions (e.g., payment IPN callbacks that do not use browser cookies)
        const isExcluded = exclusions.some((ex) => {
            const methodOk = !ex.method || ex.method.toUpperCase() === method;
            return methodOk && req.path.startsWith(ex.pathStartsWith);
        });
        if (isExcluded)
            return next();
        const cookieToken = req.cookies?.[CSRF_COOKIE];
        const headerToken = req.headers[CSRF_HEADER] || req.headers['X-CSRF-Token'];
        if (!cookieToken || !headerToken || cookieToken !== headerToken) {
            return res.status(403).json({ message: 'CSRF token mismatch' });
        }
        next();
    };
}
//# sourceMappingURL=csrf.js.map