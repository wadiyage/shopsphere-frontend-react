import type { Order } from "../../types/models/Order"

type Props = {
  order: Order
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

const OrderSummaryCard = ({ order }: Props) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Order summary
        </p>
        <p className="mt-3 text-2xl font-bold text-slate-950">
          {formatCurrency(order.totalAmount)}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 px-2 py-4 text-center text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Payment</p>
          <p className="mt-2">{order.paymentMethod ?? "Not specified"}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 px-2 py-4 text-center text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Items</p>
          <p className="mt-2">{order.items.length}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 px-2 py-4 text-center text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Status</p>
          <p className="mt-2 capitalize">{order.status.toLowerCase()}</p>
        </div>
      </div>
    </div>
  </section>
)

export default OrderSummaryCard
