import API from "./api"

export const getCartItems = () => {
    return API.get(
        "/user/cart"
    )
}

export const addToCart = (productId: number, quantity: number) => {
    return API.post(
        "/user/cart",
        { productId, quantity }
    )

}

export const updateCartItem = (cartItemId: number, quantity: number) => {
    return API.put(
        `/user/cart/${cartItemId}`,
        { quantity }
    )
}
    
export const removeFromCart = (cartItemId: number) => {
    return API.delete(
        `/user/cart/${cartItemId}`
    )
}

export const clearCart = () => {
    return API.delete(
        "/user/cart"
    )
}