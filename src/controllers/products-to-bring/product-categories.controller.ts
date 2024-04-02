import { RequestHandler } from "express";
import {
  ICreateProductCategoryCredentials,
  UpdateProductCategoryCredentials,
} from "../../interfaces/products-to-bring";
import ProductCategoryModel from "../../models/products-to-bring/product-categories.model";

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const { name, description }: ICreateProductCategoryCredentials = req.body;
    const newCategory = new ProductCategoryModel({ name, description });
    const category = await newCategory.save();

    res.json({
      message: "Successfully Created Category.",
      category: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id, updateData }: UpdateProductCategoryCredentials = req.body;

    await CheckCategoryExistence(id);

    await ProductCategoryModel.updateOne(
      { _id: id },
      {
        ...(updateData.name ? { name: updateData.name } : {}),
        ...(typeof updateData?.description === "string"
          ? { description: updateData.description }
          : {}),
      }
    );

    const updatedCategory = await findCategory(id);

    res.json({
      message: "Successfully Update Product Category.",
      category: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await ProductCategoryModel.find();

    res.json({
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const findCategory = async (id: string) => {
  try {
    const category = await ProductCategoryModel.findById(id);
    if (!category) {
      return null;
    }

    return category;
  } catch (error) {
    return null;
  }
};

export const CheckCategoryExistence = async (categoryId: string) => {
  const category = await findCategory(categoryId);
  if (!category) {
    throw new Error("არასწორი კატეგორია!");
  }

  return category;
};

export const deleteProductCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };

    await CheckCategoryExistence(id);
    await ProductCategoryModel.deleteOne({ _id: id });

    res.json({
      message: "Successfully Delete Product Category.",
    });
  } catch (error) {
    next(error);
  }
};
