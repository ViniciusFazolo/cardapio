import { Product } from "../product/productHome"

export interface Category {
    id?: string,
    description: string,
    image: string,
    imageUrl?: string
    product?: Product[]
  }