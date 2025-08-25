import mongoose, { Document, Model } from 'mongoose';
export interface Price {
    amount: number;
    currency: 'BDT';
}
export interface ProductDocument extends Document {
    title: string;
    slug: string;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
    brand?: string;
    images: string[];
    sizes: string[];
    colors: string[];
    price: Price;
    compareAtPrice?: Price;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Product: Model<ProductDocument>;
//# sourceMappingURL=Product.d.ts.map