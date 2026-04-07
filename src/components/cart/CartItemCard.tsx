import type { CartDisplayItem } from "../../types/models/CartDisplayItem"
import type { CartItem } from "../../types/models/CartItem"
import ProductImage from "./ProductImage"
import StockBadge from "./StockBadge"

type Props = {
    item: CartDisplayItem
    isUpdating: boolean
    isRemoving: boolean
    onUpdate: (item: CartItem, quantity: number) => void
    onRemove: (item: CartItem) => void
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value)


const CartItemCard = ({
    item,
    isUpdating,
    isRemoving,
    onUpdate,
    onRemove
}: Props) => {
    const quantity = item.displayQuantity
    const canIncrement = quantity < item.stockQuantity && item.inStock
    return (

        <article
            key={item.id}
            className="grid gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:grid-cols-[200px_1fr]"
        >
            <ProductImage src={`http://localhost:8080${item.imageUrl}`} alt={item.productName} />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                {item.categoryName}
                            </span>
                            <StockBadge inStock={item.inStock} stockQuantity={item.stockQuantity} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-950 truncate">
                            {item.productName}
                        </h2>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                            {item.productDescription}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                            {formatCurrency(item.productPrice)}
                            <span className="ml-2 text-sm font-normal text-slate-500">per item</span>
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => onRemove(item)}
                        disabled={isRemoving || !item.inStock}
                        aria-label={`Remove ${item.productName} from cart`}
                        className="mt-2 shrink-0 inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95 sm:mt-0"
                    >
                        <span className="text-lg">✕</span>
                    </button>
                </div>

                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <label htmlFor={`qty-${item.id}`} className="block text-sm font-medium text-slate-700">
                            Quantity
                        </label>
                        <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                            <button
                                type="button"
                                onClick={() => onUpdate(item, quantity - 1)}
                                disabled={quantity <= 1 || isUpdating || !item.inStock}
                                aria-label="Decrease quantity"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                            >
                                −
                            </button>
                            <input
                                id={`qty-${item.id}`}
                                type="number"
                                value={quantity}
                                readOnly
                                className="w-12 appearance-none bg-transparent text-center text-lg font-semibold text-slate-900"
                            />
                            <button
                                type="button"
                                onClick={() => onUpdate(item, quantity + 1)}
                                disabled={!canIncrement || isUpdating}
                                aria-label="Increase quantity"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                            >
                                +
                            </button>
                        </div>
                        {isUpdating && (
                            <p className="mt-2 text-xs text-slate-500">Updating…</p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-right">
                        <p className="text-sm font-medium text-slate-700">Item total</p>
                        <p className="mt-1 text-2xl font-bold text-slate-950">
                            {formatCurrency(item.displaySubtotal)}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CartItemCard