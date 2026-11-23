export type CardmarketPrices = {
  averageSellPrice?: number | null
  lowPrice?: number | null
  trendPrice?: number | null
  avg1?: number | null
  avg7?: number | null
  avg30?: number | null
  reverseHoloTrend?: number | null
}

export type Cardmarket = {
  url: string
  updatedAt: string
  prices?: CardmarketPrices
}

export type CardSet = {
  id: string
  name: string
  series: string
  printedTotal: number
  total: number
  releaseDate: string
  images?: { symbol: string; logo: string }
}

export type Attack = {
  name: string
  text?: string
  damage?: string
  cost?: string[]
}

export type Ability = {
  name: string
  text: string
  type: string
}

export type Card = {
  id: string
  name: string
  supertype: string
  subtypes?: string[]
  hp?: string
  types?: string[]
  rules?: string[]
  abilities?: Ability[]
  attacks?: Attack[]
  flavorText?: string
  number: string
  artist?: string
  rarity?: string
  set: CardSet
  images: { small: string; large: string }
  cardmarket?: Cardmarket
}

export type ApiList<T> = {
  data: T[]
  page?: number
  pageSize?: number
  count?: number
  totalCount?: number
}

export type CardFilters = {
  search: string
  setId: string
  type: string
  rarity: string
}

export type Lang = "ES" | "EN" | "JP"
