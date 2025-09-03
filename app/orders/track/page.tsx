"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TrackOrderPage() {
  const [id, setId] = useState("")
  const [status, setStatus] = useState<string | null>(null)

  const track = () => {
    const statuses = ["Received", "Preparing", "Ready for Pickup", "Out for Delivery", "Delivered"]
    const random = statuses[Math.floor(Math.random() * statuses.length)]
    setStatus(random)
  }

  return (
    <main className="container mx-auto max-w-md px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Track Your Order</h1>
      <p className="text-muted-foreground mb-4">Enter your order ID to check the current status.</p>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Order ID"
        className="w-full border rounded px-3 py-2 mb-3"
      />
      <Button className="w-full" onClick={track} disabled={!id}>
        Check Status
      </Button>
      {status && (
        <div className="mt-6 border rounded p-3">
          <div className="text-sm text-muted-foreground">Order</div>
          <div className="font-mono">{id}</div>
          <div className="mt-2 text-sm text-muted-foreground">Status</div>
          <div className="font-medium">{status}</div>
        </div>
      )}
    </main>
  )
}
