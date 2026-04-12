import type { Order } from "../../types/models/Order"
import OrderStatusBadge from "./OrderStatusBadge"

type Props = {
  order: Order
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

const OrderDetailsHeader = ({ order }: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Order #{order.id}
        </p>
        <h1 className="text-3xl font-bold text-slate-950">Order details</h1>
        <p className="text-sm text-slate-500">
          Placed on {formatDate(order.createdAt)}
        </p>
      </div>
      <div>
        <OrderStatusBadge status={order.status} />
      </div>
    </div>
  </div>
)

export default OrderDetailsHeader
