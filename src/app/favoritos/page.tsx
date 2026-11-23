import type { Metadata } from "next"
import Favoritos from "../components/Favoritos"

export const metadata: Metadata = {
  title: "Favoritos · DittoDex",
}

export default function FavoritosPage() {
  return <Favoritos />
}
