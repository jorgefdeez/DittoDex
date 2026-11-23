import type { Metadata } from "next"
import Favoritos from "../components/Favoritos"
import "../page.css"

export const metadata: Metadata = {
  title: "Favoritos · DittoDex",
}

export default function FavoritosPage() {
  return <Favoritos />
}
