"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Search, ChevronDown, User, Menu, X, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isPWAInstalled, setIsPWAInstalled] = useState(false)
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  useEffect(() => {
    // Check if PWA is installed
    const checkPWAStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      setIsPWAInstalled(isStandalone)
    }
    
    checkPWAStatus()
    window.addEventListener('resize', checkPWAStatus)
    return () => window.removeEventListener('resize', checkPWAStatus)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/chinese-adda-logo.png"
              alt="Chinese Adda Logo"
              width={44}
              height={44}
              className="rounded-full object-cover border border-muted"
              priority
            />
            <span className="text-xl font-bold">Chinese Adda</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/menu" className="text-sm font-medium transition-colors hover:text-primary">
              Menu
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                Categories <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/menu?category=noodles">Noodles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/menu?category=momos">Momos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/menu?category=rice">Fried Rice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/menu?category=starters">Starters</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/menu?category=soups">Soups</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/menu?category=combos">Combos</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/offers" className="text-sm font-medium transition-colors hover:text-primary">
              Offers
            </Link>
            <Link href="/order-tracking" className="text-sm font-medium transition-colors hover:text-primary">
              Track Order
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search menu..."
                className="w-[200px] pl-8 md:w-[250px] rounded-full bg-muted"
              />
            </div>
          </div>
          {isPWAInstalled && (
            <Badge variant="secondary" className="hidden md:flex items-center gap-1 bg-green-100 text-green-700 border-green-200">
              <Smartphone className="h-3 w-3" />
              <span className="text-xs">App</span>
            </Badge>
          )}
            <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href={typeof window !== "undefined" && localStorage.getItem("user") ? "/profile" : "/login"}>
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
            </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {count}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search menu..." className="w-full pl-8 rounded-full bg-muted" />
          </div>
          <nav className="flex flex-col space-y-3">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:text-primary">
              Menu
            </Link>
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium hover:text-primary">
                Categories <ChevronDown className="h-4 w-4" />
              </summary>
              <nav className="mt-2 ml-4 flex flex-col space-y-2">
                <Link href="/menu?category=noodles" className="text-sm hover:text-primary">
                  Noodles
                </Link>
                <Link href="/menu?category=momos" className="text-sm hover:text-primary">
                  Momos
                </Link>
                <Link href="/menu?category=rice" className="text-sm hover:text-primary">
                  Fried Rice
                </Link>
                <Link href="/menu?category=starters" className="text-sm hover:text-primary">
                  Starters
                </Link>
                <Link href="/menu?category=soups" className="text-sm hover:text-primary">
                  Soups
                </Link>
                <Link href="/menu?category=combos" className="text-sm hover:text-primary">
                  Combos
                </Link>
              </nav>
            </details>
            <Link href="/offers" className="text-sm font-medium hover:text-primary">
              Offers
            </Link>
            <Link href="/order-tracking" className="text-sm font-medium hover:text-primary">
              Track Order
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
