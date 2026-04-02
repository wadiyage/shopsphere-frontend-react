import { Link } from "react-router-dom"
import type { Product } from "../../types/models/Product"
import Rating from "./Rating"

const ProductInfo = ({ product }: { product: Product }) => {
    return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{product.name}</h2>
                    <p className="mt-2 text-sm text-slate-500">{product.categoryName ?? 'General'}</p>
                </div>
                <p className="text-3xl font-semibold text-slate-900">Rs. {product.price.toFixed(2)}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Rating rating={product.rating} />
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    {product.stockQuantity && product.stockQuantity > 0 ? 'In stock' : 'Out of stock'}
                </span>
            </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-base font-semibold text-slate-900">Product description</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
                {product.description ?? 'No description available for this product yet. Check back soon for more details.'}
            </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400/60"
            >
                Add to Cart
            </button>

            <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
                Back to Products
            </Link>
        </div>
    </section>
    )
}

export default ProductInfo