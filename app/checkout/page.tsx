"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { getFoodImage } from "@/lib/image-mapping"

export default function CheckoutPage() {
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Map backend cart items to frontend shape
        const mapped = Array.isArray(data.items)
          ? data.items.map((item: any) => ({
              id: item.menuItem?._id || item.menuItem || item._id,
              name: item.menuItem?.name || item.name,
              price: item.menuItem?.price || item.price,
              qty: item.quantity || item.qty,
              image: item.menuItem?.image || item.image,
              category: item.menuItem?.category || item.category
            }))
          : []
        setCartItems(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load cart.")
        setLoading(false)
      })
  }, [])
  // Order placement logic
  const [orderLoading, setOrderLoading] = useState(false)
  const [orderError, setOrderError] = useState("")
  const [orderSuccess, setOrderSuccess] = useState("")

  async function handlePlaceOrder() {
    setOrderLoading(true)
    setOrderError("")
    setOrderSuccess("")
    try {
      const res = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Order failed")
      setOrderSuccess("Order placed successfully!")
      setTimeout(() => {
        window.location.href = "/checkout/success"
      }, 1200)
    } catch (err: any) {
      setOrderError(err.message || "Order failed")
    } finally {
      setOrderLoading(false)
    }
  }

  if (loading) return <div className="container px-4 py-8 md:px-6 md:py-12">Loading cart...</div>
  if (error) return <div className="container px-4 py-8 md:px-6 md:py-12 text-red-600">{error}</div>

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.qty, 0)
  const delivery = cartItems.length > 0 ? 25 : 0
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + delivery + tax

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-primary">Cart</Link>
          <span className="mx-2">/</span>
          <span>Checkout</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            {/* ...shipping form JSX... */}
          </div>
          {/* Billing Information */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Billing Information</h2>
              <div className="flex items-center space-x-2"></div>
            </div>
            {/* ...billing form JSX... */}
          </div>
          {/* Payment Method */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            {/* ...payment form JSX... */}
          </div>
          {/* Order Notes */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Order Notes (Optional)</h2>
            {/* ...order notes JSX... */}
          </div>
        </div>
        {/* Order Summary */}
        <div>
          <div className="sticky top-20">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {/* ...order summary JSX... */}
                {orderError && <div className="text-red-500 text-sm mb-2">{orderError}</div>}
                {orderSuccess && <div className="text-green-500 text-sm mb-2">{orderSuccess}</div>}
                <Button className="w-full mt-4" size="lg" onClick={handlePlaceOrder} disabled={orderLoading || cartItems.length === 0}>
                  {orderLoading ? "Placing Order..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

