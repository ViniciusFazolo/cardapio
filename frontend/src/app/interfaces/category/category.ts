import { Product } from "../product/product";

export interface Category {
    id?: string,
    description: string,
    imageUrl: string,
    products: Product[]
}

