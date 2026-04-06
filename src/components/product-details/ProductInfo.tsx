import { Link } from "react-router-dom"
import type { Product } from "../../types/models/Product"
import Rating from "./Rating"
import { useCart } from "../../context/CartContext"
import { toast } from "react-toastify"

const ProductInfo = ({ product }: { product: Product }) => {
    const { addToCart } = useCart()
    const stockUnavailable = product.stockQuantity !== undefined && product.stockQuantity <= 0

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
                    disabled={stockUnavailable}
                    aria-label={stockUnavailable ? `${product.name} is unavailable` : `Add ${product.name} to cart`}
                    className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-200 ${stockUnavailable
                        ? "border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-linear-to-r from-slate-950 via-slate-800 to-slate-950 text-white shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
                        }`}
                    onClick={async (e) => {
                        e.preventDefault()

                        if (!stockUnavailable) {
                            try {
                                await addToCart(product.id, 1)

                                toast.success(`${product.name} added to cart!`, {
                                    position: "top-right",
                                    autoClose: 3000,
                                });
                            } catch (error) {
                                toast.error("Failed to add product to cart.");
                            }
                        }
                    }}
                >
                    {
                        product.stockQuantity && product.stockQuantity > 0
                            ? "Add to cart"
                            : "Unavailable"
                    }
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