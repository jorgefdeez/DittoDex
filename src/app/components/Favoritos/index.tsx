'use client'
import { useLista } from "@/context/Provider"

const Favoritos = () => {
    const { t } = useLista()
    return (
        <section className="container noticias">
            <h1>{t.favNav}</h1>
            <p>{t.favText}</p>
        </section>
    )
}

export default Favoritos
