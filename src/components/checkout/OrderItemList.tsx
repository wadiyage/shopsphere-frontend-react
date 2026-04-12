import type { FC } from "react"
import type { CartItem } from "../../types/models/CartItem"

type Props = {
    items: CartItem[]
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value)

const OrderItemList: FC<Props> = ({ items }) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-950">Order Preview</h2>
                <span className="text-sm text-slate-500">{items.length} items</span>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                        <img
                            src={`http://localhost:8080${item.imageUrl}`}
                            alt={item.productName}
                            className="h-16 w-16 rounded-2xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-950">
                                {item.productName}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>

                        <p className="text-sm font-semibold text-slate-950">
                            {formatCurrency(item.productPrice * item.quantity)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderItemList