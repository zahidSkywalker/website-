"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function notFound(_req, res) {
    res.status(404).json({ message: 'Not Found' });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err, _req, res, _next) {
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    if (err instanceof zod_1.ZodError) {
        status = 400;
        message = 'Validation failed';
        return res.status(status).json({ message, errors: err.flatten() });
    }
    // Mongo duplicate key error
    if (err && (err.code === 11000 || err.code === '11000')) {
        status = 409;
        const fields = Object.keys(err.keyPattern || err.keyValue || {});
        message = `Duplicate value for: ${fields.join(', ') || 'unique field'}`;
    }
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(status).json({ message, stack: err.stack });
    }
    res.status(status).json({ message });
}
//# sourceMappingURL=errors.js.map