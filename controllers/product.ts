import { Request, Response } from 'express';
import Product from '../models/Product';
import { IProduct } from '../types/product';
import { skuGenerator } from '../utils/sku-generator';

export const getAllProducts = async (req, res) => {
  const { skip = 0, limit = 12 } = req.body;
  const products: IProduct[] = await Product.find({}).skip(skip).limit(limit);

  return res.status(200).json({ products });
};

export const getProductsForCatalog = async (req, res) => {
  const { skip = 0, limit = 12 } = req.body;

  const products: IProduct[] = await Product.aggregate([
    { $match: { available: true, availableCount: { $gt: 0 } } },
    {
      $project: {
        available: 0,
        availableCount: 0,
        description: 0,
        favorites: 0,
        colors: 0,
        images: 0,
        thumbnails: 0,
        sizes: 0,
        linenBox: 0,
        usbCharger: 0,
        removableCover: 0,
        decorationPillows: 0,
        sku: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  res.status(200).json({ products });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product: IProduct = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json({ product });
};

export const addProduct = async (req: Request, res: Response) => {
  const {
    available,
    availableCount,
    brand,
    category,
    colors,
    decorationPillows,
    deliveryOption,
    description,
    discount,
    discountAvailable,
    frame,
    images,
    manufacturer,
    mechanism,
    name,
    pillowFilling,
    legsMaterial,
    linenBox,
    seating,
    sizes,
    sleepingPlace,
    removableCover,
    thumbnails,
    usbCharger,
    price,
  } = req.body as Pick<
    IProduct,
    | 'available'
    | 'availableCount'
    | 'brand'
    | 'category'
    | 'colors'
    | 'decorationPillows'
    | 'deliveryOption'
    | 'description'
    | 'discount'
    | 'favorites'
    | 'frame'
    | 'images'
    | 'manufacturer'
    | 'mechanism'
    | 'name'
    | 'pillowFilling'
    | 'legsMaterial'
    | 'linenBox'
    | 'seating'
    | 'sizes'
    | 'sleepingPlace'
    | 'removableCover'
    | 'thumbnails'
    | 'usbCharger'
    | 'price'
    | 'discountAvailable'
  >;
  const foundProduct = await Product.findOne({ name });

  if (foundProduct) {
    return res.status(400).json({ message: 'Product already exist' });
  }
  const createdProduct = new Product({
    available,
    availableCount,
    brand,
    category,
    colors,
    decorationPillows,
    deliveryOption,
    description,
    discount,
    frame,
    images,
    manufacturer,
    mechanism,
    name,
    pillowFilling,
    legsMaterial,
    linenBox,
    seating,
    sku: skuGenerator([name, brand, category]),
    sizes,
    sleepingPlace,
    removableCover,
    thumbnails,
    usbCharger,
    price,
    discountAvailable,
  });

  createdProduct.save((err, response) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (response) {
      return res.status(201).json({ message: 'Product added' });
    }
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);

  if (!foundProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const {
    available = false,
    availableCount = 0,
    brand = '',
    category = '',
    colors = [],
    decorationPillows = false,
    deliveryOption = '',
    description = '',
    discount = '',
    discountAvailable = false,
    frame = '',
    images = [],
    manufacturer = '',
    mechanism = '',
    name = '',
    pillowFilling = '',
    legsMaterial = '',
    linenBox = false,
    seating = false,
    sizes = [],
    sleepingPlace = false,
    removableCover = false,
    thumbnails = [],
    usbCharger = false,
    price = 0,
  } = req.body as Pick<
    IProduct,
    | 'available'
    | 'availableCount'
    | 'brand'
    | 'category'
    | 'colors'
    | 'decorationPillows'
    | 'deliveryOption'
    | 'description'
    | 'discount'
    | 'favorites'
    | 'frame'
    | 'images'
    | 'manufacturer'
    | 'mechanism'
    | 'name'
    | 'pillowFilling'
    | 'legsMaterial'
    | 'linenBox'
    | 'seating'
    | 'sizes'
    | 'sleepingPlace'
    | 'removableCover'
    | 'thumbnails'
    | 'usbCharger'
    | 'price'
    | 'discountAvailable'
  >;

  const updatedProduct: IProduct = await Product.findByIdAndUpdate(
    id,
    {
      available,
      availableCount,
      brand,
      category,
      colors,
      decorationPillows,
      deliveryOption,
      description,
      discount,
      frame,
      images,
      manufacturer,
      mechanism,
      name,
      pillowFilling,
      legsMaterial,
      linenBox,
      seating,
      sku: skuGenerator([name, brand, category]),
      sizes,
      sleepingPlace,
      removableCover,
      thumbnails,
      usbCharger,
      price,
      discountAvailable,
    },
    { new: true },
  );

  updatedProduct.save((err, response) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (response) {
      return res.status(201).json({ message: 'Product updated' });
    }
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.setHeader('Content-Type', 'application/json');

  const product: IProduct | null = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json({ message: 'Product successfully deleted' });
};
