"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const router = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
router.post('/register', async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const { name, email, password } = parsed.data;
    const existing = await User_1.User.findOne({ email });
    if (existing)
        return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.User.create({ name, email, passwordHash });
    const token = jsonwebtoken_1.default.sign({ userId: String(user._id), role: user.role }, env_1.env.jwtSecret, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: env_1.env.nodeEnv === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
router.post('/login', async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const { email, password } = parsed.data;
    const user = await User_1.User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!valid)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ userId: String(user._id), role: user.role }, env_1.env.jwtSecret, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: env_1.env.nodeEnv === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
router.post('/logout', (_req, res) => {
    res.clearCookie('token');
    res.status(204).end();
});
exports.default = router;
//# sourceMappingURL=auth.js.map