import Image from "next/image"
import Link from "next/link"
import { Flame, Award, Users, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About Chinese Adda</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Born from a love for wok-tossed flavors and street-style comfort food, Chinese Adda started as a small
            neighborhood kitchen serving hot, fresh plates that keep you coming back.
          </p>
          <p className="text-muted-foreground mb-4">
            From classic Hakka Noodles to juicy Momos, every dish is cooked to order with quality ingredients, bold
            sauces, and that irresistible smoky “wok hei”.
          </p>
          <p className="text-muted-foreground">
            Today, we serve thousands of happy customers with quick delivery, great value combos, and a menu that
            balances nostalgia with taste you can trust.
          </p>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/chinese-restaurant-kitchen.png"
            alt="Chinese Adda kitchen in action"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Great taste, fast service, and honest value—every order, every time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fresh & Hot</h3>
            <p className="text-muted-foreground">Wok-tossed to order for peak flavor and texture.</p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quality First</h3>
            <p className="text-muted-foreground">Ingredients you can trust, carefully sourced.</p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Customer Love</h3>
            <p className="text-muted-foreground">Friendly service and easy ordering built for you.</p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">Hot food to your door—quick and reliable.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Craving Something Delicious?</h2>
        <p className="max-w-2xl mx-auto mb-6">Order your favorites now and enjoy restaurant-style Chinese at home.</p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/menu">Order Now</Link>
        </Button>
      </div>
    </div>
  )
}
