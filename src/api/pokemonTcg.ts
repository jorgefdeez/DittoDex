import { api } from "./axios"
import { ApiList, Card, CardFilters, CardSet } from "@/app/types/type"

export const PAGE_SIZE = 36

const quote = (value: string) => `"${value.replace(/"/g, '\\"')}"`

export const buildQuery = ({ search, setId, type, rarity }: CardFilters) => {
  const parts: string[] = []
  const text = search.trim()
  if (text) parts.push(`name:${quote(`*${text}*`)}`)
  if (setId) parts.push(`set.id:${setId}`)
  if (type) parts.push(`types:${type}`)
  if (rarity) parts.push(`rarity:${quote(rarity)}`)
  return parts.join(" ")
}

export const getCards = async (filters: CardFilters, page: number, signal?: AbortSignal) => {
  const q = buildQuery(filters)
  const { data } = await api.get<ApiList<Card>>("/cards", {
    params: {
      ...(q ? { q } : {}),
      page,
      pageSize: PAGE_SIZE,
      orderBy: "-set.releaseDate,number",
    },
    signal,
  })
  return data
}

export const getSets = async (signal?: AbortSignal) => {
  const { data } = await api.get<ApiList<CardSet>>("/sets", {
    params: { orderBy: "-releaseDate", pageSize: 250, select: "id,name,series,releaseDate" },
    signal,
  })
  return data.data
}

export const getRarities = async (signal?: AbortSignal) => {
  const { data } = await api.get<ApiList<string>>("/rarities", { signal })
  return data.data
}

export const getTypes = async (signal?: AbortSignal) => {
  const { data } = await api.get<ApiList<string>>("/types", { signal })
  return data.data
}
