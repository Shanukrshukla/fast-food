import Link from "next/link"

export default function OrderDetail({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12 text-center">
      <h1 className="text-2xl font-semibold">Order Confirmed</h1>
      <p className="text-muted-foreground mt-2">
        Your order ID is <span className="font-mono font-medium">{params.id}</span>.
      </p>
      <p className="text-muted-foreground">Use the link below to track your order status.</p>
      <Link href="/orders/track" className="inline-block mt-4 text-white bg-primary px-4 py-2 rounded">
        Track Order
      </Link>
    </main>
  )
}
