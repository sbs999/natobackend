import { ProductStatuses } from "../../constants/product-statuses.constants";

export interface IUpdateProductData {
  productId: string;
  updateData: {
    imageUrls?: string[];
    category?: string;
    purchaseLocations?: string[];
    description?: string;
    name?: string;
    status?: ProductStatuses;
  };
}
