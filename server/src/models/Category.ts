import mongoose, { Schema, Document, Model } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  slug: string;
  description?: string;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Category: Model<CategoryDocument> =
  mongoose.models.Category || mongoose.model<CategoryDocument>('Category', CategorySchema);

