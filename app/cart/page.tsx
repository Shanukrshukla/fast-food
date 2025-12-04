"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getFoodImage } from "@/lib/image-mapping"

export default function CartPage() {
  const [items, setItems] = useState<any[]>([])
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
        setItems(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load cart.")
        setLoading(false)
      })
  }, [])

  const updateQty = (id: string, qty: number) => {
    fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ menuItem: id, quantity: qty })
    })
      .then((res) => res.json())
      .then(() => {
        setItems((prev: any[]) => prev.map((i: any) => i.id === id ? { ...i, qty } : i))
      })
  }

  const remove = (id: string) => {
    fetch("http://localhost:5000/api/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ menuItem: id })
    })
      .then((res) => res.json())
      .then(() => {
        setItems((prev: any[]) => prev.filter((i: any) => i.id !== id))
      })
  }

  const clear = () => {
    setItems([])
  }

  const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.qty, 0)
  const delivery = items.length > 0 ? 25 : 0
  const tax = Math.round(subtotal * 0.05)
  const grandTotal = subtotal + delivery + tax

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Order</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Cart</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading cart...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add your favorite noodles, momos, and rice bowls.</p>
          <Button asChild>
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                <Separator />
                {items.map((item, index) => (
                  <div key={item.id}>
                    <div className="py-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden">
                            <Image
                              src={getFoodImage(item.name)}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground md:hidden">₹{item.price}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-auto p-0 text-sm text-destructive hover:text-destructive/80 md:hidden"
                              onClick={() => remove(item.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2 text-center hidden md:block">₹{item.price}</div>
                        <div className="col-span-2 flex items-center justify-center">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease</span>
                            </Button>
                            <span className="w-8 text-center text-sm">{item.qty}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase</span>
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2 text-right flex items-center justify-between md:justify-end">
                          <span className="font-medium">₹{item.price * item.qty}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/80 hidden md:inline-flex"
                            onClick={() => remove(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-muted p-6 rounded-b-lg">
                <Button variant="outline" asChild>
                  <Link href="/menu">Continue Ordering</Link>
                </Button>
                <Button variant="ghost" onClick={clear}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>₹{delivery}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{tax}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">or</span>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Input type="text" placeholder="Coupon code" className="rounded-r-none" />
                        <Button className="rounded-l-none">Apply</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
