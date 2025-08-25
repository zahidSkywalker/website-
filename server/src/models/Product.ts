import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Price {
  amount: number; // stored in BDT
  currency: 'BDT';
}

export interface ProductDocument extends Document {
  title: string;
  slug: string;
  description?: string;
  categoryId: mongoose.Types.ObjectId;
  brand?: string;
  images: string[];
  sizes: string[]; // e.g., S, M, L, XL, 40, 41
  colors: string[];
  price: Price;
  compareAtPrice?: Price;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PriceSchema = new Schema<Price>({
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, enum: ['BDT'], default: 'BDT' },
}, { _id: false });

const ProductSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: String },
    images: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    price: { type: PriceSchema, required: true },
    compareAtPrice: { type: PriceSchema },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product: Model<ProductDocument> =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

