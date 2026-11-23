'use client'
import { useCallback, useState } from "react"
import { Card } from "@/app/types/type"
import { useLista } from "@/context/Provider"
import CardGrid from "../CardGrid"
import CartaModal from "../CartaModal"

import "../Catalogo/style.css"
import "./style.css"

const Favoritos = () => {
    const { t, favorites } = useLista()
    const [selected, setSelected] = useState<Card | null>(null)

    const closeModal = useCallback(() => setSelected(null), [])

    return (
        <>
            <section className="catalogo container favoritos">
                <header className="favoritosHead">
                    <h1>{t.favNav}</h1>
                    {favorites.length > 0 && (
                        <p className="catalogoCount" aria-live="polite">{t.results(favorites.length)}</p>
                    )}
                </header>

                {favorites.length === 0 ? (
                    <div className="catalogoMensaje">
                        <p>{t.favEmpty}</p>
                    </div>
                ) : (
                    <CardGrid cards={favorites} loading={false} onSelect={setSelected} />
                )}
            </section>

            {selected && <CartaModal card={selected} onClose={closeModal} backLabel={t.backFav} />}
        </>
    )
}

export default Favoritos
