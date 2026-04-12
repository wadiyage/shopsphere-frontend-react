type Props = {
    totalItems: number
    subtotal: number
    shipping?: number
    total: number
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value)

const OrderSummary = ({ totalItems, subtotal, shipping = 0, total }: Props) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-950">Order Summary</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Review your totals before confirming the order.
                    </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 text-center">
                    {totalItems} items
                </span>
            </div>

            <div className="mt-6 space-y-4 border-b border-slate-200 pb-6">
                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900">
                        {shipping === 0 ? "Free" : formatCurrency(shipping)}
                    </span>
                </div>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                <div className="flex items-center justify-between text-base font-semibold text-slate-950">
                    <span>Grand Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                    No charges will be applied until you confirm your order.
                </p>
            </div>
        </div>
    )
}

export default OrderSummary
