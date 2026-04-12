import type { Order } from "../../types/models/Order"

type Props = {
  order: Order
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

const OrderItemsList = ({ order }: Props) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Items in this order
        </p>
        <p className="mt-2 text-sm text-slate-500">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
      </div>
      <p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
        Total {formatCurrency(order.totalAmount)}
      </p>
    </div>

    <div className="mt-6 space-y-4">
      {order.items.map((item) => (
        <div key={item.productId} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="grid gap-4 sm:grid-cols-[1.4fr_auto]">
            <div>
              <p className="font-semibold text-slate-950">{item.productName}</p>
              <p className="mt-2 text-sm text-slate-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
              <p className="mt-1 text-xs text-slate-500">{formatCurrency(item.price)} each</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default OrderItemsList
