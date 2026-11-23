'use client'
import { useCallback, useState } from "react"
import Link from "next/link"
import { Card } from "@/app/types/type"
import { useLista } from "@/context/Provider"
import Logo from "../Logo"
import CardGrid from "../CardGrid"
import CartaModal from "../CartaModal"

const Inicio = () => {
    const { t, cards } = useLista()
    const [selected, setSelected] = useState<Card | null>(null)
    const closeModal = useCallback(() => setSelected(null), [])

    return (
        <div className="container inicio">
            <section className="hero">
                <Logo size={96} />
                <h1>{t.heroTitle}</h1>
                <p>{t.heroText}</p>
                <Link href="/cartas" className="heroCta">{t.heroCta} →</Link>
            </section>

            {cards.length > 0 && (
                <section className="inicioFavs">
                    <h2>{t.favorites}</h2>
                    <CardGrid cards={cards} loading={false} onSelect={setSelected} />
                </section>
            )}

            {selected && <CartaModal card={selected} onClose={closeModal} />}
        </div>
    )
}

export default Inicio
