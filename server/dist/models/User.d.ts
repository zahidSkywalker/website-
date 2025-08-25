import mongoose, { Document, Model } from 'mongoose';
export interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: Model<UserDocument>;
//# sourceMappingURL=User.d.ts.map