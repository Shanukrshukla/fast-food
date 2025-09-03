"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OrderTrackingPage() {
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<string | null>(null)

  return (
    <div className="container px-4 py-8 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Track Your Order</h1>
      <p className="mt-2 text-muted-foreground">Enter your order code to see the latest status.</p>
      <div className="mt-4 flex max-w-md gap-2">
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. CA-12345" />
        <Button onClick={() => setStatus("Preparing")} disabled={!code}>
          Check
        </Button>
      </div>
      {status && (
        <Card className="mt-6 max-w-md">
          <CardContent className="p-4">
            <p>
              Order <span className="font-medium">{code}</span> status: <span className="font-semibold">{status}</span>
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
              <li>Received</li>
              <li>Preparing</li>
              <li>Out for delivery</li>
              <li>Delivered</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
