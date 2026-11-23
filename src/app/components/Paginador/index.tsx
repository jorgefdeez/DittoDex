'use client'
import { useLista } from "@/context/Provider"

import "./style.css"

const WINDOW = 5

const Paginador = (
    { page, totalPages, setPage }: { page: number, totalPages: number, setPage: (page: number) => void }
) => {
    const { t } = useLista()
    if (totalPages < 1) return null


    let start = Math.max(1, page - Math.floor(WINDOW / 2))
    const end = Math.min(totalPages, start + WINDOW - 1)
    start = Math.max(1, end - WINDOW + 1)
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

    const prev = page > 1
    const next = page < totalPages

    return (
        <nav className="paginadorContainer" aria-label="Paginación">
            <p className="paginadorTexto">{t.page(page, totalPages)}</p>
            <div className="paginadorBotones">
                <button disabled={!prev} onClick={() => setPage(page - 1)}>{t.prev}</button>

                {start > 1 && (
                    <button className="paginadorEllipsis" onClick={() => setPage(Math.max(1, page - WINDOW))} aria-label={`-${WINDOW}`}>…</button>
                )}

                {pages.map((n) => (
                    <button
                        key={n}
                        className={n === page ? "paginadorActivo" : ""}
                        aria-current={n === page ? "page" : undefined}
                        onClick={() => setPage(n)}
                    >
                        {n}
                    </button>
                ))}

                {end < totalPages && (
                    <button className="paginadorEllipsis" onClick={() => setPage(Math.min(totalPages, page + WINDOW))} aria-label={`+${WINDOW}`}>…</button>
                )}

                <button disabled={!next} onClick={() => setPage(page + 1)}>{t.next}</button>
            </div>
        </nav>
    )
}
export default Paginador
