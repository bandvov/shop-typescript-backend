import { model, Schema } from 'mongoose';
import { IProduct } from '../types/product';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    discount: {
      type: String,
    },
    discountAvailable: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: false,
    },
    availableCount: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: [String],
      ref: 'Users',
    },
    colors: {
      type: [String],
      ref: 'Colors',
    },
    images: {
      type: [String],
    },
    thumbnails: {
      type: [String],
    },
    sizes: {
      type: [String],
      required: true,
    },
    sleepingPlace: {
      type: Boolean,
    },
    seating: {
      type: Boolean,
    },
    frame: {
      type: String,
    },
    mechanism: {
      type: String,
    },
    legsMaterial: {
      type: String,
    },
    pillowFilling: {
      type: String,
    },
    linenBox: {
      type: Boolean,
      default: false,
    },
    usbCharger: {
      type: Boolean,
      default: false,
    },
    removableCover: {
      type: Boolean,
      default: false,
    },
    decorationPillows: {
      type: Boolean,
      default: false,
    },
    deliveryOption: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true },
);

export default model<IProduct>('Products', productSchema, 'Products');
