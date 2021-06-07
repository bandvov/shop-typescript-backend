import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  brand: string;
  sku: string;
  discount: string;
  description: string;
  available: boolean;
  availableCount: number;
  favorites: string[];
  colors: string[];
  images: string[];
  thumbnails: string[];
  sizes: string[];
  sleepingPlace: boolean;
  seating: boolean;
  frame: string;
  mechanism: string;
  legsMaterial: string;
  pillowFilling: string;
  linenBox: boolean;
  usbCharger: boolean;
  removableCover: boolean;
  decorationPillows: boolean;
  deliveryOption: string;
  manufacturer: string;
  price: number;
  discountAvailable: boolean;
}
