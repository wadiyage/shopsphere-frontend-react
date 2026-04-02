import { createContext, useContext, useState } from "react";
import type { Product } from "../types/models/Product";

type CartItem = Product & { quantity: number }

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (product: Product) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const exiting = prev.find((item) => item.id === product.id)

            if (exiting) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }
    return (
        <CartContext.Provider value={{cartItems, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if(!context) throw new Error("useCart must be used within a CartProvider")
    return context
}