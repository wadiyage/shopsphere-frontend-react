import type { OrderStatus } from "../../types/models/Order"

type Props = {
  status: OrderStatus
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  PAID: "bg-slate-100 text-slate-800 border border-slate-300",
  PROCESSING: "bg-slate-100 text-slate-800 border border-slate-300",
  SHIPPED: "bg-blue-100 text-blue-800 border border-blue-300",
  DELIVERED: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  CANCELED: "bg-rose-100 text-rose-800 border border-rose-300",
}

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELED: "Canceled",
}

const OrderStatusBadge = ({ status }: Props) => (
  <span
    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[status]}`}
    aria-label={`Order status: ${statusLabels[status]}`}
  >
    {statusLabels[status]}
  </span>
)

export default OrderStatusBadge
