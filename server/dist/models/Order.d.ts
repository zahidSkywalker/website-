import mongoose, { Document, Model } from 'mongoose';
export interface OrderItem {
    productId: mongoose.Types.ObjectId;
    title: string;
    image?: string;
    unitPrice: number;
    quantity: number;
}
export interface ShippingAddress {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
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
export declare const Order: Model<OrderDocument>;
//# sourceMappingURL=Order.d.ts.map