
import { useEffect, useState } from "react"

type Order = {
  id: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Map backend orders to frontend shape
        const mapped = Array.isArray(data)
          ? data.map((order: any) => ({
              id: order._id,
              items: Array.isArray(order.items)
                ? order.items.map((item: any) => ({
                    name: item.menuItem?.name || item.name,
                    qty: item.quantity || item.qty
                  }))
                : [],
              total: order.total,
              status: order.status,
              createdAt: order.createdAt
            }))
          : []
        setOrders(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load orders.")
        setLoading(false)
      })
  }, [])

  if (loading) return <main className="container mx-auto max-w-3xl px-4 py-8">Loading orders...</main>
  if (error) return <main className="container mx-auto max-w-3xl px-4 py-8 text-red-600">{error}</main>

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground mt-2">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border rounded-lg p-4">
              <div className="font-bold">Order #{order.id}</div>
              <div>Status: {order.status}</div>
              <div>Total: ₹{order.total}</div>
              <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
              <ul className="mt-2 text-sm">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} x {item.qty}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
