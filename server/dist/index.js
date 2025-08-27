"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const db_1 = require("./lib/db");
const auth_1 = __importDefault(require("./routes/auth"));
const products_1 = __importDefault(require("./routes/products"));
const categories_1 = __importDefault(require("./routes/categories"));
const orders_1 = __importDefault(require("./routes/orders"));
const seo_1 = __importDefault(require("./routes/seo"));
const payments_1 = __importDefault(require("./routes/payments"));
const errors_1 = require("./middleware/errors");
const csrf_1 = require("./middleware/csrf");
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: env_1.env.corsOrigin, credentials: true }));
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
}));
// CSRF: set token cookie for all requests
app.use(csrf_1.setCsrfToken);
// Verify CSRF for state-changing routes, excluding payment IPN callbacks
app.use((0, csrf_1.verifyCsrf)([{ pathStartsWith: '/api/payments/ipn' }]));
app.get('/health', (_req, res) => {
    res.json({ ok: true, uptime: process.uptime() });
});
app.use('/api/auth', auth_1.default);
app.use('/api/products', products_1.default);
app.use('/api/categories', categories_1.default);
app.use('/api/orders', orders_1.default);
app.use('/api/payments', payments_1.default);
app.use('/', seo_1.default);
app.use(errors_1.notFound);
app.use(errors_1.errorHandler);
const PORT = env_1.env.port;
(0, db_1.connectDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`API listening on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map