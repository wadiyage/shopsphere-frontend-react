import type { CartItem } from "./CartItem";

export type CartDisplayItem = CartItem & {
    displayQuantity: number
    displaySubtotal: number
}