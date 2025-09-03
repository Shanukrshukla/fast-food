import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SWRegister from "@/components/sw-register"
import PWAInstall from "@/components/pwa-install"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chinese Adda — Taste That Brings You Back",
  description: "Order delicious Chinese food - noodles, momos, rice bowls, and more. Fast delivery, fresh ingredients.",
  manifest: "/manifest.webmanifest",
  themeColor: "#dc2626",
  generator: 'v0.app',
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chinese Adda"
  },
  openGraph: {
    title: "Chinese Adda — Taste That Brings You Back",
    description: "Order delicious Chinese food - noodles, momos, rice bowls, and more. Fast delivery, fresh ingredients.",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese Adda — Taste That Brings You Back",
    description: "Order delicious Chinese food - noodles, momos, rice bowls, and more. Fast delivery, fresh ingredients."
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Chinese Adda",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#dc2626"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Chinese Adda" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={inter.className}>
        <SWRegister />
        <PWAInstall />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
