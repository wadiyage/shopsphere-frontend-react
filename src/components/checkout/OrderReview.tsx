import { useCart } from "../../context/CartContext"

import OrderItemList from "../checkout/OrderItemList"
import OrderSummary from "../cart/OrderSummary"

const OrderReview = () => {
    const { cartItems } = useCart()

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
    )

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    )

    return (
        <aside className="lg:sticky lg:top-6 space-y-4">
            <OrderItemList items={cartItems} />

            <OrderSummary
                totalItems={totalItems}
                subtotal={subtotal}
                total={subtotal}
            />
        </aside>

  )
}

export default OrderReview