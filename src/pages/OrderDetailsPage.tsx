import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Order } from "../types/models/Order"
import { getOrderById } from "../services/orderService"
import OrderDetailsHeader from "../components/orders/OrderDetailsHeader"
import OrderSummaryCard from "../components/orders/OrderSummaryCard"
import OrderAddressCard from "../components/orders/OrderAddressCard"
import OrderItemsList from "../components/orders/OrderItemsList"
import OrderStatusTimeline from "../components/orders/OrderStatusTimeline"
import EmptyState from "../components/common/EmptyState"
import LoadingState from "../components/common/LoadingState"

const OrderDetailsPage = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) {
      setError("Order not found.")
      setLoading(false)
      return
    }

    const parsedId = Number(orderId)
    if (Number.isNaN(parsedId)) {
      setError("Order not found.")
      setLoading(false)
      return
    }

    void fetchOrder(parsedId)
  }, [orderId])

  const fetchOrder = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const response = await getOrderById(id)
      setOrder(response.data)
    } catch (err) {
      console.error("Failed to fetch order details:", err)
      setError("Unable to load order details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <LoadingState message="Fetching your order details..." />
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <EmptyState
            message={error ?? "We couldn't find that order."}
            buttonLabel="Back to orders"
            onButtonClick={() => navigate("/user/orders")}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <OrderDetailsHeader order={order} />

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <OrderItemsList order={order} />
            <OrderAddressCard order={order} />
          </div>
          <div className="space-y-6">
            <OrderSummaryCard order={order} />
            <OrderStatusTimeline currentStatus={order.status} />
            <button
              type="button"
              onClick={() => navigate("/user/orders")}
              className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800"
            >
              Back to order history
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
