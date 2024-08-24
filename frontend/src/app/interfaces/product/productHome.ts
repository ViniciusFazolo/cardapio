import { Category } from "../category/categoryHome";
import { ProductOption } from "../product-option/product-option";

export interface Product{
    id?: string;
    price: number;
    description: string;
    image: string;
    imageUrl?: string;
    category: Category;
    productOptionTitle: ProductOption[]
  }
  