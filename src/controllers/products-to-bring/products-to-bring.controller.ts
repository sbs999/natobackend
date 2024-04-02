import { RequestHandler } from "express";
import {
  CreateProductCredentials,
  IUpdateProductData,
} from "../../interfaces/products-to-bring";
import * as ProductCategories from "./product-categories.controller";
import * as ProductPurchaseLocations from "./product-purchase-locations.controller";
import ProductsToBringModel from "../../models/products-to-bring/products-to-bring.model";
import { ProductStatuses } from "../../constants/product-statuses.constants";
import mongoose from "mongoose";

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const credentials: CreateProductCredentials = req.body;
    let category;
    let purchaseLocations;

    if (credentials.category) {
      category = await ProductCategories.CheckCategoryExistence(
        credentials.category
      );
    }

    if (credentials.purchaseLocations?.length) {
      purchaseLocations =
        await ProductPurchaseLocations.checkPurchaseLocationsExistence(
          credentials.purchaseLocations
        );
    }

    const newProduct = new ProductsToBringModel({
      name: credentials.name,
      description: credentials.description,
      category,
      purchaseLocations: purchaseLocations,
      imageUrls: credentials.imageUrls,
    });
    const product = await newProduct.save();

    res.json({ message: "Successfully Created!", product });
  } catch (error) {
    next(error);
  }
};

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const { status } = req.query as { status?: string };
    const filterObject: { [k: string]: string } = {};

    if (status) {
      filterObject["status"] = status;
    }
    const products = await ProductsToBringModel.find(filterObject)
      .populate("category purchaseLocations")
      .sort({ updatedAt: -1, createdAt: -1 });

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 7);

    const productsToDelete = products
      .filter((product) =>
        product?.status && product.lastStatusUpdateAt
          ? [ProductStatuses.BROUGHT, ProductStatuses.REMOVED].includes(
              product.status
            ) && new Date(product.lastStatusUpdateAt) < targetDate
          : false
      )
      .map((product) => new mongoose.Types.ObjectId(product._id));

    if (productsToDelete.length) {
      // Delete all products, which status is BROUGHT or REMOVED , and they have the status more than 7 days
      await ProductsToBringModel.deleteMany({ _id: { $in: productsToDelete } });
    }

    res.json({ products });
  } catch (error) {
    next(error);
  }
};

export const findProduct = async (id: string) => {
  try {
    const product = await ProductsToBringModel.findById(id);

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    return null;
  }
};

export const checkProductExistence = async (id: string) => {
  const product = await findProduct(id);
  if (!product) {
    throw new Error("არ არსებობს ასეთი პროდუქტი!");
  }

  return product;
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const credentials: IUpdateProductData = req.body;
    const data = credentials.updateData;
    let category;
    let purchaseLocations;
    let statusUpdateData;

    await checkProductExistence(credentials.productId);

    if (data.category) {
      category = await ProductCategories.CheckCategoryExistence(data.category);
    }

    if (data.purchaseLocations?.length) {
      purchaseLocations =
        await ProductPurchaseLocations.checkPurchaseLocationsExistence(
          data.purchaseLocations
        );
    }

    if (credentials.updateData.status) {
      statusUpdateData = {
        status: credentials.updateData.status,
        lastStatusUpdateAt: Date.now(),
      };
    }

    await ProductsToBringModel.updateOne(
      { _id: credentials.productId },
      {
        ...(category ? { category } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.imageUrls ? { imageUrls: data.imageUrls } : {}),
        ...(data.name ? { name: data.name } : {}),
        ...(purchaseLocations ? { purchaseLocations } : {}),
        ...(statusUpdateData ? statusUpdateData : {}),
      }
    );

    const product = await ProductsToBringModel.findById(credentials.productId);

    res.json({
      message: "Successfully Update Product.",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };

    await checkProductExistence(id);

    await ProductsToBringModel.deleteOne({ _id: id });

    res.json({
      message: "Successfully Delete Product.",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const product = await ProductsToBringModel.findById(id).populate(
      "category purchaseLocations"
    );
    if (!product) {
      throw new Error("პროდუქტი ვერ მოიძებნა.");
    }

    res.json({
      product,
    });
  } catch (error) {
    next(error);
  }
};
