import type { OrderStatus } from "../../types/models/Order"

type FilterOption = {
  label: string
  value: OrderStatus | "All"
}

type Props = {
  activeFilter: OrderStatus | "All"
  onChange: (value: OrderStatus | "All") => void
}

const filterOptions: FilterOption[] = [
  { label: "All", value: "All" },
  { label: "Pending", value: "PENDING" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
]

const OrdersFilterTabs = ({ activeFilter, onChange }: Props) => (
  <nav aria-label="Order status filters" className="overflow-x-auto">
    <div className="flex min-w-max gap-3 p-1">
      {filterOptions.map((option) => {
        const isActive = option.value === activeFilter
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
              isActive
                ? "bg-slate-950 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  </nav>
)

export default OrdersFilterTabs
