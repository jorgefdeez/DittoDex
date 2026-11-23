'use client'
import { Card, Lang } from "@/app/types/type";
import { dictionaries, Dictionary } from "@/app/utils/i18n";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ListaContextTipao = {
    lang: Lang
    setLang: (lang: Lang) => void
    t: Dictionary
    favorites: Card[]
    isFavorite: (id: string) => boolean
    addFavorite: (card: Card) => void
    removeFavorite: (id: string) => void
    toggleFavorite: (card: Card) => void
}

const ListContext = createContext<ListaContextTipao | null>(null)

const LANG_KEY = "dittodex:idioma"

export const ListProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>("ES")
    const [favorites, setFavorites] = useState<Card[]>([])
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        try {
            const savedLang = localStorage.getItem(LANG_KEY) as Lang | null
            if (savedLang && savedLang in dictionaries) setLang(savedLang)
        } catch {}
        setHydrated(true)
    }, [])

    useEffect(() => {
        if (!hydrated) return
        try {
            localStorage.setItem(LANG_KEY, lang)
        } catch {}
    }, [lang, hydrated])

    useEffect(() => {
        document.documentElement.lang = lang === "JP" ? "ja" : lang.toLowerCase()
    }, [lang])

    const favoriteIds = useMemo(() => new Set(favorites.map((c) => c.id)), [favorites])
    const isFavorite = useCallback((id: string) => favoriteIds.has(id), [favoriteIds])

    const addFavorite = useCallback((card: Card) => {
        setFavorites((prev) => (prev.some((c) => c.id === card.id) ? prev : [card, ...prev]))
    }, [])

    const removeFavorite = useCallback((id: string) => {
        setFavorites((prev) => prev.filter((c) => c.id !== id))
    }, [])

    const toggleFavorite = useCallback((card: Card) => {
        setFavorites((prev) => (prev.some((c) => c.id === card.id)
            ? prev.filter((c) => c.id !== card.id)
            : [card, ...prev]))
    }, [])

    const value = useMemo(() => ({
        lang, setLang, t: dictionaries[lang],
        favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite,
    }), [lang, favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite])

    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    )
}

export const useLista = () => {
    const context = useContext(ListContext)
    if (!context) {
        throw new Error(String("tsx out of provider"))
    }
    return context
}
