type Props = {
    type: "success" | "error"
    message: string
}

const CartToast = ({ type, message }: Props) => {
    return (
        <div
            className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl px-5 py-4 text-sm font-medium shadow-lg animation duration-300 transition-all ${type === "success"
                    ? "bg-emerald-600 text-white"
                    : "bg-rose-600 text-white"
                }`}
            role="status"
            aria-live="polite"
        >
            {message}
        </div>
    )
}

export default CartToast