import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartContextType } from "../types/state/CartContextType";
import type { CartItem } from "../types/models/CartItem";
import { 
    getCartItems, 
    addToCart as addToCartService, 
    updateCartItem as updateCartItemService, 
    removeFromCart as removeFromCartService, 
    clearCart as clearCartService
} from "../services/cartService";

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)

    const fetchCart = async () => {
        try {
            setLoading(true)
            const res = await getCartItems()
            setCartItems(res.data)
        } catch (error) {
            console.error("Failed to fetch cart items", error)
        } finally {
            setLoading(false)
        }
    }

    const addToCart = async (productId: number, quantity: number = 1) => {
        await addToCartService(productId, quantity)
        await fetchCart()
    }

    const updateCartItem = async (cartItemId: number, quantity: number) => {
        await updateCartItemService(cartItemId, quantity)
        await fetchCart()
    }

    const removeFromCart = async (cartItemId: number) => {
        await removeFromCartService(cartItemId)
        await fetchCart()
    }

    const clearCart = async () => {
        await clearCartService()
        setCartItems([])
    }

    useEffect(() => {
        fetchCart()
    }, [])


    return (
        <CartContext.Provider
            value={{
                cartItems, 
                loading,
                fetchCart,
                addToCart, 
                updateCartItem, 
                removeFromCart, 
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if(!context) throw new Error("useCart must be used within a CartProvider")
    return context
}