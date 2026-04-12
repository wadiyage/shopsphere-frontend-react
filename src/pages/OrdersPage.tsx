import React, { useEffect, useState } from "react";
import type { Order, OrderStatus } from "../types/models/Order";
import { getMyOrders } from "../services/orderService";
import LoadingState from "../components/common/LoadingState";
import EmptyState from "../components/common/EmptyState";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyOrders();
      const data: Order[] = Array.isArray(response.data) ? response.data : [];
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "DELIVERED":
        return "bg-green-100 text-green-800 border border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-center text-3xl font-bold text-slate-900">
            My Orders
          </h1>
          <LoadingState message="Loading your orders..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">My Orders</h1>
          <p className="mt-2 text-slate-600">
            {orders.length === 0 ? "You have no orders yet" : `You have ${orders.length} order${orders.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="text-center font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && !error && (
          <EmptyState
            message={
              "You haven't placed any orders yet. Start shopping to see your orders here!"
            }
          />
        )}

        {/* Orders Grid */}
        {orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="transform transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.01]"
              >
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                  {/* Order Header */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">
                          Order #{order.id}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                        {/* Status Badge */}
                        <div className="flex items-center">
                          <span
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>

                        {/* Total Amount */}
                        <div className="text-right">
                          <p className="text-xs font-medium text-slate-500">
                            Total
                          </p>
                          <p className="text-xl font-bold text-slate-900">
                            {formatCurrency(order.totalAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-5">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-700">
                        Items ({order.items.length})
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-slate-900">
                                {item.productName}
                              </p>
                              <p className="text-sm text-slate-600">
                                Quantity: <span className="font-semibold">x{item.quantity}</span>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-slate-900">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                              <p className="text-xs text-slate-500">
                                {formatCurrency(item.price)} each
                              </p>
                            </div>
                          </div>

                          {index < order.items.length - 1 && (
                            <div className="my-3 border-t border-slate-100" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
                    <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="text-sm text-slate-600">
                        Order placed:{" "}
                        <span className="font-semibold text-slate-900">
                          {new Date(order.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>

                      <button
                        onClick={() => console.log("View details for order", order.id)}
                        className="rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-95"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
