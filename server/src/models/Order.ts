import mongoose, { Schema, Document, Model } from 'mongoose';

export interface OrderItem {
  productId: mongoose.Types.ObjectId;
  title: string;
  image?: string;
  unitPrice: number; // BDT
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string; // e.g., Dhaka, Chittagong
  area?: string;
  postalCode?: string;
}

export interface OrderDocument extends Document {
  userId?: mongoose.Types.ObjectId;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: 'BDT';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  fulfillmentStatus: 'unfulfilled' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  image: { type: String },
  unitPrice: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const ShippingSchema = new Schema<ShippingAddress>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  area: { type: String },
  postalCode: { type: String },
}, { _id: false });

const OrderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, enum: ['BDT'], default: 'BDT' },
    paymentStatus: { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
    fulfillmentStatus: { type: String, enum: ['unfulfilled','processing','shipped','delivered','cancelled'], default: 'unfulfilled' },
    shippingAddress: { type: ShippingSchema, required: true },
  },
  { timestamps: true }
);

export const Order: Model<OrderDocument> =
  mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

