import type { Order } from "../../types/models/Order"

type Props = {
  order: Order
}

const OrderAddressCard = ({ order }: Props) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Delivery address
        </p>
        <p className="mt-3 text-base font-semibold text-slate-950">
          {order.address.fullName}
        </p>
      </div>
    </div>

    <div className="mt-5 space-y-3 text-sm text-slate-600">
      <p>{order.address.phone}</p>
      <p>{order.address.addressLine}</p>
      <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
    </div>
  </section>
)

export default OrderAddressCard
