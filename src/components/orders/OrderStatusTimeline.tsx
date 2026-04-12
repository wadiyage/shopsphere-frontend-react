import type { OrderStatus } from "../../types/models/Order"

type Props = {
  currentStatus: OrderStatus
}

const steps: Array<{ label: string; value: OrderStatus }> = [
  { label: "Pending", value: "PENDING" },
  { label: "Paid", value: "PAID" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
]

const OrderStatusTimeline = ({ currentStatus }: Props) => {
  const currentIndex = steps.findIndex((step) => step.value === currentStatus)

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
        Order progress
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex
          return (
            <div
              key={step.value}
              className={`flex flex-col items-center gap-3 rounded-3xl border p-5 text-center transition duration-200 ${
                isCompleted
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >

              <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${isCompleted ? "border-white bg-white/10 text-white" : "border-slate-300 bg-white text-slate-700"}`}>
                {index + 1}
              </div>
              <p className="text-sm font-semibold">{step.label}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {isCompleted ? "Completed" : index === currentIndex ? "Current" : "Pending"}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default OrderStatusTimeline
