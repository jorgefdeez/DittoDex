'use client'
import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card } from "@/app/types/type"
import { useLista } from "@/context/Provider"
import { locales, translateRarity, translateSeries, translateType } from "@/app/utils/i18n"
import { formatEuro, getPriceSummary } from "@/app/utils/prices"
import EnergyIcon from "../EnergyIcon"
import GraficaPrecios from "../GraficaPrecios"

import "./style.css"

type Props = {
    card: Card
    onClose: () => void
    backLabel?: string
}

const CartaModal = ({ card, onClose, backLabel }: Props) => {
    const { t, lang, isFavorite, toggleFavorite } = useLista()
    const fav = isFavorite(card.id)
    const closeRef = useRef<HTMLButtonElement>(null)
    const locale = locales[lang]
    const prices = getPriceSummary(card)
    const type = card.types?.[0]

    useEffect(() => {
        const prevFocus = document.activeElement as HTMLElement | null
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        document.addEventListener("keydown", onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        closeRef.current?.focus()
        return () => {
            document.removeEventListener("keydown", onKey)
            document.body.style.overflow = prevOverflow
            prevFocus?.focus()
        }
    }, [onClose])

    const datos: [string, string][] = [
        [t.setLabel, `${translateSeries(card.set.series, lang)} - ${card.set.name}`],
        [t.number, `${card.number}/${card.set.printedTotal}`],
        [t.rarity, card.rarity ? translateRarity(card.rarity, lang) : "N/D"],
        [t.artist, card.artist ?? "N/D"],
        [t.subtype, card.subtypes?.[0] ?? card.supertype ?? "N/D"],
        [t.hp, card.hp ?? "N/D"],
    ]

    const dateText = prices.updatedAt
        ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(prices.updatedAt)
        : null

    return (
        <div className="modalOverlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <header className="modalHeader">
                    <button className="modalBack" onClick={onClose}>
                        <span aria-hidden="true">←</span> {backLabel ?? t.back}
                    </button>
                    <button ref={closeRef} className="modalClose" onClick={onClose} aria-label={t.close}>
                        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                    </button>
                </header>

                <section className="modalTop">
                    <div className="modalImage">
                        <Image
                            src={card.images.large}
                            alt={card.name}
                            width={734}
                            height={1024}
                            sizes="(max-width: 700px) 70vw, 300px"
                            unoptimized
                            priority
                        />
                    </div>

                    <div className="modalInfo">
                        <h2 id="modalTitle" className="modalTitle">
                            {card.name}
                            {type && <EnergyIcon type={type} size={34} label={translateType(type, lang)} />}
                        </h2>

                        <h3 className="modalSection">{t.data}</h3>
                        <dl className="modalDatos">
                            {datos.map(([k, v]) => (
                                <div key={k}>
                                    <dt>{k}</dt>
                                    <dd>{v}</dd>
                                </div>
                            ))}
                        </dl>

                        <button
                            type="button"
                            className={`favButton${fav ? " favActive" : ""}`}
                            onClick={() => toggleFavorite(card)}
                            aria-pressed={fav}
                        >
                            <span aria-hidden="true">{fav ? "★" : "☆"}</span> {fav ? t.removeFav : t.addFav}
                        </button>
                    </div>
                </section>

                <section className="modalPrices">
                    <div className="modalPricesHead">
                        <h3>{t.priceHistory}</h3>
                        {dateText && (
                            prices.url
                                ? <a href={prices.url} target="_blank" rel="noopener noreferrer">{t.updated(dateText)} ↗</a>
                                : <span>{t.updated(dateText)}</span>
                        )}
                    </div>
                    <div className="modalPricesBody">
                        <div className="modalChart">
                            {prices.points.length > 0
                                ? <GraficaPrecios points={prices.points} t={t} locale={locale} />
                                : <p className="modalNoPrices">{t.noPrices}</p>}
                        </div>
                        <dl className="modalMetrics">
                            <div>
                                <dt>{t.currentPrice}:</dt>
                                <dd className="metricCurrent">{formatEuro(prices.current, locale)}</dd>
                            </div>
                            <div>
                                <dt>{t.maxPrice}:</dt>
                                <dd className="metricMax">{formatEuro(prices.max, locale)}</dd>
                            </div>
                            <div>
                                <dt>{t.minPrice}:</dt>
                                <dd className="metricMin">{formatEuro(prices.min, locale)}</dd>
                            </div>
                        </dl>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CartaModal
