export interface CartItem {
    id: number

    productId: number
    productName: string
    productDescription: string

    productPrice: number
    imageUrl: string

    categoryName: string

    quantity: number
    totalPrice: number

    stockQuantity: number
    inStock: boolean
}