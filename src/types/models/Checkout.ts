export type PaymentMethod = "CASH_ON_DELIVERY" | "CARD" | "BANK_TRANSFER"

export type CheckoutPayload = {
    addressId: number,
    paymentMethod: PaymentMethod
}

export type CheckoutResponse = {
    id: number
    totalAmount: number
    status: string
}