import { Product } from "../product/product";
import { Order } from "./order";

export interface ProductOrder {
  id?: string;
  order: Order | null;
  product: Product;
  quantity: number;
  notes: string;
}
