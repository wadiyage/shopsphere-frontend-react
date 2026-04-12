import type { Address } from "./Address"

export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED"

export interface OrderItemResponse {
  productId: number
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: number
  address: Address
  totalAmount: number
  status: OrderStatus
  createdAt: string
  items: OrderItemResponse[]
}
