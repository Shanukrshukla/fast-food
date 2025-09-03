"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
// import { motion } from "framer-motion" // Removed due to missing module error
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { getFoodImage } from "@/lib/image-mapping"

const MENU = [
  { id: "hakka-noodles", name: "Hakka Noodles", price: 149, category: "noodles" },
  { id: "schezwan-noodles", name: "Schezwan Noodles", price: 159, category: "noodles" },
  { id: "veg-momos", name: "Veg Momos (8pc)", price: 129, category: "momos" },
  { id: "paneer-momos", name: "Paneer Momos (8pc)", price: 159, category: "momos" },
  { id: "veg-fried-rice", name: "Veg Fried Rice", price: 149, category: "rice" },
  { id: "schezwan-fried-rice", name: "Schezwan Fried Rice", price: 159, category: "rice" },
  { id: "chilli-paneer", name: "Chilli Paneer", price: 199, category: "starters" },
  { id: "hot-sour-soup", name: "Hot & Sour Soup", price: 129, category: "soups" },
  { id: "combo-1", name: "Combo: Noodles + Momos", price: 249, category: "combos" },
]

export default function MenuPage() {
  const { add } = useCart()
  const params = useSearchParams()
  const filter = params.get("category") || "all"
  const items = filter === "all" ? MENU : MENU.filter((m) => m.category === filter)

  return (
    <main className="container mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-tight">Our Menu</h1>
        <div className="flex gap-2 overflow-auto pb-2">
          {["all", "noodles", "momos", "rice", "starters", "soups", "combos"].map((c) => (
            <Link
              key={c}
              href={`/menu?category=${c}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === c
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-white border hover:bg-red-50 text-gray-600"
              }`}
            >
              {c[0].toUpperCase() + c.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((i, idx) => (
          <div
            key={i.id}
            className="group rounded-xl overflow-hidden border bg-white shadow hover:shadow-xl transition-all"
            style={{
              animation: `fadeInUp 0.5s ease ${idx * 0.1}s both`
            }}
          >
            {/* Food Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={getFoodImage(i.name, i.category)}
                alt={i.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-yellow-400 text-red-700 text-xs font-bold px-2 py-1 rounded-full shadow">
                {i.category.toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">{i.name}</h3>
              <p className="text-red-600 font-bold mt-1">₹{i.price}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/menu/${i.id}`}
                  className="text-sm font-medium text-gray-500 hover:text-red-600 underline"
                >
                  View
                </Link>
                <Button
                  size="sm"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() =>
                    add({
                      id: i.id,
                      name: i.name,
                      price: i.price,
                      qty: 1,
                      image: getFoodImage(i.name, i.category),
                      category: i.category,
                    })
                  }
                >
                  Add +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* CSS Keyframes for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
