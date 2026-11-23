import { Card } from "@/app/types/type"

const valid = (n: number | null | undefined): n is number => typeof n === "number" && n > 0

export const formatEuro = (value: number | null | undefined, locale = "es-ES") =>
  valid(value)
    ? new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(value)
    : "N/D"

export type PricePoint = { key: "window30" | "window7" | "window1" | "trend"; value: number }

export type PriceSummary = {
  current: number | null
  min: number | null
  max: number | null
  points: PricePoint[] 
  updatedAt: Date | null
  url: string | null
}

export const getPriceSummary = (card: Card): PriceSummary => {
  const p = card.cardmarket?.prices
  const candidates: [PricePoint["key"], number | null | undefined][] = [
    ["window30", p?.avg30],
    ["window7", p?.avg7],
    ["window1", p?.avg1],
    ["trend", p?.trendPrice],
  ]
  const points = candidates
    .filter((c): c is [PricePoint["key"], number] => valid(c[1]))
    .map(([key, value]) => ({ key, value }))

  const current = valid(p?.trendPrice) ? p.trendPrice : null
  const min = valid(p?.lowPrice) ? p.lowPrice : valid(p?.avg30) ? p.avg30 : null
  const max = points.length ? Math.max(...points.map((pt) => pt.value)) : null

  const rawDate = card.cardmarket?.updatedAt
  const updatedAt = rawDate ? new Date(rawDate.replace(/\//g, "-")) : null

  return {
    current,
    min,
    max,
    points,
    updatedAt: updatedAt && !isNaN(updatedAt.getTime()) ? updatedAt : null,
    url: card.cardmarket?.url ?? null,
  }
}
