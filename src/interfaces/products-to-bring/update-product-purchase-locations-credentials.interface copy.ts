import { IUpdateById } from "../common";

export interface IUpdateProductPurchaseLocation
  extends IUpdateById<{
    name: string;
    description?: string;
  }> {}
