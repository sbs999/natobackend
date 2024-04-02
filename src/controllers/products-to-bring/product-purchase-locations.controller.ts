import { RequestHandler } from "express";
import ProductPurchaseModel from "../../models/products-to-bring/product-purchase-locations.model";
import {
  ICreateProductPurchaseLocation,
  IUpdateProductPurchaseLocation,
} from "../../interfaces/products-to-bring";

export const updateProductPurchaseLocation: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id, updateData }: IUpdateProductPurchaseLocation = req.body;

    const location = await findPurchaseLocation(id);
    if (!location) {
      throw new Error("არასწორი ლოკაცია.");
    }

    await ProductPurchaseModel.updateOne(
      { _id: id },
      {
        ...(updateData.name ? { name: updateData.name } : {}),
        ...(updateData.description
          ? { description: updateData.description }
          : {}),
      }
    );

    const updatedLocation = await ProductPurchaseModel.findById(id);

    res.json({
      message: "Successfully Update Product Purchase Location.",
      location: updatedLocation,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductPurchaseLocation: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { name, description }: ICreateProductPurchaseLocation = req.body;
    const newLocation = new ProductPurchaseModel({ name, description });
    const location = await newLocation.save();

    res.json({
      message: "Successfully Created Product Purchase Location.",
      location,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductPurchaseLocations: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const locations = await ProductPurchaseModel.find();

    res.json({
      locations,
    });
  } catch (error) {
    next(error);
  }
};

export const findPurchaseLocationsByLocationIds = async (ids: string[]) => {
  try {
    const locations = await ProductPurchaseModel.find({
      _id: { $in: ids },
    });
    if (!locations) {
      return null;
    }

    return locations;
  } catch (error) {
    return null;
  }
};

export const checkPurchaseLocationsExistence = async (
  purchase_locations: string[]
) => {
  const purchaseLocations = await findPurchaseLocationsByLocationIds(
    purchase_locations
  );
  if (!purchaseLocations?.length) {
    throw new Error("არასწორი ლოკაცია!");
  }

  return purchaseLocations;
};

export const findPurchaseLocation = async (id: string) => {
  try {
    const location = await ProductPurchaseModel.findById(id);
    if (!location) {
      return null;
    }

    return location;
  } catch (error) {
    return null;
  }
};

export const deleteProductPurchaseLocation: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params as { id: string };

    const location = await findPurchaseLocation(id);
    if (!location) {
      throw new Error("არასწორი ლოკაცია.");
    }

    await ProductPurchaseModel.deleteOne({ _id: id });

    res.json({
      message: "Successfully Delete Product Purchase Location.",
    });
  } catch (error) {
    next(error);
  }
};
