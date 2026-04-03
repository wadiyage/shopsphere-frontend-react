import type { CartItem } from "../models/CartItem";

export interface CartContextType {
    cartItems: CartItem[]
    loading: boolean

    fetchCart: () => Promise<void>
    addToCart: (productId: number, quantity?: number) => Promise<void>
    updateCartItem: (cartItemId: number, quantity: number) => Promise<void>
    removeFromCart: (cartItemId: number) => Promise<void>
    clearCart: () => Promise<void>
}