import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-top bg-background border-t">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/chinese-adda-logo.png"
                alt="Chinese Adda logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Chinese Adda</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Taste That Brings You Back. Noodles, momos, fried rice, and more—fresh and fast.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Order</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/menu" className="text-sm text-muted-foreground hover:text-primary">
                Menu
              </Link>
              <Link href="/offers" className="text-sm text-muted-foreground hover:text-primary">
                Offers
              </Link>
              <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary">
                Cart
              </Link>
              <Link href="/checkout" className="text-sm text-muted-foreground hover:text-primary">
                Checkout
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                FAQs
              </Link>
              <Link href="/order-tracking" className="text-sm text-muted-foreground hover:text-primary">
                Track Order
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Delivery Info
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Returns & Refunds
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <p>Chinese Adda, Main Market Road</p>
              <p>Open: 11:00 AM – 11:00 PM</p>
              <p>Email: order@chineseadda.com</p>
              <p>Phone: (+91) 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Chinese Adda. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
