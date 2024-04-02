import mongoose, { Schema } from "mongoose";
import { MODELS } from "../../constants/models.constants";

const ProductPurchaseLocationsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  MODELS.ProductPurchaseLocations,
  ProductPurchaseLocationsSchema
);
