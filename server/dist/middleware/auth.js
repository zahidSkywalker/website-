"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireAdmin = requireAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function requireAuth(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.auth = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
function requireAdmin(req, res, next) {
    if (!req.auth)
        return res.status(401).json({ message: 'Unauthorized' });
    if (req.auth.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    next();
}
//# sourceMappingURL=auth.js.map