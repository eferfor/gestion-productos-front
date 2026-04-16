import { Product } from "./product";

export type ProductUi = Product & {
  tempId?: string;
  isNew?: boolean;
};
