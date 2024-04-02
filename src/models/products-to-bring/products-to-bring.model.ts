import mongoose, { Schema } from "mongoose";
import { MODELS } from "../../constants/models.constants";
import { ProductStatuses } from "../../constants/product-statuses.constants";

const ProductsToBringSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imageUrls: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(ProductStatuses),
      default: ProductStatuses.ACTIVE,
      required: false,
    },
    lastStatusUpdateAt: {
      type: Date,
      default: Date.now(),
      required: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: MODELS.productCategories,
      required: false,
    },
    purchaseLocations: {
      type: [
        { type: Schema.Types.ObjectId, ref: MODELS.ProductPurchaseLocations },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model(MODELS.ProductsToBring, ProductsToBringSchema);
