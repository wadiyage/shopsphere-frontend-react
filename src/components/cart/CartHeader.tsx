type CartHeaderProps = {
  totalItems: number
  onClearCart: () => void
  isClearing: boolean
}

const CartHeader = ({totalItems, onClearCart, isClearing}: CartHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-500">Shopping Cart</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">Your Cart</h1>
          <p className="mt-2 text-sm text-slate-600">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your bag
          </p>
        </div>
        <button
          type="button"
          onClick={onClearCart}
          disabled={isClearing}
          aria-label="Clear shopping cart"
          className="inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
        >
          {isClearing ? "Clearing..." : "Clear Cart"}
        </button>
      </div>
  )
}

export default CartHeader