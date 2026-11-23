import type { Metadata } from "next"
import Noticias from "../components/Noticias"
import "../page.css"

export const metadata: Metadata = {
  title: "Noticias · DittoDex",
}

export default function NoticiasPage() {
  return <Noticias />
}
