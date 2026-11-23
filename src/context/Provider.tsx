// Estado global: cartas favoritas e idioma de la interfaz.
'use client'
import { Card, Lang } from "@/app/types/type";
import { dictionaries, Dictionary } from "@/app/utils/i18n";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ListaContextTipao = {
    cards: Card[]
    addToList: (item: Card) => void
    deleteFromList: (id: string) => void
    isInList: (id: string) => boolean
    lang: Lang
    setLang: (lang: Lang) => void
    t: Dictionary
}

const ListContext = createContext<ListaContextTipao | null>(null)

const FAV_KEY = "dittodex:favoritas"
const LANG_KEY = "dittodex:idioma"

export const ListProvider = ({ children }: { children: ReactNode }) => {
    const [cards, setCards] = useState<Card[]>([])
    const [lang, setLang] = useState<Lang>("ES")
    const [hydrated, setHydrated] = useState(false)

    // Recupera favoritas e idioma guardados (si el navegador lo permite).
    useEffect(() => {
        try {
            const savedCards = localStorage.getItem(FAV_KEY)
            const savedLang = localStorage.getItem(LANG_KEY) as Lang | null
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (savedCards) setCards(JSON.parse(savedCards))
            if (savedLang && savedLang in dictionaries) setLang(savedLang)
        } catch { /* almacenamiento no disponible */ }
        setHydrated(true)
    }, [])

    useEffect(() => {
        if (!hydrated) return
        try {
            localStorage.setItem(FAV_KEY, JSON.stringify(cards))
            localStorage.setItem(LANG_KEY, lang)
        } catch { /* almacenamiento no disponible */ }
    }, [cards, lang, hydrated])

    useEffect(() => {
        document.documentElement.lang = lang === "JP" ? "ja" : lang.toLowerCase()
    }, [lang])

    const addToList = (item: Card) => {
        setCards((prev) => (prev.some((c) => c.id === item.id) ? prev : [...prev, item]))
    }

    const deleteFromList = (id: string) => {
        setCards((prev) => prev.filter((c) => c.id !== id))
    }

    const isInList = (id: string) => cards.some((c) => c.id === id)

    return (
        <ListContext.Provider value={{ cards, addToList, deleteFromList, isInList, lang, setLang, t: dictionaries[lang] }}>
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
