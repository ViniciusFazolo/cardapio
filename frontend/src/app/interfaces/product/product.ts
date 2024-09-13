import { Category } from "../category/category";
import { ProductOption } from "../product-option/product-option";

export interface Product {
    id?: string;
    price: number;
    description: string;
    imageUrl: string;
    category: Category;
    productOptionTitle: ProductOption[]
}
