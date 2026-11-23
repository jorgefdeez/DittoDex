'use client'
import { useLista } from "@/context/Provider"

const Noticias = () => {
    const { t } = useLista()
    return (
        <section className="container noticias">
            <h1>{t.news}</h1>
            <p>{t.soon} — {t.newsText}</p>
        </section>
    )
}

export default Noticias
