const CheckoutHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Checkout
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Complete your order
          </h1>

          <nav aria-label="Checkout progress" className="mt-5">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <li className="font-medium text-slate-900">Cart</li>
              <li aria-hidden="true">→</li>
              <li className="font-medium text-slate-900">Checkout</li>
              <li aria-hidden="true">→</li>
              <li className="text-slate-400">Confirmation</li>
            </ol>
          </nav>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
          <span>🔒</span>
          <span>Secure Checkout</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutHeader