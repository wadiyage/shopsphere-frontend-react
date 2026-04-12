import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import type { CartItem } from "../types/models/CartItem"

import CartHeader from "../components/cart/CartHeader"
import OrderSummary from "../components/cart/OrderSummary"
import CartList from "../components/cart/CartList"
import CartToast from "../components/cart/CartToast"
import CartEmptyState from "../components/cart/CartEmptyState"
import type { CartDisplayItem } from "../types/models/CartDisplayItem"

const buildDisplayItems = (
    items: CartItem[],
    localQuantities: Record<number, number>
) =>
    items.map((item) => {
        const quantity = localQuantities[item.id] ?? item.quantity
        return {
            ...item,
            displayQuantity: quantity,
            displaySubtotal: item.productPrice * quantity,
        }
    })

type ToastMessage = {
    type: "success" | "error"
    message: string
}

export const CartPage = () => {
    const navigate = useNavigate()

    const { cartItems, loading, updateCartItem, removeFromCart, clearCart } = useCart()
    const [localQuantities, setLocalQuantities] = useState<Record<number, number>>({})
    const [pendingUpdates, setPendingUpdates] = useState<Record<number, boolean>>({})
    const [pendingRemovals, setPendingRemovals] = useState<Record<number, boolean>>({})
    const [isClearing, setIsClearing] = useState(false)
    const [toast, setToast] = useState<ToastMessage | null>(null)

    const displayItems: CartDisplayItem[] = useMemo(
        () => buildDisplayItems(cartItems, localQuantities),
        [cartItems, localQuantities]
    )

    const totalItems = useMemo(
        () => displayItems.reduce((sum, item) => sum + item.displayQuantity, 0),
        [displayItems]
    )

    const subtotal = useMemo(
        () => displayItems.reduce((sum, item) => sum + item.displaySubtotal, 0),
        [displayItems]
    )

    const shipping = 0
    const total = subtotal + shipping

    useEffect(() => {
        if (!toast) return
        const timeout = window.setTimeout(() => setToast(null), 3200)
        return () => window.clearTimeout(timeout)
    }, [toast])

    const handleToast = (message: ToastMessage) => {
        setToast(message)
    }

    const handleQuantityUpdate = async (item: CartItem, quantity: number) => {
        if (quantity < 1 || quantity > item.stockQuantity || pendingUpdates[item.id]) return

        setLocalQuantities((prev) => ({ ...prev, [item.id]: quantity }))
        setPendingUpdates((prev) => ({ ...prev, [item.id]: true }))

        try {
            await updateCartItem(item.id, quantity)
            handleToast({ type: "success", message: "Quantity updated." })
        } catch {
            handleToast({
                type: "error",
                message: "Unable to update quantity. Please try again.",
            })
        } finally {
            setPendingUpdates((prev) => {
                const next = { ...prev }
                delete next[item.id]
                return next
            })
            setLocalQuantities((prev) => {
                const next = { ...prev }
                delete next[item.id]
                return next
            })
        }
    }

    const handleRemove = async (item: CartItem) => {
        if (pendingRemovals[item.id]) return
        const confirmed = window.confirm(`Remove ${item.productName} from your cart?`)
        if (!confirmed) return

        setPendingRemovals((prev) => ({ ...prev, [item.id]: true }))

        try {
            await removeFromCart(item.id)
            handleToast({ type: "success", message: "Item removed from cart." })
        } catch {
            handleToast({
                type: "error",
                message: "Could not remove item. Please try again.",
            })
        } finally {
            setPendingRemovals((prev) => {
                const next = { ...prev }
                delete next[item.id]
                return next
            })
        }
    }

    const handleClearCart = async () => {
        if (isClearing || cartItems.length === 0) return
        const confirmed = window.confirm(
            "Are you sure you want to clear your cart? This cannot be undone."
        )
        if (!confirmed) return

        setIsClearing(true)
        try {
            await clearCart()
            handleToast({ type: "success", message: "Cart cleared." })
        } catch {
            handleToast({
                type: "error",
                message: "Unable to clear cart right now.",
            })
        } finally {
            setIsClearing(false)
        }
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-6 h-20 animate-pulse rounded-2xl bg-slate-200" />
                <div className="animate-pulse space-y-6">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-[200px_1fr] shadow-sm"
                        >
                            <div className="h-48 rounded-2xl bg-slate-200" />
                            <div className="space-y-4">
                                <div className="h-5 w-2/3 rounded-full bg-slate-200" />
                                <div className="h-4 w-1/2 rounded-full bg-slate-200" />
                                <div className="flex gap-2">
                                    <div className="h-8 w-24 rounded-full bg-slate-200" />
                                    <div className="h-8 w-24 rounded-full bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <CartEmptyState />
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <CartHeader
                totalItems={totalItems}
                onClearCart={handleClearCart}
                isClearing={isClearing}
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <CartList
                    items={displayItems}
                    pendingUpdates={pendingUpdates}
                    pendingRemovals={pendingRemovals}
                    onUpdate={handleQuantityUpdate}
                    onRemove={handleRemove}
                />

                <OrderSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    shipping={shipping}
                    total={total}
                    isCheckoutDisabled={totalItems === 0}
                    onCheckout={() => navigate("/user/checkout")}
                />


            </div>

            {toast && (
                <CartToast
                    type={toast.type}
                    message={toast.message}
                />
            )}
        </div>
    )
}
