import { useNavigate } from "react-router-dom"
import type { Order } from "../../types/models/Order"
import OrderStatusBadge from "./OrderStatusBadge"

type Props = {
  order: Order
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

const formatTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

const OrderCard = ({ order }: Props) => {
  const navigate = useNavigate()
  const visibleItems = order.items.slice(0, 2)
  const extraCount = order.items.length - visibleItems.length

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Order #{order.id}
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.9fr_0.9fr]">
        <div className="space-y-5">
          <div className="space-y-4">
            {visibleItems.map((item) => (
              <div key={item.productId} className="flex flex-col gap-3 rounded-3xl bg-slate-100/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{item.productName}</p>
                  <p className="mt-1 text-sm text-slate-500">Quantity: x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {extraCount > 0 && (
            <p className="text-sm text-slate-500">+{extraCount} more item{extraCount !== 1 ? "s" : ""}</p>
          )}

          <div className="flex flex-col gap-2 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span>Order placed</span>
            <span className="font-semibold text-slate-900">{formatTime(order.createdAt)}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-right">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Total amount
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-950">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/user/orders/${order.id}`)}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  )
}

export default OrderCard
