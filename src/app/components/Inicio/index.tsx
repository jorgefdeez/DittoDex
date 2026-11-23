'use client'
import Link from "next/link"
import { useLista } from "@/context/Provider"

const Inicio = () => {
    const { t } = useLista()

    return (
        <div className="container inicio">
            <Link href="/cartas" className="inicioVideo" aria-label={t.heroCta}>
                <video src="/inicio.mp4" autoPlay muted loop playsInline />
            </Link>
        </div>
    )
}

export default Inicio
