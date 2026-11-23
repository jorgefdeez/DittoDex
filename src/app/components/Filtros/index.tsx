'use client'
import { useEffect, useMemo, useRef, useState } from "react"
import { CardSet, Lang } from "@/app/types/type"
import { useLista } from "@/context/Provider"
import { translateRarity, translateSeries, translateType } from "@/app/utils/i18n"
import EnergyIcon from "../EnergyIcon"

import "./style.css"

type Props = {
    search: string
    setSearch: (v: string) => void
    setId: string
    setSetId: (v: string) => void
    type: string
    setType: (v: string) => void
    rarity: string
    setRarity: (v: string) => void
    sets: CardSet[]
    types: string[]
    rarities: string[]
}

const TypeSelect = ({ value, onChange, types, lang, label, allLabel }: {
    value: string, onChange: (v: string) => void, types: string[], lang: Lang, label: string, allLabel: string
}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const onClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false)
        }
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
        document.addEventListener("mousedown", onClick)
        document.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("mousedown", onClick)
            document.removeEventListener("keydown", onKey)
        }
    }, [open])

    const choose = (v: string) => { onChange(v); setOpen(false) }

    return (
        <div className="typeSelect" ref={ref}>
            <button
                type="button"
                className="filterControl typeTrigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`${label}: ${value ? translateType(value, lang) : allLabel}`}
                onClick={() => setOpen((o) => !o)}
            >
                <span className="typeTriggerIcons">
                    {value
                        ? <><EnergyIcon type={value} /> <span className="typeName">{translateType(value, lang)}</span></>
                        : ["Fire", "Water", "Lightning", "Grass", "Psychic"].map((t) => <EnergyIcon key={t} type={t} />)}
                </span>
                <span className="caret" aria-hidden="true">▾</span>
            </button>
            {open && (
                <ul className="typeMenu" role="listbox" aria-label={label}>
                    <li role="option" aria-selected={!value}>
                        <button type="button" className={!value ? "typeOptionActive" : ""} onClick={() => choose("")}>
                            {allLabel}
                        </button>
                    </li>
                    {types.map((t) => (
                        <li key={t} role="option" aria-selected={value === t}>
                            <button type="button" className={value === t ? "typeOptionActive" : ""} onClick={() => choose(t)}>
                                <EnergyIcon type={t} /> {translateType(t, lang)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const Filtros = (p: Props) => {
    const { t, lang, setLang } = useLista()

    // Agrupa los sets por serie (ya vienen ordenados por fecha de la API).
    const grouped = useMemo(() => {
        const map = new Map<string, CardSet[]>()
        p.sets.forEach((s) => map.set(s.series, [...(map.get(s.series) ?? []), s]))
        return [...map.entries()]
    }, [p.sets])

    return (
        <div className="filtrosBar">
            <div className="filtrosInner container">
                <label className="searchBox">
                    <svg className="searchIcon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                        <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
                        <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                    <input
                        type="search"
                        value={p.search}
                        onChange={(e) => p.setSearch(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        aria-label={t.searchPlaceholder}
                    />
                </label>

                <div className="filterField filterSet">
                    <span className="filterLabel">{t.set}</span>
                    <select className="filterControl" value={p.setId} onChange={(e) => p.setSetId(e.target.value)}>
                        <option value="">{t.allSets}</option>
                        {grouped.map(([series, sets]) => (
                            <optgroup key={series} label={translateSeries(series, lang)}>
                                {sets.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </optgroup>
                        ))}
                    </select>
                </div>

                <div className="filterField filterType">
                    <span className="filterLabel">{t.type}</span>
                    <TypeSelect value={p.type} onChange={p.setType} types={p.types} lang={lang} label={t.type} allLabel={t.allTypes} />
                </div>

                <div className="filterField filterRarity">
                    <span className="filterLabel">{t.rarity}</span>
                    <select className="filterControl" value={p.rarity} onChange={(e) => p.setRarity(e.target.value)}>
                        <option value="">{t.allRarities}</option>
                        {p.rarities.map((r) => <option key={r} value={r}>{translateRarity(r, lang)}</option>)}
                    </select>
                </div>

                <div className="filterField filterLang">
                    <span className="filterLabel">{t.language}</span>
                    <select className="filterControl" value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
                        <option value="ES">ES</option>
                        <option value="EN">EN</option>
                        <option value="JP">JP</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filtros
