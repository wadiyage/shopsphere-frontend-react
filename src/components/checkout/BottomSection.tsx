import { Link } from "react-router-dom"

const BottomSection = () => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
                Need to update your cart?
            </p>
            <p className="mt-2 text-sm text-slate-600">
                You can return to your cart to edit quantities or remove items before placing your order.
            </p>
            <Link
                to="/cart"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
            >
                Back to Cart
            </Link>
        </div>
    )
}

export default BottomSection