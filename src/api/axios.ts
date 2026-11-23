import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

const API_KEY = process.env.NEXT_PUBLIC_POKEMON_TCG_API_KEY

const MAX_RETRIES = 5
const MAX_DELAY_MS = 4000

type RetryConfig = InternalAxiosRequestConfig & { _retryCount?: number }

export const api = axios.create({
  baseURL: "https://api.pokemontcg.io/v2",
  timeout: 30000,
  headers: API_KEY ? { "X-Api-Key": API_KEY } : undefined,
})

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms)
    signal?.addEventListener("abort", () => {
      clearTimeout(id)
      reject(new axios.CanceledError())
    })
  })

api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as RetryConfig | undefined
  if (!config || axios.isCancel(error)) throw error

  const status = error.response?.status
  const retriable = status === undefined || status === 429 || status >= 500
  config._retryCount = config._retryCount ?? 0
  if (!retriable || config._retryCount >= MAX_RETRIES) throw error

  config._retryCount += 1
  const retryAfter = Number(error.response?.headers?.["retry-after"])
  const delay = retryAfter > 0 ? retryAfter * 1000 : Math.min(MAX_DELAY_MS, 400 * 2 ** config._retryCount)
  await sleep(delay, config.signal as AbortSignal | undefined)
  return api(config)
})

export type ApiErrorKind = "rateLimit" | "network" | "server"

export const getErrorKind = (error: unknown): ApiErrorKind => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 429) return "rateLimit"
    if (!error.response) return "network"
  }
  return "server"
}

export { axios }
