// Estado global: idioma de la interfaz.
'use client'
import { Lang } from "@/app/types/type";
import { dictionaries, Dictionary } from "@/app/utils/i18n";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ListaContextTipao = {
    lang: Lang
    setLang: (lang: Lang) => void
    t: Dictionary
}

const ListContext = createContext<ListaContextTipao | null>(null)

const LANG_KEY = "dittodex:idioma"

export const ListProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>("ES")
    const [hydrated, setHydrated] = useState(false)

    // Recupera el idioma guardado (si el navegador lo permite).
    useEffect(() => {
        try {
            const savedLang = localStorage.getItem(LANG_KEY) as Lang | null
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (savedLang && savedLang in dictionaries) setLang(savedLang)
        } catch { /* almacenamiento no disponible */ }
        setHydrated(true)
    }, [])

    useEffect(() => {
        if (!hydrated) return
        try {
            localStorage.setItem(LANG_KEY, lang)
        } catch { /* almacenamiento no disponible */ }
    }, [lang, hydrated])

    useEffect(() => {
        document.documentElement.lang = lang === "JP" ? "ja" : lang.toLowerCase()
    }, [lang])

    return (
        <ListContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
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
