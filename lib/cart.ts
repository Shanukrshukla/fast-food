"use client"

import useSWR from "swr"

export type CartItem = { id: string; name: string; price: number; qty: number }

type CartState = { items: CartItem[] }
const KEY = "cart"

const load = (): CartState => {
  if (typeof window === "undefined") return { items: [] }
  const raw = window.localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : { items: [] }
}
const save = (s: CartState) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(KEY, JSON.stringify(s))
}

export function useCart() {
  const { data, mutate } = useSWR<CartState>(KEY, load, { fallbackData: { items: [] } })

  const add = (item: CartItem) => {
    const existing = data!.items.find((i) => i.id === item.id)
    const items = existing
      ? data!.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + item.qty } : i))
      : [...data!.items, item]
    const next = { items }
    save(next)
    mutate(next, false)
  }
  const updateQty = (id: string, qty: number) => {
    const next = { items: data!.items.map((i) => (i.id === id ? { ...i, qty } : i)) }
    save(next)
    mutate(next, false)
  }
  const remove = (id: string) => {
    const next = { items: data!.items.filter((i) => i.id !== id) }
    save(next)
    mutate(next, false)
  }
  const clear = () => {
    const next = { items: [] }
    save(next)
    mutate(next, false)
  }
  const count = data!.items.reduce((n, i) => n + i.qty, 0)
  const total = data!.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return { items: data!.items, add, updateQty, remove, clear, count, total }
}
