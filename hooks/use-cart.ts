"use client"

import useSWR from "swr"
import { useCallback, useMemo } from "react"

export type CartItem = { id: string; name: string; price: number; qty: number; image?: string; category?: string }
type CartState = { items: CartItem[] }

const KEY = "ca-cart"

const fetcher = (): CartState => {
  if (typeof window === "undefined") return { items: [] }
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}

const persist = (state: CartState) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {}
}

export function useCart() {
  const { data, mutate } = useSWR<CartState>(KEY, fetcher, { fallbackData: { items: [] } })

  const add = useCallback(
    (item: CartItem) => {
      mutate((current) => {
        const next = { items: [...(current?.items || [])] }
        const idx = next.items.findIndex((i) => i.id === item.id)
        if (idx >= 0) next.items[idx].qty += item.qty
        else next.items.push(item)
        if (typeof window !== "undefined") persist(next)
        return next
      }, false)
    },
    [mutate],
  )

  const remove = useCallback(
    (id: string) => {
      mutate((current) => {
        const next = { items: (current?.items || []).filter((i) => i.id !== id) }
        if (typeof window !== "undefined") persist(next)
        return next
      }, false)
    },
    [mutate],
  )

  const updateQty = useCallback(
    (id: string, qty: number) => {
      mutate((current) => {
        const next = { items: [...(current?.items || [])] }
        const idx = next.items.findIndex((i) => i.id === id)
        if (idx >= 0) next.items[idx].qty = Math.max(1, qty)
        if (typeof window !== "undefined") persist(next)
        return next
      }, false)
    },
    [mutate],
  )

  const clear = useCallback(() => {
    const empty = { items: [] }
    if (typeof window !== "undefined") persist(empty)
    mutate(empty, false)
  }, [mutate])

  const total = useMemo(() => (data?.items || []).reduce((sum, i) => sum + i.price * i.qty, 0), [data?.items])

  return { items: data?.items || [], add, remove, updateQty, clear, total }
}
