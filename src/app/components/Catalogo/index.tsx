'use client'
import { useCallback, useEffect, useState } from "react"
import { Card, CardSet } from "@/app/types/type"
import { useLista } from "@/context/Provider"
import { getCards, getRarities, getSets, getTypes, PAGE_SIZE } from "@/api/pokemonTcg"
import { ApiErrorKind, axios, getErrorKind } from "@/api/axios"
import Filtros from "../Filtros"
import CardGrid from "../CardGrid"
import Paginador from "../Paginador"
import CartaModal from "../CartaModal"
import { useReconnect } from "@/app/utils/useReconnect"

import "./style.css"

type Result = {
    key: string
    cards: Card[]
    totalCount: number
    error: ApiErrorKind | null
}

const DEBOUNCE_MS = 400
const AUTO_RETRY_MS = 10000

const Catalogo = () => {
    const { t } = useLista()
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [setId, setSetId] = useState("")
    const [type, setType] = useState("")
    const [rarity, setRarity] = useState("")
    const [page, setPage] = useState(1)
    const [reload, setReload] = useState(0)
    const [metaReload, setMetaReload] = useState(0)

    const [sets, setSets] = useState<CardSet[]>([])
    const [types, setTypes] = useState<string[]>([])
    const [rarities, setRarities] = useState<string[]>([])

    const [result, setResult] = useState<Result | null>(null)
    const [selected, setSelected] = useState<Card | null>(null)

    const metaMissing = sets.length === 0 || types.length === 0 || rarities.length === 0

    useEffect(() => {
        const ctrl = new AbortController()
        let retryId: ReturnType<typeof setTimeout> | undefined
        const scheduleRetry = () => {
            if (ctrl.signal.aborted || retryId) return
            retryId = setTimeout(() => setMetaReload((n) => n + 1), AUTO_RETRY_MS)
        }
        const load = <T extends unknown[]>(fn: (s: AbortSignal) => Promise<T>, set: (v: T) => void) =>
            fn(ctrl.signal).then(set).catch((e) => {
                if (axios.isCancel(e)) return
                console.warn("Pokémon TCG API:", e.message)
                scheduleRetry()
            })
        if (sets.length === 0) load(getSets, setSets)
        if (types.length === 0) load(getTypes, setTypes)
        if (rarities.length === 0) load(getRarities, setRarities)
        return () => {
            ctrl.abort()
            clearTimeout(retryId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only reload on demand
    }, [metaReload])

    useReconnect(() => setMetaReload((n) => n + 1), metaMissing)

    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedSearch(search)
            setPage(1)
        }, DEBOUNCE_MS)
        return () => clearTimeout(id)
    }, [search])

    const filters = { search: debouncedSearch, setId, type, rarity }
    const requestKey = JSON.stringify({ ...filters, page, reload })

    useEffect(() => {
        const ctrl = new AbortController()
        const { search, setId, type, rarity, page } = JSON.parse(requestKey)
        getCards({ search, setId, type, rarity }, page, ctrl.signal)
            .then((data) => setResult({ key: requestKey, cards: data.data, totalCount: data.totalCount ?? 0, error: null }))
            .catch((e) => {
                if (axios.isCancel(e)) return
                setResult({ key: requestKey, cards: [], totalCount: 0, error: getErrorKind(e) })
            })
        return () => ctrl.abort()
    }, [requestKey])

    const loading = result?.key !== requestKey
    const hasError = !loading && !!result?.error
    const retry = useCallback(() => setReload((r) => r + 1), [])

    // Never stay stuck on an error: retry periodically and as soon as the tab/connection comes back
    useEffect(() => {
        if (!hasError) return
        const id = setTimeout(retry, AUTO_RETRY_MS)
        return () => clearTimeout(id)
    }, [hasError, retry])

    useReconnect(retry, hasError)
    const totalPages = Math.max(1, Math.ceil((result?.totalCount ?? 0) / PAGE_SIZE))

    const withReset = (setter: (v: string) => void) => (v: string) => { setter(v); setPage(1) }

    const goToPage = (p: number) => {
        setPage(p)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const closeModal = useCallback(() => setSelected(null), [])

    const errorText = result?.error === "rateLimit" ? t.errorRateLimit
        : result?.error === "network" ? t.errorNetwork
        : t.errorServer

    return (
        <>
            <Filtros
                search={search} setSearch={setSearch}
                setId={setId} setSetId={withReset(setSetId)}
                type={type} setType={withReset(setType)}
                rarity={rarity} setRarity={withReset(setRarity)}
                sets={sets} types={types} rarities={rarities}
            />

            <section className="catalogo container">
                {hasError ? (
                    <div className="catalogoMensaje catalogoError" role="alert">
                        <p>{errorText}</p>
                        <button onClick={retry}>{t.retry}</button>
                    </div>
                ) : !loading && result?.cards.length === 0 ? (
                    <div className="catalogoMensaje"><p>{t.noResults}</p></div>
                ) : (
                    <>
                        <p className="catalogoCount" aria-live="polite">
                            {!loading && result ? t.results(result.totalCount) : " "}
                        </p>
                        <CardGrid cards={result?.cards ?? []} loading={loading} onSelect={setSelected} />
                        {!loading && <Paginador page={page} totalPages={totalPages} setPage={goToPage} />}
                    </>
                )}
            </section>

            {selected && <CartaModal card={selected} onClose={closeModal} />}
        </>
    )
}

export default Catalogo
