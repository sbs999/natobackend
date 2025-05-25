import { RequestHandler } from "express";
import ProductWithPricesSchema from "../models/ProductWithPricesSchema";
import { Types } from "mongoose";

// Request body for adding a product
interface AddProductBody {
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string; // ObjectId string
}

export const addProduct: RequestHandler<{}, {}, AddProductBody> = async (
  req,
  res,
  next
) => {
  const { name, description, imageUrl, category } = req.body;

  try {
    if (!name) throw new Error("Name is required");

    const product = new ProductWithPricesSchema({
      name,
      description,
      imageUrl,
      category,
      history: [],
    });

    const result = await product.save();
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductWithPricesSchema.find().populate("category");
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const product = await ProductWithPricesSchema.findById(
      req.params.id
    ).populate("category");
    if (!product) throw new Error("Product not found");
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// Request body for updating a product
interface UpdateProductBody {
  id: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
}

export const updateProduct: RequestHandler<{}, {}, UpdateProductBody> = async (
  req,
  res,
  next
) => {
  const { id, name, description, imageUrl, category } = req.body;

  try {
    const product = await ProductWithPricesSchema.findById(id);
    if (!product) throw new Error("Product not found");

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;

    if (category !== undefined) {
      if (!Types.ObjectId.isValid(category)) {
        throw new Error("Invalid category id");
      }
      product.category = new Types.ObjectId(category);
    }

    const result = await product.save();
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

export const removeProduct: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    await ProductWithPricesSchema.findByIdAndDelete(req.params.id);
    res.json({ result: "Product removed successfully" });
  } catch (error) {
    next(error);
  }
};

type AddHistoryBody = {
  shopName: string;
  purchasePrice: number;
  sellingPrice: number;
  description?: string;
};

// PriceHistory controllers
export const addPriceHistory: RequestHandler<
  { productId: string },
  {},
  AddHistoryBody
> = async (req, res, next) => {
  const { productId } = req.params;
  const { shopName, purchasePrice, sellingPrice, description } = req.body;
  try {
    const product = await ProductWithPricesSchema.findById(productId);
    if (!product) throw new Error("Product not found");

    // Push directly, using non-null assertion since schema defines a default
    product.history!.push({
      shopName,
      purchasePrice,
      sellingPrice,
      description,
    });

    const result = await product.save();
    res.json({ history: result.history });
  } catch (error) {
    next(error);
  }
};

export const removePriceHistory: RequestHandler<{
  productId: string;
  historyId: string;
}> = async (req, res, next) => {
  const { productId, historyId } = req.params;
  try {
    const product = await ProductWithPricesSchema.findById(productId);
    if (!product) throw new Error("Product not found");

    // Use non-null assertion and Mongoose subdoc removal
    const entry = product.history!.id(historyId);
    if (!entry) throw new Error("History entry not found");
    entry.remove();

    const result = await product.save();
    res.json({ history: result.history });
  } catch (error) {
    next(error);
  }
};
