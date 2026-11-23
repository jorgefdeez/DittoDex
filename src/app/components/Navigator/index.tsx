'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLista } from "@/context/Provider"
import Logo from "../Logo"

import "./style.css"

const Navigator = () => {
    const pathname = usePathname()
    const { t } = useLista()

    type Rutas = {
        name: string,
        rutas: string
    }

    const rutas: Rutas[] = [
        { name: t.home, rutas: "/" },
        { name: t.cards, rutas: "/cartas" },
        { name: t.news, rutas: "/noticias" },
        { name: t.favNav, rutas: "/favoritos" },
    ]

    return (
        <header className="navHeader">
            <nav className="containerNavigator container">
                <Link href="/" className="navLogo" aria-label="DittoDex">
                    <Logo />
                    <span className="navLogoText">
                        <span className="navLogoDitto">Ditto</span>
                        <span className="navLogoDex">Dex</span>
                    </span>
                </Link>
                <div className="navLinks">
                    {rutas.map((e) => {
                        const active = e.rutas === "/" ? pathname === "/" : pathname.startsWith(e.rutas)
                        return (
                            <Link
                                className={`botones${active ? " botonActivo" : ""}`}
                                key={e.rutas}
                                href={e.rutas}
                                aria-current={active ? "page" : undefined}
                            >
                                {e.name}
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </header>
    )
}

export default Navigator
