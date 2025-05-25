import mongoose, { Schema } from "mongoose";
import { MODELS } from "../constants/models.constants";

// Each history entry will now have its own _id field by default
const PriceHistorySchema = new Schema({
  shopName: {
    type: String,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const ProductWithPricesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: MODELS.productCategories,
      required: false,
    },
    history: {
      type: [PriceHistorySchema],
      required: false,
      default: [],
    },
  },
  {
    timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
  }
);

export default mongoose.model(
  MODELS.ProductsWithHistory,
  ProductWithPricesSchema
);
