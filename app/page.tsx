"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Smartphone } from "lucide-react"
import { getCategoryImage, getFoodImage } from "@/lib/image-mapping"
import PWAGuide from "@/components/pwa-guide"

const FEATURED = [
  { id: "hakka-noodles", name: "Hakka Noodles", price: 149, offerPrice: 129, category: "Noodles" },
  { id: "veg-momos", name: "Veg Momos (8pc)", price: 129, offerPrice: 109, category: "Momos" },
  { id: "veg-fried-rice", name: "Veg Fried Rice", price: 149, offerPrice: 129, category: "Rice" },
  { id: "chilli-paneer", name: "Chilli Paneer", price: 199, offerPrice: 179, category: "Starters" },
]

export default function HomePage() {
  const { add } = useCart();
  
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600/10 via-yellow-100/30 to-white">
        <div className="container relative px-4 py-12 md:px-6 md:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs shadow-sm">
                <span className="font-medium text-red-600">🔥 New</span>
                <span className="text-gray-600">Combos starting ₹249</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-red-600">Chinese Adda</span> — Taste That Brings You Back
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-lg">
                Freshly tossed noodles, juicy momos, sizzling starters, and comforting soups.
                <br /> Order now for <span className="font-semibold text-red-600">quick delivery</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
                  <Link href="/menu">Order Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Link href="/offers">View Offers</Link>
                </Button>
              </div>
              {/* Login/Register/Forgot Password CTA
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button asChild size="md" className="bg-blue-600 text-white">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="md" variant="outline" className="border-blue-600 text-blue-600">
                  <Link href="/register">Register</Link>
                </Button>
                <Button asChild size="md" variant="ghost" className="text-gray-600">
                  <Link href="/forgot-password">Forgot Password?</Link>
                </Button>
              </div> */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Smartphone className="h-4 w-4" />
                  <span>Install our app for the best experience</span>
                </div>
                <PWAGuide />
              </div>
            </div>
            {/* End of Left Content */}

            {/* Right Image */}
            <div className="relative flex items-center justify-center rounded-xl overflow-hidden shadow-xl bg-white">
              <Image
                src="/momos.png"
                alt="Chinese Adda Hero Dish"
                width={800}
                height={800}
                className="object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-red-700 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ⭐ Best Seller
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { label: "Noodles", q: "noodles" },
              { label: "Momos", q: "momos" },
              { label: "Rice", q: "rice" },
              { label: "Starters", q: "starters" },
              { label: "Soups", q: "soups" },
              { label: "Combos", q: "combos" },
            ].map((c) => (
              <Link
                key={c.q}
                href={`/menu?category=${c.q}`}
                className="group relative overflow-hidden rounded-lg border bg-background hover:shadow"
              >
                <div className="relative aspect-square">
                  <Image
                    src={getCategoryImage(c.label)}
                    alt={c.label}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 w-full p-3">
                    <h3 className="text-sm font-semibold text-white">{c.label}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED.map((item) => (
              <Card key={item.id} className="flex flex-col h-full justify-between">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="w-full h-36 relative rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                    <Image
                      src={getFoodImage(item.name, item.category)}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                  </div>
                  <Badge variant="outline" className="mt-3 mb-1">{item.category}</Badge>
                  <h3 className="font-medium text-base text-center mb-1">{item.name}</h3>
                  <div className="flex justify-center gap-2 mb-2">
                    <span className="text-muted-foreground line-through">₹{item.price}</span>
                    <span className="font-semibold text-primary">₹{item.offerPrice}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 pt-0 pb-4">
                  <Button asChild size="sm" className="bg-red-600 text-white">
                    <Link href={`/menu/${item.id}`}>View</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() =>
                      add({
                        id: item.id,
                        name: item.name,
                        price: item.offerPrice,
                        qty: 1,
                        image: getFoodImage(item.name, item.category),
                        category: item.category,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Why Chinese Adda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Hot food at your door in minutes.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-1">Fresh Ingredients</h3>
                <p className="text-sm text-muted-foreground">Quality you can taste in every bite.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-1">Great Value</h3>
                <p className="text-sm text-muted-foreground">Pocket-friendly combos and daily offers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Hungry?</h2>
          <p className="mt-2 text-muted-foreground">Install the app-like experience and order in seconds.</p>
          <div className="mt-4">
            <Button asChild>
              <Link href="/menu">Start Order</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
