import { IUpdateById } from "../common";

export interface UpdateProductCategoryCredentials
  extends IUpdateById<{
    name: string;
    description?: string;
  }> {}
