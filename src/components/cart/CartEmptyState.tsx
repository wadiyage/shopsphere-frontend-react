import { Link } from "react-router-dom"

const CartEmptyState = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
            <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-6 text-6xl">🛒</div>
                <h1 className="text-3xl font-semibold text-slate-900">Your cart is empty</h1>
                <p className="mt-4 text-slate-600">
                    Looks like you haven't added anything yet. Discover our collection!
                </p>
                <Link
                    to="/products"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default CartEmptyState