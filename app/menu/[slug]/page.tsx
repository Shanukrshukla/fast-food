"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { getFoodImage, getCategoryImage } from "@/lib/image-mapping"

const MENU: Record<string, { name: string; price: number; desc: string; category: string }> = {
  "hakka-noodles": { name: "Hakka Noodles", price: 149, desc: "Stir-fried noodles with crunchy veggies.", category: "noodles" },
  "schezwan-noodles": { name: "Schezwan Noodles", price: 159, desc: "Spicy noodles tossed in Schezwan sauce.", category: "noodles" },
  "veg-momos": { name: "Veg Momos (8pc)", price: 129, desc: "Steamed dumplings with veg filling.", category: "momos" },
  "paneer-momos": { name: "Paneer Momos (8pc)", price: 159, desc: "Soft dumplings stuffed with paneer.", category: "momos" },
  "veg-fried-rice": { name: "Veg Fried Rice", price: 149, desc: "Wok-tossed rice with veggies and soy.", category: "rice" },
  "schezwan-fried-rice": { name: "Schezwan Fried Rice", price: 159, desc: "Fiery fried rice with Schezwan kick.", category: "rice" },
  "chilli-paneer": { name: "Chilli Paneer", price: 199, desc: "Crispy paneer tossed with peppers.", category: "starters" },
  "hot-sour-soup": { name: "Hot & Sour Soup", price: 129, desc: "Comforting soup with heat & tang.", category: "soups" },
  "combo-1": { name: "Combo: Noodles + Momos", price: 249, desc: "Best-selling combo for one.", category: "combos" },
}

const getCategoryFromSlug = (slug: string): string => {
  return MENU[slug]?.category || "starters"
}

export default function ItemPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const item = MENU[slug]
  const { add } = useCart()

  if (!item) return <main className="container max-w-3xl px-4 py-8">Item not found.</main>

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 grid md:grid-cols-2 gap-6">
      <img
        src={getFoodImage(item.name)}
        alt={item.name}
        className="w-full rounded-lg border"
      />
      <div>
        <h1 className="text-2xl font-semibold">{item.name}</h1>
        <p className="text-muted-foreground mt-2">{item.desc}</p>
        <div className="mt-4 text-xl font-medium">₹{item.price}</div>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => add({ id: slug, name: item.name, price: item.price, qty: 1, image: getFoodImage(item.name), category: getCategoryFromSlug(slug) })}>Add to Cart</Button>
          <a href="/cart" className="underline self-center text-sm">
            Go to Cart
          </a>
        </div>
      </div>
    </main>
  )
}
