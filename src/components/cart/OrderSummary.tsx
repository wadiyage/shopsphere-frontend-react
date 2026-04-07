import { Link } from "react-router-dom"

type Props = {
    totalItems: number
    subtotal: number
    shipping?: number
    total: number
    isCheckoutDisabled?: boolean
    onCheckout?: () => void
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value)

const OrderSummary = ({
    totalItems,
    subtotal,
    shipping = 0,
    total,
    isCheckoutDisabled = false,
    onCheckout
}: Props) => {
    return (
        <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="space-y-4">
                {/* Summary Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-950">Order Summary</h2>

                    <div className="mt-6 space-y-4 border-b border-slate-200 pb-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Items ({totalItems})</span>
                            <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Shipping</span>
                            <span className="font-medium text-slate-900">
                                {shipping === 0 ? "Free" : formatCurrency(shipping)}
                            </span>
                        </div>
                    </div>

                    {/* Grand Total */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-700">Grand Total</span>
                            <span className="text-2xl font-bold text-slate-950">
                                {formatCurrency(total)}
                            </span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-6 space-y-3">
                        <button
                            type="button"
                            onClick={onCheckout}
                            disabled={isCheckoutDisabled}
                            aria-label="Proceed to checkout"
                            className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
                        >
                            Proceed to Checkout
                        </button>

                        <Link
                            to="/products"
                            className="block rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-50 active:scale-95"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Info Card */}
                <div className="rounded-2xl border border-slate-200 bg-blue-50 p-5">
                    <p className="flex items-start gap-2 text-xs text-blue-900">
                        <span className="text-sm">ℹ️</span>
                        <span>Free shipping on all orders. Your items will be carefully packaged and delivered to your door.</span>
                    </p>
                </div>
            </div>
        </aside>
    )
}

export default OrderSummary