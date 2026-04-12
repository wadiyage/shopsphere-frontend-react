import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import { checkout } from "../services/checkoutService"

import CheckoutHeader from "../components/checkout/CheckoutHeader"
import CheckoutForm from "../components/checkout/CheckoutForm"
import OrderItemList from "../components/checkout/OrderItemList"
import type { CheckoutPayload } from "../types/models/Checkout"
import OrderSummary from "../components/checkout/OrderSummary"
import BottomSection from "../components/checkout/BottomSection"

export const CheckoutPage = () => {
    const navigate = useNavigate()
    const { cartItems, clearCart } = useCart()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
    )
    const shipping = 0
    const total = subtotal + shipping

    const handleCheckout = async (formData: CheckoutPayload) => {
        setSubmitError(null)
        setIsSubmitting(true)

        try {
            await checkout(formData)

            await clearCart()
            navigate("/user/orders", { replace: true })
        } catch (error: any) {
            console.error(error)

            setSubmitError(
                error.message || "Unable to process order right now. Please try again."
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <CheckoutHeader />

            {submitError && (
                <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    {submitError}
                </div>
            )}

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
                <div className="space-y-6">
                    <CheckoutForm 
                        onSubmit={handleCheckout} 
                        isSubmitting={isSubmitting} 
                        cartEmpty={cartItems.length === 0}
                    />
                </div>

                <aside className="space-y-6">
                    <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
                        <OrderSummary
                            totalItems={totalItems}
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                        />

                        {cartItems.length > 0 && (
                            <OrderItemList items={cartItems.slice(0, 3)} />
                        )}
                        <BottomSection />
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default CheckoutPage