import type { Metadata } from "next"
import Catalogo from "../components/Catalogo"

export const metadata: Metadata = {
  title: "Cartas · DittoDex",
}

export default function CartasPage() {
  return <Catalogo />
}
