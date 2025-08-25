import { Document, Model } from 'mongoose';
export interface CategoryDocument extends Document {
    name: string;
    slug: string;
    description?: string;
}
export declare const Category: Model<CategoryDocument>;
//# sourceMappingURL=Category.d.ts.map