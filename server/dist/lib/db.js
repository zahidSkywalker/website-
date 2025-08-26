"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
async function connectDatabase() {
    if (mongoose_1.default.connection.readyState === 1)
        return;
    mongoose_1.default.set('strictQuery', true);
    await mongoose_1.default.connect(env_1.env.mongoUri);
}
mongoose_1.default.connection.on('connected', () => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
});
mongoose_1.default.connection.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error', err);
});
//# sourceMappingURL=db.js.map