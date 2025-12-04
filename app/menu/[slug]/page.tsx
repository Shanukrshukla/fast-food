"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { getFoodImage, getCategoryImage } from "@/lib/image-mapping"


import { useEffect, useState } from "react"

type MenuItem = {
  id: string;
  name: string;
  price: number;
  desc: string;
  category: string;
  image?: string;
}

export default function ItemPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const [item, setItem] = useState<MenuItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { add } = useCart()

  useEffect(() => {
    setLoading(true)
    fetch(`/api/menu/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load item.")
        setLoading(false)
      })
  }, [slug])

  if (loading) return <main className="container max-w-3xl px-4 py-8">Loading...</main>
  if (error) return <main className="container max-w-3xl px-4 py-8 text-red-600">{error}</main>
  if (!item) return <main className="container max-w-3xl px-4 py-8">Item not found.</main>

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 grid md:grid-cols-2 gap-6">
      <img
        src={getFoodImage(item.name) || item.image || "/placeholder.jpg"}
        alt={item.name}
        className="w-full rounded-lg border"
      />
      <div>
        <h1 className="text-2xl font-semibold">{item.name}</h1>
        <p className="text-muted-foreground mt-2">{item.desc}</p>
        <div className="mt-4 text-xl font-medium">₹{item.price}</div>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => add({ id: slug, name: item.name, price: item.price, qty: 1, image: getFoodImage(item.name) || item.image, category: item.category })}>Add to Cart</Button>
          <a href="/cart" className="underline self-center text-sm">
            Go to Cart
          </a>
        </div>
      </div>
    </main>
  )
}
