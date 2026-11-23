import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./layout.css";
import { ListProvider } from "@/context/Provider";
import Navigator from "./components/Navigator";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DittoDex",
  description: "Buscador y catálogo de cartas de Pokémon TCG con precios de mercado de Cardmarket.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ListProvider>
          <Navigator />
          <main className="mainContent">{children}</main>
          <Footer />
        </ListProvider>
      </body>
    </html>
  );
}
