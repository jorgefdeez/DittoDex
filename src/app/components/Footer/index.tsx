'use client'
import Link from "next/link"
import { useLista } from "@/context/Provider"

import "./style.css"

const Footer = () => {
    const { t } = useLista()
    return (
        <footer className="footer">
            <div className="footerInner container">
                <div className="footerLinks">
                    {/* Páginas pendientes de hacer */}
                    <a href="#">{t.contact}</a>
                    <a href="#">{t.terms}</a>
                    <a href="#">{t.privacy}</a>
                </div>
                <p className="footerCopy">© 2026 DittoDex - Pokémon TCG</p>
            </div>
        </footer>
    )
}

export default Footer
