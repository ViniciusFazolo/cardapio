import { Product } from "../product/product"

export interface OptionsFrontend {
    checked: boolean,
    id: string,
    option: string
}

export interface ProductOptionsFrontend {
    description: string,
    id: string,
    qtOptionsSelected: number,
    required: boolean
    options: OptionsFrontend[]
} 

export interface OrderFrontend {
    notes: string,
    qtItems: number,
    productOptions: ProductOptionsFrontend[]
    product: Product
}