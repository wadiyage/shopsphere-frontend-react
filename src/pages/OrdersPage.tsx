import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Order, OrderStatus } from "../types/models/Order"
import { getMyOrders } from "../services/orderService"
import OrdersFilterTabs from "../components/orders/OrdersFilterTabs"
import OrderCard from "../components/orders/OrderCard"
import EmptyState from "../components/common/EmptyState"

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "All">("All")

  useEffect(() => {
    void fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getMyOrders()
      const data: Order[] = Array.isArray(response.data) ? response.data : []
      setOrders(data)
    } catch (err) {
      console.error("Failed to fetch orders:", err)
      setError("Failed to load orders. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") return orders
    return orders.filter((order) => order.status === activeFilter)
  }, [activeFilter, orders])

  const ordersCount = orders.length

  const navigate = useNavigate()

  const renderSkeletonCard = (key: number) => (
    <div
      key={key}
      className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="h-5 w-1/3 rounded-full bg-slate-200" />
      </div>
      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.9fr_0.9fr]">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="h-12 rounded-3xl bg-slate-200" />
            <div className="h-12 rounded-3xl bg-slate-200" />
          </div>
          <div className="h-10 rounded-3xl bg-slate-200" />
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-100 p-6">
          <div className="h-8 rounded-full bg-slate-200" />
          <div className="h-12 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-4xl font-bold text-slate-950">My Orders</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              {ordersCount === 0
                ? "You haven't placed any orders yet."
                : `Showing ${filteredOrders.length} of ${ordersCount} order${ordersCount !== 1 ? "s" : ""}.`}
            </p>
          </div>

          <div className="sticky top-6 z-10 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Filter orders
                </p>
              </div>
              <OrdersFilterTabs activeFilter={activeFilter} onChange={setActiveFilter} />
            </div>
          </div>
        </header>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            <p className="text-center font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4].map(renderSkeletonCard)}
          </div>
        ) : ordersCount === 0 ? (
          <EmptyState
            message="You haven't placed any orders yet. Start shopping to see your order history."
            buttonLabel="Start Shopping"
            onButtonClick={() => navigate("/products")}
          />
        ) : filteredOrders.length === 0 ? (
          <EmptyState
            message="No orders match this filter. Try selecting another status or view all orders."
          />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
