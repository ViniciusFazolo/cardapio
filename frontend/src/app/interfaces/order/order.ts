import { ProductOrder } from "./productOrder"

export interface Order {
    id?: string
    clientName: string
    tableNumber: number
    phoneNumber: number
    valueTotalOrder: number
    products: ProductOrder[]
}